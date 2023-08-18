import { Dispatch, SetStateAction } from 'react'
import Field from './Field'
import { IDict, IFieldType } from '../../types/types'

interface Props<T, E> {
    error: string | null
    errors: E
    fields: IFieldType[]
    item: T
    setItem: Dispatch<SetStateAction<T>>
    dicts: IDict[]
}

export default function Form<T, E>(props: Props<T, E>) {

    return (
        <form
            className='p-1 flex flex-col'
        >
            <div className="p-1 text-red-500">
                {props.error}
            </div>
            {
                props.fields.map(field => {
                    let dict = props.dicts.find(it => it.name === field.dict)
                    let error = props.errors && props.errors[field.name as keyof E] ? JSON.stringify(props.errors[field.name as keyof E]) : null
                    return <Field
                        key={field.id}
                        variant={field.variant}
                        error={error}
                        field={field}
                        item={props.item}
                        setItem={props.setItem}
                        dict={dict ? dict.value : []}
                    />
                })
            }
        </form>
    )
}