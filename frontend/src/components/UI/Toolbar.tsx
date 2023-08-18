import React from 'react'
import Button from './Button'
import { IButton, IUser } from '../../types/types'
import { Avatar } from '@material-tailwind/react'

interface Props {
    user: IUser
    title: string
    buttons: IButton[]
    isLoading: boolean
}

const Toolbar: React.FC<Props> = (props) => {
    return <div className="mt-2 h-16 font-medium dark:border-neutral-500 ">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
                <Avatar src={props.user.src} alt="avatar" />
                <div className="ml-2 text-sm text-blue-900">{props.user.fullname}</div>
            </div>
            <div className="flex flex-row justify-end items-end">
                {props.buttons.map(button => {
                    return <Button
                        key={button.id}
                        variant={button.variant}
                        onClick={button.onClick}
                        isDisabled={props.isLoading}
                    >
                        {button.title}
                    </Button>
                })}
            </div>
        </div>
    </div>
}

export default Toolbar