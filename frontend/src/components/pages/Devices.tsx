import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../api'
import Table from '../UI/Table'
import Pagination from '../UI/Pagination'
import Toolbar from '../UI/Toolbar'
import { getPages } from '../../utils/pages'
import { ipComparator } from '../../utils/comparators'
import { useDevices } from '../hooks/useDevice'
import { EFieldVariant, EButtonVariant, IButton, IDatabase, IDevice, IDict, IFieldType, IHeader, IQuery, IUser } from '../../types/types'
import Form from '../UI/Form'
import Dialog from '../UI/Dialog'

const Devices = () => {
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

    const [showEditItemDialog, setShowEditItemDialog] = useState<boolean>(false)
    const [showDeleteItemDialog, setShowDeleteItemDialog] = useState<boolean>(false)
    const [showDeleteItemsDialog, setShowDeleteItemsDialog] = useState<boolean>(false)
    const [showReplaceItemDialog, setShowReplaceItemDialog] = useState<boolean>(false)
    const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false)
    const [dicts, setDicts] = useState<IDict[]>([])
    const [devices, setDevices] = useState<IDevice[]>([])
    const [device, setDevice] = useState<IDevice>(getEmptyDevice())
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
        username: localStorage.getItem('username'),
    }

    const fields: IFieldType[] = [
        { id: 1, variant: EFieldVariant.hidden, name: 'id', title: 'id', size: '1rem', maxLength: 10 },
        { id: 2, variant: EFieldVariant.text, name: 'ip', title: 'IP адрес', size: '50rem', maxLength: 15, comparator: (a, b) => ipComparator(a.ip, b.ip) },
        { id: 3, variant: EFieldVariant.select, name: 'type_of_device', title: 'Тип устройства', size: '100rem', maxLength: 0, dict: 'typesOfDevice' },
        { id: 4, variant: EFieldVariant.select, name: 'location', title: 'Адрес', size: '100rem', maxLength: 0, dict: 'locations' },
        { id: 5, variant: EFieldVariant.text, name: 'cabinet', title: 'Кабинет', size: '100rem', maxLength: 5 },
        { id: 6, variant: EFieldVariant.select, name: 'department', title: 'Служба', size: '100rem', maxLength: 0, dict: 'departments' },
        { id: 7, variant: EFieldVariant.select, name: 'management', title: 'Подразделение', size: '100rem', maxLength: 5, dict: 'managements' },
        { id: 8, variant: EFieldVariant.text, name: 'description', title: 'Описание', size: '100rem', maxLength: 255 },
        { id: 9, variant: EFieldVariant.text, name: 'employee', title: 'Сотрудник', size: '100rem', maxLength: 255 },
        { id: 10, variant: EFieldVariant.text, name: 'remote_admin_url', title: 'Ссылка для удаленного доступа', size: '100rem', maxLength: 500 },
    ]

    const tableHeaders: IHeader[] = [
        { id: 1, field: 2, title: 'IP' },
        { id: 2, field: 3, title: 'Тип устройства' },
        { id: 3, field: 4, title: 'Адрес' },
        { id: 4, field: 5, title: 'Кабинет' },
        { id: 5, field: 6, title: 'Служба' },
        { id: 6, field: 7, title: 'Подразделение' },
        { id: 7, field: 8, title: 'Описание' },
        { id: 8, field: 9, title: 'Сотрудник' },
        { id: 9, field: 10, title: '' },
    ]

    const toolbarButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.plus, title: 'Добавить новое устройство', onClick: () => { handleCreate() } },
        { id: 2, variant: EButtonVariant.printer, title: 'Распечатать', onClick: () => { handlePrintItem() } },
        { id: 3, variant: EButtonVariant.archive_box_x_mark, title: 'Удалить выделенные устройства', onClick: () => { handleOpenDeleteItemsDialog() } },
        { id: 4, variant: EButtonVariant.archive_box_arrow_down, title: 'Заменить значения', onClick: () => { handleOpenReplaceItemsDialog() } },
    ]

    const editItemButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.primary, title: 'Сохранить', onClick: () => { handleSave() } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Закрыть', onClick: () => { setShowEditItemDialog(false) } },
    ]

    const deleteItemButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.danger, title: 'Удалить', onClick: () => { handleDeleteItem(device) } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Отмена', onClick: () => { setShowDeleteItemDialog(false) } },
    ]

    const deleteItemsButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.danger, title: 'Удалить', onClick: () => { handleDeleteItems() } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Отмена', onClick: () => { setShowDeleteItemsDialog(false) } },
    ]

    const errorButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.secondary, title: 'Закрыть', onClick: () => { setShowErrorDialog(false) } },
    ]

    const replaceItemButtons: IButton[] = [
        { id: 1, variant: EButtonVariant.danger, title: 'Заменить', onClick: () => { handleReplaceItems() } },
        { id: 2, variant: EButtonVariant.secondary, title: 'Отмена', onClick: () => { setShowReplaceItemDialog(false) } },
    ]

    const IPRangeFields: IFieldType[] = [
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
        setShowEditItemDialog(true)
    }

    const handleOpen = (item: IDevice) => {
        setDevice(item)
        setError(null)
        setErrors([])
        setShowEditItemDialog(true)
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
                        setShowEditItemDialog(false)
                    } else if (resp.status === 200) {
                        setDevices(prev => {
                            const index = prev.findIndex(item => item.id === resp.data.id)
                            let new_arr = [...prev]
                            new_arr.splice(index, 1, resp.data)
                            return new_arr
                        })
                        setShowEditItemDialog(false)
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
                setShowEditItemDialog(false)
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
            setError("")
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

    const handleOpenReplaceItemsDialog = () => {
        if (!!checks && checks.length) {
            setError("")
            setShowReplaceItemDialog(true)
        } else {
            setError("Ничего не выбрано!")
            setShowErrorDialog(true)
        }
    }

    const handleReplaceItems = async () => {
        setShowReplaceItemDialog(false)
        setLoading(true)
        for (let i = 0; i < checks.length; i++) {
            let item = devices.find(it => it.id === checks[i])
            if (item) {
                try {
                    if (device.type_of_device) {
                        item.type_of_device = device.type_of_device;
                    }
                    if (device.location) {
                        item.location = device.location;
                    }
                    if (device.management) {
                        item.management = device.management;
                    }
                    if (device.department) {
                        item.department = device.department;
                    }
                    const response = await api.devices.updateDevice(item)
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
        setShowReplaceItemDialog(false)
    }

    return (
        <div>
            <Dialog
                title={database.name}
                isVisible={showEditItemDialog}
                setVisible={setShowEditItemDialog}
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
                title={`${database.name} - Замена`}
                isVisible={showReplaceItemDialog}
                setVisible={setShowReplaceItemDialog}
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
                buttons={deleteItemButtons}
                isVisible={showDeleteItemDialog}
                setVisible={setShowDeleteItemDialog}
                isLoading={loading}
            />
            <Dialog
                title={`Удалить ${database.namePlural}?`}
                buttons={deleteItemsButtons}
                isVisible={showDeleteItemsDialog}
                setVisible={setShowDeleteItemsDialog}
                isLoading={loading}
            />
            <Dialog
                title={error}
                buttons={errorButtons}
                isVisible={showErrorDialog}
                setVisible={setShowErrorDialog}
                isLoading={loading}
            />
            <main>
                <Toolbar
                    user={user}
                    buttons={toolbarButtons}
                    isLoading={loading}
                />
                <Pagination
                    pages={pages}
                    currentPage={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    count={devices.length}
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
                    queries={queries}
                    setQueries={setQueries}
                />
            </main>
        </div >
    )
}

export default Devices