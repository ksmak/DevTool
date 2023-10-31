import React from 'react'
import Button from './Button'
import { IButton, IUser } from '../../types/types'

interface Props {
    user: IUser
    buttons: IButton[]
    isLoading: boolean
}

const Toolbar = ({ user, buttons, isLoading }: Props) => {
    return <div className="mt-2 font-medium dark:border-neutral-500 ">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
                <div className="text-sm text-indigo-900">Пользователь: {user.fullname}</div>
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