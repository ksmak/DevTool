import Button from './Button'
import { IButton } from '../../types/types'
import { useAuth } from '../../lib/auth'

interface Props {
    buttons: IButton[]
    isLoading: boolean
}

const Toolbar = ({ buttons, isLoading }: Props) => {
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return <div className="px-2 mt-2 font-medium dark:border-neutral-500 ">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
                <div className="text-sm text-indigo-900">Пользователь: <span className='font-bold text-orange-900'>{user?.fullName}</span></div>
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