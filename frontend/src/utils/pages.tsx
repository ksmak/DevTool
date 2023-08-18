export const getPages = (count: number, pageSize: number) => {
    const pageCount = Math.ceil(count / pageSize)
    let pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return pages
}