import { useMemo } from 'react'
import { IDevice, IFieldType, IQuery } from '../../types/types'

export const useSortedDevices = (
    items: Array<IDevice>,
    sort: string | null,
    order: boolean,
    fields: Array<IFieldType>
) => {
    const useSortedDevices = useMemo(() => {
        if (sort) {
            const field: IFieldType | undefined = fields?.find(it => it.name === sort)
            let arr: Array<any> = []
            if (field?.comparator) {
                arr = [...items].sort(field.comparator)
            } else {
                arr = [...items].sort((a, b) => {
                    const aa: string = a[sort as keyof IDevice] ? JSON.stringify(a[sort as keyof IDevice]) : ''
                    const bb: string = b[sort as keyof IDevice] ? JSON.stringify(b[sort as keyof IDevice]) : ''
                    return aa.localeCompare(bb)
                })
            }
            if (order)
                return arr
            else
                return arr.reverse()
        }

        return items;

    }, [sort, items, order, fields])

    return useSortedDevices
}

export const useDevices = (
    items: Array<IDevice>,
    sort: string | null,
    order: boolean,
    fields: Array<IFieldType>,
    queries: Array<IQuery>
) => {
    const sortedDevices = useSortedDevices(items, sort, order, fields);

    const sortedAndSearchDevices = useMemo(() => {
        return sortedDevices.filter(item => {
            let condition: boolean = true
            queries.forEach(element => {
                if (element.value) {
                    condition = condition && item[element.name].toString().toLowerCase().startsWith(element.value?.toString().toLowerCase());
                }
            });
            return condition
        });
    }, [queries, sortedDevices])

    return sortedAndSearchDevices
}