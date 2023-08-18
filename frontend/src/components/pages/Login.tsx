import { FC } from 'react'
import axios from 'axios'
import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { setCookie } from '../../utils/cookies'
import Loading from '../UI/Loading'


const Login: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)

    let fromPage = location.state?.from?.pathname || '/';

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage(null)
        setLoading(true)
        axios.post(`${process.env.REACT_APP_HOST_API}/api/token/`, { username: username, password: password })
            .then(resp => {
                setLoading(false)
                const access_msc = process.env.REACT_APP_ACCESS_TOKEN_LIFETIME
                    ? parseInt(process.env.REACT_APP_ACCESS_TOKEN_LIFETIME)
                    : 0
                setCookie('access_token', resp.data.access, access_msc)
                const refresh_msc = process.env.REACT_APP_ACCESS_TOKEN_LIFETIME
                    ? parseInt(process.env.REACT_APP_ACCESS_TOKEN_LIFETIME)
                    : 0
                setCookie('refresh_token', resp.data.refresh, refresh_msc)
                navigate(fromPage, { replace: true })
            })
            .catch(err => {
                setLoading(false)
                if (err.response?.status === 401) {
                    setErrorMessage("Ошибка! Имя пользователя или пароль не верны!")
                } else {
                    setErrorMessage(err.message)
                }
                buttonRef?.current?.blur()
            })
    }

    return (
        <div className="h-screen flex flex-row justify-center items-center" >
            <form className="p-5 rounded-md shadow-md shadow-gray-500 bg-blue-200" onSubmit={handleLogin}>
                <div className="m-2 flex flex-row justify-between">
                    <label className="text-blue-950" htmlFor="username">Имя пользователя: </label>
                    <input
                        className="p-1 rounded-md border-2"
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="m-2 flex flex-row justify-between">
                    <label className="text-blue-950" htmlFor="password">Пароль:</label>
                    <input
                        className="p-1 rounded-md border-2"
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-row justify-center p-2'>
                    <Loading isLoading={isLoading} />
                    <div className="h-4 text-red-500 text-sm">
                        {errorMessage}
                    </div>
                </div>
                <div className="mt-3 flex flex-row justify-center">
                    <button
                        className="p-1 rounded bg-blue-100 w-40 drop-shadow-lg outline outline-blue-100 focus:outline-none focus:drop-shadow-none"
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