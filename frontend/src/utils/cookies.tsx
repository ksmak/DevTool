const setCookie = (cname: string, cvalue: string | undefined | null, miliseconds: number) => {
    const d = new Date()
    d.setTime(d.getTime() + miliseconds)
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    return !!parts && parts.length === 2 ? parts.pop()?.split(';').shift() : ''
}

export {
    setCookie, getCookie
}