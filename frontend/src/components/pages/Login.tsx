import axios from 'axios'
import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Loading from '../UI/Loading'
import { useAuth } from '../../lib/auth'


const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const location = useLocation()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)


    let fromPage = location.state?.from?.pathname || '/';

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage(null)
        setLoading(true)
        try {
            const resp = await axios.post(`${process.env.REACT_APP_HOST_API}/api/token/`, {
                username: username,
                password: password
            })
            setLoading(false)
            login(resp.data.access, resp.data.refresh)
            navigate(fromPage, { replace: true })
        } catch (error) {
            setErrorMessage("Ошибка! Имя пользователя или пароль не верны!");
            setLoading(false);
            buttonRef?.current?.blur()
        }
    }

    return (
        <div className="h-screen flex flex-row justify-center" >
            <form className="h-fit mt-64 p-5 rounded-md shadow-md shadow-gray-500 bg-blue-100" onSubmit={handleLogin}>
                <div className="m-2 flex flex-row justify-between gap-4">
                    <label className="text-indigo-900" htmlFor="username">Имя пользователя: </label>
                    <input
                        className="p-1 rounded-md border-2 text-indigo-800"
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="m-2 flex flex-row justify-between gap-4">
                    <label className="text-indigo-900" htmlFor="password">Пароль:</label>
                    <input
                        className="p-1 rounded-md border-2 text-indigo-800"
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-row justify-center p-2'>
                    <Loading isLoading={isLoading} />
                    <div className="h-4 text-red-600 text-sm">
                        {errorMessage}
                    </div>
                </div>
                <div className="mt-3 flex flex-row justify-center">
                    <button
                        className="text-indigo-900 p-1 rounded bg-blue-100 w-40 drop-shadow-lg outline outline-blue-100 focus:outline-none focus:drop-shadow-none"
                        type="submit"
                        ref={buttonRef}
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login