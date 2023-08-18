import React from 'react'
import { EFieldVariant, IDict, IFieldType, IHeader } from '../../types/types'

interface Props<T> {
    fields: IFieldType[]
    headers: IHeader[]
    items: T[]
    dicts: IDict[]
    handleOpen: (item: T) => void
    sort: string | null
    order: boolean
    setSortAndOrder: (name: string) => void
    checks: number[]
    setCheck: (item: T) => void
    selectAll: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Table<T>(props: Props<T>) {
    return (
        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
            <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead className="border-b font-normal text-xs dark:border-neutral-500">
                    <tr className="border-b">
                        <th scope="col"
                            className="sticky top-0 h-10 bg-blue-200 border-r px-1 py-1 dark:border-neutral-500">
                            #
                        </th>
                        {props.headers.map(header => {
                            const field = props.fields.find(it => it.id === header.field)
                            return !!field && <th
                                key={header.id}
                                onClick={() => props.setSortAndOrder(field.name)}
                                scope="col"
                                className="sticky top-0 h-10 bg-blue-200 border-r px-1 py-1 dark:border-neutral-500 hover:cursor-pointer">
                                {
                                    field.name === props.sort
                                        ? props.order ? field.title + ' ↑' : field.title + ' ↓'
                                        : field.title
                                }
                            </th>
                        })}
                        <th scope="col"
                            className="sticky top-0 h-10 bg-blue-200 border-r px-1 py-1 dark:border-neutral-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
                            </svg>
                        </th>
                    </tr>
                    <tr>
                        <th scope="col"
                            className="sticky top-10 bg-blue-200 border-r p-1 dark:border-neutral-500"
                        >
                            <input type="checkbox" name="checkAll" id="checkAll" onChange={(e) => props.selectAll(e)} />
                        </th>
                        {props.headers.map(header => {
                            const field = props.fields.find(it => it.id === header.field)
                            return !!field && <th key={header.id} scope="col"
                                className="sticky top-10 bg-blue-200 border-r p-1 dark:border-neutral-500">
                                <input type="text" id={field.name} name={field.name} className="p-2 border w-full" />
                            </th>
                        })}
                        <th scope="col"
                            className="sticky top-10 bg-blue-200 border-r p-1 dark:border-neutral-500"
                        />
                    </tr>
                </thead>
                <tbody>
                    {!!props.items && (
                        props.items.map(item => {
                            return (
                                <tr
                                    className="border-b dark:border-neutral-500 transition duration-300 ease-in-out hover:bg-neutral-100"
                                    key={item['id' as keyof T] as number}
                                >
                                    <td className="whitespace-nowrap border-r px-1 py-1 font-normal text-xs dark:border-neutral-500">
                                        <input
                                            type="checkbox"
                                            name={"check_" + item['id' as keyof T]}
                                            id={"check_" + item['id' as keyof T]}
                                            onChange={() => props.setCheck(item)}
                                            checked={props.checks.includes(item['id' as keyof T] as number)}
                                        />
                                    </td>
                                    {props.headers.map(header => {
                                        const field = props.fields.find(it => it.id === header.field)
                                        if (field?.variant === EFieldVariant.select) {
                                            let dict = props.dicts.find(it => it.name === field.dict)?.value
                                            let v = dict?.find(it => it.id === item[field.name as keyof T])
                                            return (
                                                <td
                                                    key={field.id}
                                                    className="whitespace-nowrap border-r px-1 py-1 font-normal text-xs dark:border-neutral-500 hover:cursor-pointer"
                                                    onClick={() => props.handleOpen(item)}
                                                >
                                                    {v?.title}
                                                </td>
                                            )
                                        } else if (field?.variant === EFieldVariant.hidden) {
                                            return null
                                        } else {
                                            return (
                                                <td
                                                    key={field?.id}
                                                    className="whitespace-nowrap border-r px-1 py-1 font-normal text-xs dark:border-neutral-500 hover:cursor-pointer"
                                                    onClick={() => props.handleOpen(item)}
                                                >
                                                    {item[field?.name as keyof T] as string}
                                                </td>
                                            )
                                        }
                                    })}
                                    <td className="whitespace-nowrap border-r px-1 py-1 font-normal text-xs dark:border-neutral-500">
                                        {item['remote_admin_url' as keyof T]
                                            ? <a href={JSON.stringify(item['remote_admin_url' as keyof T])} target="_blank" rel="noreferrer">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                            : null
                                        }

                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}