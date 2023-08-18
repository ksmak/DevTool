import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    pages: number[]
    currentPage: number
    pageSize: number
    setPage: Dispatch<SetStateAction<number>>
    setPageSize: Dispatch<SetStateAction<number>>
}

const Pagination: React.FC<Props> = (props) => {

    const options: Array<Array<string | number>> = [
        [254, '254'],
        [508, '508'],
        [762, '762'],
        [1270, '1270'],
        [1275, '1275'],
        [5000, '5000'],
        [10000, '10000']
    ]

    return !!props.pages && props.pages.length
        ? <div className="h-12 pt-1 flex flex-row justify-between items-center">
            <select
                className="p-1 rounded border-2"
                defaultValue={props.pageSize}
                onChange={(e) => props.setPageSize(parseInt(e.target.value))}
            >
                {
                    options.map(opt => {
                        return (
                            <option key={opt[0]} value={opt[0]}>{opt[1]}</option>
                        )
                    })
                }
            </select>
            <nav className="flex flex flex-row justify-center">
                <ul className="list-style-none flex">
                    <li key={0}>
                        <a
                            className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                            href="#!"
                            aria-label="Previous"
                            onClick={() => props.setPage(props.pages[0])}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        props.pages.map(p => {
                            return (<li key={p}>
                                <a
                                    className={["relative block rounded-full px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white", (p === props.currentPage) ? "bg-primary-100" : "bg-transparent"].join(' ')}
                                    href="#!"
                                    onClick={() => props.setPage(p)}
                                >
                                    {p}
                                </a>
                            </li>
                            )
                        })
                    }
                    <li key={props.pages.length + 1}>
                        <a
                            className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                            href="#!"
                            aria-label="Next"
                            onClick={() => props.setPage(props.pages.length)}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        : null
}

export default Pagination