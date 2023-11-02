import React from "react"
import { IconButton, Button as Btn, Tooltip } from "@material-tailwind/react"
import { EButtonVariant } from "../../types/types"

interface Props {
    title: string,
    variant: EButtonVariant
    onClick: () => void
    isDisabled: boolean
    children?: React.ReactNode
}

const Button = ({ title, variant, onClick, isDisabled, children }: Props) => {

    const renderButton = (
        title: string,
        variant: EButtonVariant,
        onClick: () => void,
        isDisabled: boolean,
        children?: React.ReactNode
    ) => {
        switch (variant) {
            case EButtonVariant.primary:
                return <Btn
                    size="md"
                    color="indigo"
                    onClick={onClick}
                    disabled={isDisabled}
                >
                    {children}
                </Btn>
            case EButtonVariant.secondary:
                return <Btn
                    size="md"
                    color="indigo"
                    variant="outlined"
                    onClick={onClick}
                    disabled={isDisabled}
                >
                    {children}
                </Btn>
            case EButtonVariant.danger:
                return <Btn
                    size="md"
                    color="red"
                    variant="outlined"
                    onClick={onClick}
                    disabled={isDisabled}
                >
                    {children}
                </Btn>
            case EButtonVariant.plus:
                return <Tooltip content={title}>
                    <IconButton
                        className="rounded-full"
                        variant="gradient"
                        color="blue"
                        onClick={onClick}
                    >
                        <img src="icons/plus.png" alt="plus" />
                    </IconButton>
                </Tooltip>
            case EButtonVariant.printer:
                return <Tooltip content={title}>
                    <IconButton
                        className="rounded-full"
                        variant="gradient"
                        color="blue"
                        onClick={onClick}
                    >
                        <img src="icons/print.png" alt="plus" />
                    </IconButton>
                </Tooltip>
            case EButtonVariant.archive_box_x_mark:
                return <Tooltip content={title}>
                    <IconButton
                        className="rounded-full"
                        variant="gradient"
                        color="red"
                        onClick={onClick}
                    >
                        <img src="icons/remove.png" alt="plus" />
                    </IconButton>
                </Tooltip>
            case EButtonVariant.archive_box_arrow_down:
                return <Tooltip content={title}>
                    <IconButton
                        className="rounded-full"
                        variant="gradient"
                        color="red"
                        onClick={onClick}
                    >
                        <img src="icons/replace.png" alt="plus" />
                    </IconButton>
                </Tooltip>
        }
    }

    return <> {
        renderButton(
            title,
            variant,
            onClick,
            isDisabled,
            children
        )
    } </>
}

export default Button