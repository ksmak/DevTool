import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../api'
import Table from '../UI/Table'
import Pagination from '../UI/Pagination'
import Toolbar from '../UI/Toolbar'
import { getPages } from '../../utils/pages'
import { ipComparator } from '../../utils/comparators'
import { useDevices } from '../hooks/useDevice'
import { EFieldVariant, EButtonVariant, IButton, IDatabase, IDevice, IDict, IFieldType, IHeader, IQuery, IRangeIP, IUser } from '../../types/types'
import Form from '../UI/Form'
import Dialog from '../UI/Dialog'

const Devices: React.FC = () => {
    const getEmptyDevice = () => {
        return {
            id: null,
            ip: null,
            type_of_device: null,
            location: null,
            cabinet: null,
            department: null,
            management: null,
            employee: null,
            remote_admin_url: null
        }
    }

    const getEmptyIPRange = () => {
        return {
            ipFrom: null,
            ipTo: null,
            type_of_device: null,
            location: null,
            department: null,
            management: null
        }
    }

    const [showEditItem, setShowEditItem] = useState<boolean>(false)
    const [showDeleteItemDialog, setShowDeleteItemDialog] = useState<boolean>(false)
    const [showDeleteItemsDialog, setShowDeleteItemsDialog] = useState<boolean>(false)
    const [showCreateIPRange, setShowCreateIPRange] = useState<boolean>(false)
    const [showReplaceItem, setShowReplaceItem] = useState<boolean>(false)
    const [showReplaceItemDialog, setShowReplaceItemDialog] = useState<boolean>(false)
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false)
    const [dicts, setDicts] = useState<IDict[]>([])
    const [devices, setDevices] = useState<IDevice[]>([])
    const [device, setDevice] = useState<IDevice>(getEmptyDevice())
    const [rangeIP, setRangeIP] = useState<IRangeIP>(getEmptyIPRange())
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(254)
    const [errors, setErrors] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [order, setOrder] = useState<boolean>(true)
    const [sort, setSort] = useState<string | null>(null)
    const [queries, setQueries] = useState<IQuery[]>([])
    const [checks, setChecks] = useState<number[]>([])

    const database: IDatabase = {
        name: "Сетевое устройство",
        namePlural: "Сетевые устройства",
    }

    const user: IUser = {
        id: 1,
        username: 'root',
        fullname: 'root',
        src: `${process.env.REACT_APP_HOST_API}/media/images/root.bmp`
    }

    const fields: IFieldType[] = [
        { id: 1, variant: EFieldVariant.hidden, name: 'id', title: 'id', size: '1rem', maxLength: 10 },
        { id: 2, variant: EFieldVariant.text, name: 'ip', title: 'IP адрес', size: '50rem', maxLength: 15, comparator: (a, b) => ipComparator(a.ip, b.ip) },
        { id: 3, variant: EFieldVariant.select, name: 'type_of_device', title: 'Тип устройства', size: '100rem', maxLength: 0, dict: 'typesOfDevice' },
        { id: 4, variant: EFieldVariant.text, name: 'location', title: 'Адрес', size: '100rem', maxLength: 300 },
        { id: 5, variant: EFieldVariant.text, name: 'cabinet', title: 'Кабинет', size: '100rem', maxLength: 5 },
        { id: 6, variant: EFieldVariant.select, name: 'department', title: 'Служба', size: '100rem', maxLength: 0, dict: 'departments' },
        { id: 7, variant: EFieldVariant.select, name: 'management', title: 'Подразделение', size: '100rem', maxLength: 5, dict: 'managements' },
        { id: 8, variant: EFieldVariant.text, name: 'employee', title: 'Сотрудник', size: '100rem', maxLength: 255 },
        { id: 9, variant: EFieldVariant.text, name: 'remote_admin_url', title: 'Ссылка для удаленного доступа', size: '100rem', maxLength: 500 },
    ]

    const tableHeaders: IHeader[] = [
        { id: 1, field: 2, title: 'IP' },
        { id: 2, field: 3, title: 'Тип устройства' },
        { id: 3, field: 4, title: 'Адрес' },
        { id: 4, field: 5, title: 'Кабинет' },
        { id: 5, field: 6, title: 'Служба' },
        { id: 6, field: 7, title: 'Подразделение' },
        { id: 7, field: 8, title: 'Сотрудник' },
    ]

    const toolbarButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.plus, onClick: () => { handleCreate() } },
        { id: 2, variant: EButtonVariant.squares_plus, onClick: () => { handleCreateIPRange() } },
        { id: 3, variant: EButtonVariant.printer, onClick: () => { handlePrintItem() } },
        { id: 4, variant: EButtonVariant.archive_box_x_mark, onClick: () => { handleOpenDeleteItemsDialog() } },
        { id: 5, variant: EButtonVariant.archive_box_arrow_down, onClick: () => { hanldeOpenReplaceItemDialog() } },
    ]

    const editItemButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.primary, title: 'Сохранить', onClick: () => { handleSave() } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Закрыть', onClick: () => { setShowEditItem(false) } },
    ]

    const deleteItemButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.danger, title: 'Удалить', onClick: () => { handleDeleteItem(device) } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Отмена', onClick: () => { setShowDeleteItemDialog(false) } },
    ]

    const deleteItemsButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.danger, title: 'Удалить', onClick: () => { handleDeleteItems() } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Отмена', onClick: () => { setShowDeleteItemsDialog(false) } },
    ]

    const createIPRangeButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.primary, title: 'Создать', onClick: () => { handleSaveIPRange() } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Закрыть', onClick: () => { setShowCreateIPRange(false) } },
    ]

    const errorButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.secondary, title: 'Закрыть', onClick: () => { setShowErrorDialog(false) } },
    ]

    const replaceItemButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.danger, title: 'Заменить', onClick: () => { setShowReplaceItemDialog(true) } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Отмена', onClick: () => { setShowReplaceItem(false) } },
    ]

    const replaceItemDialogButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.danger, title: 'Заменить', onClick: () => { handleReplaceItem() } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Отмена', onClick: () => { setShowReplaceItemDialog(false) } },
    ]

    const IPRangeFields: IFieldType[] = [
        { id: 1, variant: EFieldVariant.text, name: 'ipFrom', title: 'IP начало', size: '100rem', maxLength: 15 },
        { id: 2, variant: EFieldVariant.text, name: 'ipTo', title: 'IP конец', size: '100rem', maxLength: 15 },
        { id: 3, variant: EFieldVariant.select, name: 'type_of_device', title: 'Тип устройства', size: '100rem', maxLength: 0, dict: 'typesOfDevice' },
        { id: 4, variant: EFieldVariant.text, name: 'location', title: 'Адрес', size: '100rem', maxLength: 300 },
        { id: 5, variant: EFieldVariant.select, name: 'department', title: 'Служба', size: '100rem', maxLength: 0, dict: 'departments' },
        { id: 6, variant: EFieldVariant.select, name: 'management', title: 'Подразделение', size: '100rem', maxLength: 5, dict: 'managements' },
    ]

    const sortedAndSearchDevices = useDevices(devices, sort, order, fields, queries)

    const setSortAndOrder = (field: string) => {
        if (sort === field) {
            setOrder(!order);
        } else {
            setOrder(true)
            setSort(field)
        }
    }

    useEffect(() => {
        api.devices.fetchDictionaries()
            .then(resp => {
                setDicts(resp.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])

    useEffect(() => {
        api.devices.fetchDevices(page, pageSize)
            .then(resp => {
                setDevices(resp.data.results)
                setPages(getPages(resp.data.count, pageSize))
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [page, pageSize])

    const handleCreate = () => {
        setDevice(getEmptyDevice())
        setError(null)
        setErrors([])
        setShowEditItem(true)
    }

    const handleOpen = (item: IDevice) => {
        setDevice(item)
        setError(null)
        setErrors([])
        setShowEditItem(true)
    }

    const handleSave = () => {
        setLoading(true)
        api.devices.updateDevice(device)
            .then(resp => {
                setLoading(false)
                if (axios.isAxiosError(resp)) {
                    setError('Ошибки в данных!')
                    setErrors(resp?.response?.data)
                } else {
                    if (resp.status === 201) {
                        setDevices(prev => prev.concat(resp.data))
                        setShowEditItem(false)
                    } else if (resp.status === 200) {
                        setDevices(prev => {
                            const index = prev.findIndex(item => item.id === resp.data.id)
                            let new_arr = [...prev]
                            new_arr.splice(index, 1, resp.data)
                            return new_arr
                        })
                        setShowEditItem(false)
                    }
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setError(err.message)
            })
    }

    const handleDeleteItem = (item: IDevice | undefined) => {
        setLoading(true)
        if (!item) {
            setError('Ошибка! Объект не определен!')
            setShowErrorDialog(true)
            return
        }
        api.devices.deleteDevice(item.id)
            .then(resp => {
                console.log(resp)
                setLoading(false)
                setShowDeleteItemDialog(false)
                setShowEditItem(false)
                setDevices(prev => {
                    const index = prev.findIndex(it => it.id === item.id)
                    let new_arr = [...prev]
                    new_arr.splice(index, 1)
                    return new_arr
                });
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setError(err.message)
                setShowErrorDialog(true)
            })
    }

    const handleDeleteItems = async () => {
        setError(null)
        setLoading(true)
        for (let i = 0; i < checks.length; i++) {
            try {
                const resp = await api.devices.deleteDevice(checks[i])
                console.log(resp)
                setDevices(prev => {
                    const index = prev.findIndex(it => it.id === checks[i])
                    let new_arr = [...prev]
                    new_arr.splice(index, 1)
                    return new_arr
                })
            } catch (err: any) {
                console.log(err)
                setLoading(false)
                setError(err.message)
                setShowErrorDialog(true)
                return
            }
        }
        setLoading(false)
        setChecks([])
        setShowDeleteItemsDialog(false)
    }

    const handleCreateIPRange = () => {
        setRangeIP(getEmptyIPRange)
        setError(null)
        setErrors([])
        setShowCreateIPRange(true)
    }

    const handleSaveIPRange = async () => {
        setLoading(true)
        setError(null)
        const validIp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
        if (validIp.test(rangeIP?.ipFrom ? rangeIP.ipFrom : '')) {
            if (validIp.test(rangeIP?.ipTo ? rangeIP.ipTo : '')) {
                const ipFrom = rangeIP?.ipFrom ? rangeIP.ipFrom.split('.') : ['0', '0', '0', '0']
                const ipTo = rangeIP?.ipTo ? rangeIP.ipTo.split('.') : ['0', '0', '0', '0']
                if (ipFrom[0] === ipTo[0] && ipFrom[1] === ipTo[1] && ipFrom[2] === ipTo[2] && ipFrom[3] < ipTo[3]) {
                    for (let i = parseInt(ipFrom[3]); i <= parseInt(ipTo[3]); i++) {
                        const device = {
                            id: null,
                            ip: `${ipFrom[0]}.${ipFrom[1]}.${ipFrom[2]}.${i}`,
                            type_of_device: rangeIP?.type_of_device,
                            location: rangeIP?.location,
                            management: rangeIP?.management,
                            department: rangeIP?.department,
                        }
                        try {
                            const resp = await api.devices.updateDevice(device)
                            console.log(resp)
                            if (!!resp && resp.status !== 200) {
                                setLoading(false)
                                setError(`Ошибка! ${JSON.stringify(resp.data, null, 4)}`)
                                return
                            }
                            setDevices(prev => prev.concat(resp.data))
                        } catch (err: any) {
                            console.error(err)
                            setLoading(false)
                            setError(err.message)
                            return
                        }
                    }
                    setLoading(false)
                    setShowCreateIPRange(false)
                } else {
                    setLoading(false)
                    setError("Ошибка! Неверный диапазон!")
                }
            } else {
                setLoading(false)
                setError("Ошибка! Некорректный IP (конец)")
            }
        } else {
            setLoading(false)
            setError("Ошибка! Некорректный IP (начало)")
        }
    }

    const handleSetCheck = (item: IDevice) => {
        let checkArray = [...checks]
        let index = checkArray.findIndex(it => it === item.id)
        if (index >= 0) {
            checkArray.splice(index, 1)
        } else {
            checkArray.push(item.id ? item.id : 0)
        }
        setChecks(checkArray)
    }

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            let checkArray = []
            for (let i = 0; i < sortedAndSearchDevices.length; i++) {
                checkArray.push(sortedAndSearchDevices[i].id)
            }
            setChecks(checkArray)
        } else {
            setChecks([])
        }
    }

    const handleOpenDeleteItemsDialog = () => {
        if (!!checks && checks.length) {
            setShowDeleteItemsDialog(true)
        } else {
            setError("Ничего не выбрано!")
            setShowErrorDialog(true)
        }
    }

    const handlePrintItem = () => {
        if (checks.length <= 0) {
            setError("Ничего не выбрано!")
            setShowErrorDialog(true)
            return
        }
        let checkArray = []
        for (let i = 0; i < checks.length; i++) {
            checkArray.push(`ids=${checks[i]}`)
        }
        const ids = checkArray.join('&')
        api.devices.printDevices(ids)
            .then(resp => {
                console.log(resp)
                let ref = document.createElement('a');
                ref.href = `${process.env.REACT_APP_HOST_API}${resp.data.url}`
                ref.click();
            })
            .catch(err => {
                setError(err.message)
                setShowErrorDialog(true)
            })
    }

    const hanldeOpenReplaceItemDialog = () => {
        if (checks.length <= 0) {
            setError("Ничего не выбрано!")
            setShowErrorDialog(true)
            return
        }
        setShowReplaceItem(true)
    }

    const handleReplaceItem = async () => {
        setShowReplaceItemDialog(false)
        setLoading(true)
        for (let i = 0; i < checks.length; i++) {
            let item = devices.find(it => it.id === checks[i])
            if (item) {
                try {
                    const response = await api.devices.updateDevice(item)
                    console.log(response)
                    setDevices(prev => {
                        const index = prev.findIndex(item => item.id === response.data.id);
                        let new_arr = [...prev];
                        new_arr.splice(index, 1, response.data);
                        return new_arr;
                    })
                } catch (err: any) {
                    console.log(err)
                    setLoading(false)
                    setError(err.message)
                    setShowErrorDialog(true)
                    break
                }
            }
        }
        setLoading(false)
        setShowReplaceItem(false)
    }

    return (
        <div>
            <Dialog
                title={database.name}
                size='xl'
                isVisible={showEditItem}
                setVisible={setShowEditItem}
                buttons={editItemButtons}
                isLoading={loading}
            >
                <Form
                    error={error}
                    errors={errors}
                    fields={fields}
                    item={device}
                    setItem={setDevice}
                    dicts={dicts}
                />
            </Dialog>
            <Dialog
                title="Диапазон IP"
                size='xl'
                isVisible={showCreateIPRange}
                setVisible={setShowCreateIPRange}
                buttons={createIPRangeButtons}
                isLoading={loading}
            >
                <Form
                    error={error}
                    errors={errors}
                    fields={IPRangeFields}
                    item={rangeIP}
                    setItem={setRangeIP}
                    dicts={dicts}
                />
            </Dialog>
            <Dialog
                title={`${database.name} - Замена`}
                size='xl'
                isVisible={showReplaceItem}
                setVisible={setShowReplaceItem}
                buttons={replaceItemButtons}
                isLoading={loading}
            >
                <Form
                    error={error}
                    errors={errors}
                    fields={IPRangeFields}
                    item={device}
                    setItem={setDevice}
                    dicts={dicts}
                />
            </Dialog>
            <Dialog
                title={`Удалить ${database.name}?`}
                size='md'
                buttons={deleteItemButtons}
                isVisible={showDeleteItemDialog}
                setVisible={setShowDeleteItemDialog}
                isLoading={loading}
            />
            <Dialog
                title={`Удалить ${database.namePlural}?`}
                size='md'
                buttons={deleteItemsButtons}
                isVisible={showDeleteItemsDialog}
                setVisible={setShowDeleteItemsDialog}
                isLoading={loading}
            />
            <Dialog
                title={error}
                size='md'
                buttons={errorButtons}
                isVisible={showErrorDialog}
                setVisible={setShowErrorDialog}
                isLoading={loading}
            />
            <Dialog
                title={`Заменить данные?`}
                size='md'
                buttons={replaceItemDialogButtons}
                isVisible={showReplaceItemDialog}
                setVisible={setShowReplaceItemDialog}
                isLoading={loading}
            />
            <main>
                <Toolbar
                    user={user}
                    title={database.namePlural}
                    buttons={toolbarButtons}
                    isLoading={loading}
                />
                <Pagination
                    pages={pages}
                    currentPage={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
                <Table
                    fields={fields}
                    headers={tableHeaders}
                    items={sortedAndSearchDevices}
                    dicts={dicts}
                    handleOpen={(item) => handleOpen(item)}
                    sort={sort}
                    order={order}
                    setSortAndOrder={setSortAndOrder}
                    checks={checks}
                    setCheck={handleSetCheck}
                    selectAll={handleSelectAll}
                />
            </main>
        </div >
    )
}

export default Devices