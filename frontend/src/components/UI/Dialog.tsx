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
    size: string
    buttons: IButton[]
    isVisible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    children?: React.ReactNode
}

const Modal: React.FC<Props> = (props) => {

    return <Dialog open={props.isVisible} handler={props.setVisible}>
        <DialogHeader>
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {props.title}
            </h5>
            <Loading isLoading={props.isLoading} />
        </DialogHeader>
        <DialogBody>
            {props.children ? props.children : ''}
        </DialogBody>
        <DialogFooter>
            {
                props.buttons.map(button => {
                    return (
                        <Button
                            key={button.id}
                            variant={button.variant}
                            onClick={button.onClick}
                            isDisabled={props.isLoading}
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