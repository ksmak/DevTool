export interface IDatabase {
    name: string
    namePlural: string
}

export interface IUser {
    id: number
    username: string | undefined
}

export interface IDictItem {
    id: number
    title: string
    isEnabled: boolean
}

export interface IDict {
    name: string
    value: IDictItem[]
}

export type IDevice = {
    id: number | null
    ip: string | null | undefined
    type_of_device: number | null | undefined
    location: string | null | undefined
    cabinet?: string | null | undefined
    department: number | null | undefined
    management: number | null | undefined
    employee?: string | null | undefined
    remote_admin_url?: string | null | undefined
}

export type IDeviceError = {
    id?: string | null | undefined
    ip?: string | null | undefined
    type_of_device?: string | null | undefined
    location?: string | null | undefined
    cabinet?: string | null | undefined
    department?: string | null | undefined
    management?: string | null | undefined
    employee?: string | null | undefined
    remote_admin_url?: string | null | undefined
}

export interface IRangeIP {
    ipFrom: string | null | undefined
    ipTo: string | null | undefined
    type_of_device: number | null | undefined
    location: string | null | undefined
    department: number | null | undefined
    management: number | null | undefined
}

export enum EButtonVariant {
    primary,
    secondary,
    danger,
    plus,
    squares_plus,
    printer,
    archive_box_x_mark,
    archive_box_arrow_down
}

export interface IButton {
    id: number
    title?: string
    variant: EButtonVariant
    onClick: () => void
}

export enum EFieldVariant {
    hidden = 'hidden',
    text = 'text',
    number = 'number',
    password = 'password',
    checkbox = 'checkbox',
    radiobox = 'radiobox',
    select = 'select'
}

export interface IFieldType {
    id: number
    title: string
    variant: EFieldVariant
    name: string
    dict?: string
    size: string
    maxLength: number
    onChange?: () => void
    comparator?: (a: any, b: any) => number
}

export interface IHeader {
    id: number
    field: number
    title: string
}

export interface IQuery {
    name: string
    value: number | string | null | undefined
}