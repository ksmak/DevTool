import { IDevice, IDict } from "../types/types"
import instance from "./instance"

const fetchDictionaries = () => {
    return instance.get<IDict[]>(`/api/dictionaries`)
}

const fetchDevices = (page: number, pageSize: number) => {
    return instance.get(`/api/devices?page=${page}&page_size=${pageSize}`)
}

const updateDevice = (item: IDevice) => {
    if (item?.id) {
        return instance.put<IDevice>(`/api/devices/${item.id}/`, item)
    } else {
        return instance.post<IDevice>('/api/devices/', item)
    }
}

const deleteDevice = (id: number | undefined | null) => {
    return instance.delete(`/api/devices/${id}/`)
}

const printDevices = (ids: string) => {
    return instance.get(`/api/devices/export_excel/?${ids}`)
}

const deviceModule = {
    fetchDictionaries,
    fetchDevices,
    updateDevice,
    deleteDevice,
    printDevices
}

export default deviceModule