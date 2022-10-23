export const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^|)' + name + "=([^;]+)"))
    if(match) {
        return match[2]
    }
    return undefined
}

export const setCookie = (info: {name: string, value: string}, duration = 365) => {
    let expire = ""
    if(duration){
        let date = new Date()
        date.setTime(date.getTime() + duration * 24* 60 * 1000)
        expire = "; expires=" + date.toUTCString()
    }
    document.cookie = info.name + "=" + (info.value || "" + expire + "; path=/;")
}