import React from 'react'
import Button from './Button'
import { IButton, IUser } from '../../types/types'
import { setCookie } from '../../utils/cookies'
import { useNavigate } from 'react-router-dom'

interface Props {
    user: IUser
    buttons: IButton[]
    isLoading: boolean
}

const Toolbar = ({ user, buttons, isLoading }: Props) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        setCookie('access_token', '', 0)
        setCookie('refresh_token', '', 0)
        navigate('/login')
    }

    return <div className="mt-2 font-medium dark:border-neutral-500 ">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
                <div className="text-sm text-indigo-900">Пользователь: {user.fullname}</div>
                <div className="text-sm text-indigo-900 hover:cursor-pointer underline" onClick={() => handleLogout()}>выйти</div>
            </div>
            <div className="flex flex-row justify-end items-end gap-3">
                {buttons.map(button => {
                    return <Button
                        key={button.id}
                        title={button.title ? button.title : ''}
                        variant={button.variant}
                        onClick={button.onClick}
                        isDisabled={isLoading}
                    >
                        {button.title}
                    </Button>
                })}
            </div>
        </div>
    </div>
}

export default Toolbar