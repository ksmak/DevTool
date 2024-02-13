import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext, IToken, IUser } from "../types/types";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<IAuthContext>({
    user: null,
    isAuthenticated: false,
    login: (accessToken: string, refreshToken: string) => { },
    logout: () => { },
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (accessToken: string, refreshToken: string) => {
        setIsAuthenticated(true);
        const decoded = jwtDecode<IToken>(accessToken);
        setUser({ id: decoded.user_id, username: decoded.username, fullName: decoded.full_name });
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('refresh_token', refreshToken);
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
    }

    const auth: IAuthContext = {
        user,
        isAuthenticated,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export function ProtectedRouter({ children }: any) {
    const [loading, setLoading] = useState(true);
    const { login, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token')
        const refreshToken = sessionStorage.getItem('refresh_token')
        if (accessToken && refreshToken) {
            (async () => {
                try {
                    const res = await axios.post(`${process.env.REACT_APP_HOST_API}/api/token/refresh/`, {
                        refresh: refreshToken
                    })
                    login && login(res.data.access, refreshToken);
                } catch (err) {
                    logout && logout();
                } finally {
                    setLoading(false)
                }
            })()
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) return <div>Loading...</div>

    if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />

    return children
}