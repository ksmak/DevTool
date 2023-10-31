import React, { Dispatch, SetStateAction } from "react"
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react"
import Button from "./Button"
import Loading from "./Loading"
import { IButton } from "../../types/types"

interface Props {
    title: string | null
    buttons: IButton[]
    isVisible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    children?: React.ReactNode
}

const Modal = ({ title, buttons, isVisible, setVisible, isLoading, children }: Props) => {

    return <Dialog open={isVisible} handler={setVisible}>
        <DialogHeader>
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {title}
            </h5>
            <Loading isLoading={isLoading} />
        </DialogHeader>
        <DialogBody>
            {children ? children : ''}
        </DialogBody>
        <DialogFooter className="gap-2">
            {
                buttons.map(button => {
                    return (
                        <Button
                            key={button.id}
                            title={button.title ? button.title : ''}
                            variant={button.variant}
                            onClick={button.onClick}
                            isDisabled={isLoading}
                        >
                            {button.title}
                        </Button>
                    )
                })
            }
        </DialogFooter>
    </Dialog>
}

export default Modal