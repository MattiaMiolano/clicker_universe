import { api } from "."
import { setCookie } from "../helpers/cookie";

export const loginApi = async ({username, password} : {username: string, password: string}) => {
    const {payload, body} = await api.call<{accesstoken: string}>({
        method: "POST",
        path: "/User/authenticate",
        body: {username, password}
    })
    if(payload.ok) {
        const {accessToken, refreshToken} = body
        setCookie({name: "token", value: accessToken})
        setCookie({name: "refreshToken", value: refreshToken})
        return {error: false, message: body}
    } else {
        throw new Error()
    }
}

export const refreshTokenApi = async ({refreshToken} : {refreshToken: string}) : Promise<{token?: string, refreshToken: string}> => {
    let b: any = {refreshToken}
    const {body} = await api.call<{
        refreshToken: string;
        accessToken?: string
    }>({method: "POST", path: "/User/RefreshToken", body: b})
    const {accessToken: newToken, refreshToken: newRefreshToken} = body
    if(newRefreshToken) { 
        setCookie({name: "refreshToken",value: refreshToken}, 30)
        if(newToken) {
            setCookie({name: "token", value: newToken}, 30)
        }
        return {token: newToken, refreshToken: newRefreshToken}
    } else {
        throw new Error(body)
    }
}