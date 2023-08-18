import { Dispatch, SetStateAction } from 'react'
import { Input, Select, Option } from '@material-tailwind/react'
import { EFieldVariant, IDictItem, IFieldType } from '../../types/types'

interface Props<T> {
    variant: EFieldVariant
    field: IFieldType
    error: string | null
    item: T
    setItem: Dispatch<SetStateAction<T>>
    dict: IDictItem[]
}
export default function Field<T>(props: Props<T>) {

    const renderInput = (
        variant: EFieldVariant,
        field: IFieldType,
        dict: IDictItem[],
        item: T,
        onChange: Dispatch<SetStateAction<T>>,
        error: string | null
    ) => {
        switch (variant) {
            case EFieldVariant.hidden:
                return <input
                    type="hidden"
                    name={field.name}
                    value={item && item[field.name as keyof T] ? JSON.stringify(item[field.name as keyof T]) : ''}
                />
            case EFieldVariant.text
                || EFieldVariant.number
                || EFieldVariant.password
                || EFieldVariant.checkbox
                || EFieldVariant.radiobox:
                return <div className='w-full mb-3.5'>
                    <Input
                        label={field.title}
                        type={variant.valueOf()}
                        value={item[field.name as keyof T] ? item[field.name as keyof T] as string : ''}
                        onChange={(e) => onChange({ ...item, [field.name as keyof T]: e.target.value })}
                        crossOrigin={undefined}
                    />
                    <div className="text-sm text-red-500 p-1">{error}</div>
                </div>
            case EFieldVariant.select:
                return <div className='w-full'>
                    <Select
                        label={field.title}
                        value={JSON.stringify(item[field.name as keyof T])}
                        onChange={(e) => onChange({ ...item, [field.name as keyof T]: parseInt(e ? e : '') })}
                    >
                        {dict.map(it => (
                            <Option key={it.id} value={it.id.toString()}>{it.title}</Option>
                        ))}
                    </Select>
                    <span className="text-sm text-red-500 p-1">{error}</span>
                </div>
        }
    }
    return <> {
        renderInput(
            props.variant,
            props.field,
            props.dict,
            props.item,
            props.setItem,
            props.error
        )
    } </>
}