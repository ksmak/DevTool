import React, { Dispatch, SetStateAction } from 'react'
import { EFieldVariant, IDict, IFieldType, IHeader, IQuery } from '../../types/types'

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
    selectAll: (e: React.ChangeEvent<HTMLInputElement>) => void,
    queries: IQuery[],
    setQueries: Dispatch<SetStateAction<IQuery[]>>,
}

export default function Table<T>(props: Props<T>) {
    return (
        <div className="overflow-y-auto h-[calc(100vh-10rem)] mt-2">
            <table className="min-w-full border text-sm font-light dark:border-neutral-500 shadow-md shadow-blue-gray-400">
                <thead className="border-b font-normal text-xs dark:border-neutral-500 bg-blue-100">
                    <tr className="border-b">
                        <th scope="col"
                            className="sticky top-0 h-10 border-r px-1 py-1 dark:border-neutral-500">
                            #
                        </th>
                        {props.headers.map(header => {
                            const field = props.fields.find(it => it.id === header.field)
                            return field ?
                                field.name === 'remote_admin_url'
                                    ? <th
                                        key={header.id}
                                        scope="col"
                                        className="sticky top-0 h-10 border-r px-1 py-1 dark:border-neutral-500 hover:cursor-pointer flex items-center"
                                        onClick={() => props.setSortAndOrder(field.name)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
                                        </svg>
                                        {
                                            field.name === props.sort
                                                ? props.order ? header.title + ' ↑' : header.title + ' ↓'
                                                : header.title
                                        }
                                    </th>
                                    : <th
                                        key={header.id}
                                        onClick={() => props.setSortAndOrder(field.name)}
                                        scope="col"
                                        className="sticky top-0 h-10 border-r px-1 py-1 dark:border-neutral-500 hover:cursor-pointer">
                                        {
                                            field.name === props.sort
                                                ? props.order ? header.title + ' ↑' : header.title + ' ↓'
                                                : header.title
                                        }
                                    </th>
                                : null
                        })}

                    </tr>
                    <tr>
                        <th scope="col"
                            className="sticky top-10 border-r p-1 dark:border-neutral-500"
                        >
                            <input type="checkbox" name="checkAll" id="checkAll" onChange={(e) => props.selectAll(e)} />
                        </th>
                        {props.headers.map(header => {
                            const field = props.fields.find(it => it.id === header.field)
                            const dict = props.dicts.find(it => it.name === field?.dict)
                            return field
                                ? field.name === 'remote_admin_url'
                                    ? <th key={header.id} scope="col"
                                        className="sticky top-10 border-r p-1 dark:border-neutral-500"
                                    />
                                    : <th key={header.id} scope="col"
                                        className="sticky top-10 border-r p-1 dark:border-neutral-500">
                                        {!field.dict
                                            ? <input
                                                className="p-1 border w-full"
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                onChange={(e) => {
                                                    const findQuery = props.queries.find(query => query.name === e.target.name);
                                                    if (findQuery) {
                                                        const qs = props.queries.map(query => {
                                                            if (query.name === e.target.name) {
                                                                return {
                                                                    name: e.target.name,
                                                                    value: e.target.value
                                                                }
                                                            } else {
                                                                return query;
                                                            }
                                                        })
                                                        props.setQueries(qs);
                                                    } else {
                                                        props.setQueries([...props.queries, { name: e.target.name, value: e.target.value }])
                                                    }
                                                }}
                                            />
                                            : <select
                                                className="p-1 border w-full bg-white"
                                                id={field.name}
                                                name={field.name}
                                                onChange={(e) => {
                                                    const findQuery = props.queries.find(query => query.name === e.target.name);
                                                    if (findQuery) {
                                                        const qs = props.queries.map(query => {
                                                            if (query.name === e.target.name) {
                                                                return {
                                                                    name: e.target.name,
                                                                    value: e.target.value
                                                                }
                                                            } else {
                                                                return query;
                                                            }
                                                        })
                                                        props.setQueries(qs);
                                                    } else {
                                                        props.setQueries([...props.queries, { name: e.target.name, value: e.target.value }])
                                                    }
                                                }}>
                                                <option value=''></option>
                                                {dict && dict.value.map(it => (
                                                    <option key={it.id} value={it.id.toString()}>{it.title}</option>
                                                ))}
                                            </select>}
                                    </th>
                                : null
                        })}
                    </tr>
                </thead>
                <tbody>
                    {!!props.items && (
                        props.items.map(item => {
                            return (
                                <tr
                                    className="border-b dark:border-neutral-500 transition duration-300 ease-in-out hover:bg-neutral-100 hover:bg-blue-gray-50"
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
                                        if (field?.name === 'remote_admin_url') {
                                            return <td key={field.id} className="whitespace-nowrap border-r px-1 py-1 font-normal text-xs dark:border-neutral-500">
                                                {item['remote_admin_url' as keyof T]
                                                    ? <a href={String(item['remote_admin_url' as keyof typeof item])} target="_blank" rel="noreferrer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
                                                        </svg>
                                                    </a>
                                                    : null
                                                }

                                            </td>
                                        }
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

                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}