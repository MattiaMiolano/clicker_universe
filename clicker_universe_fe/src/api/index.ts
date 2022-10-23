import dayjs from "dayjs";
import Api, { ApiInternalSetType } from "../helpers/api";
import { getCookie, setCookie } from "../helpers/cookie";
import { refreshTokenApi } from "./auth.api";

export const api = new Api("http://localhost:5001", )

export const securedApi = new Api("http://localhost:5001",async ({headers} : ApiInternalSetType) => {
    const token = getCookie("token")
    const refreshToken = getCookie("refreshToken")
    const headerToken = headers?.get("authorization")
    const isRefreshing = getCookie("isRefreshing")
    if(!!headerToken && (headerToken || "").replace("Bearer ", "") !== token) {
        return
    } else if(isRefreshing !== "true" && refreshToken) {
        setCookie({name:"isRefreshing",value: "true"})
        try {
            let base64 = ""
            if(token){
            const base64Url = token.split(".")[1]
             base64 = base64Url.replace('-', '+').replace("_", "/")
            }
            const {exp = 0 } = JSON.parse(atob(base64))
            const now =  dayjs()
            const expired =  dayjs(exp * 1000)
            if(now.isAfter(expired)) {
                const { token: newToken} = await refreshTokenApi({refreshToken})
                if(newToken) {
                    headers?.set("authorization", `Bearer ${newToken}`)
                    setCookie({name: "isRefreshing", value: "false"})
                    return {headers}
                } else {
                    throw new Error()
                }
            } else { 
                setCookie({name: "isRefreshing", value: "false"})
                headers?.set("authorization", `Bearer ${token}`)
                return {headers}
            }
        } catch (e) {
            setCookie({name: "token", value: ""}, 30)
            setCookie({name: "refreshToken", value: ""}, 30)
        }
    }else {
        headers?.set("authorization", `Bearer ${token}`)
        return {headers}
    }
}, (errors) => {console.log(errors, " ERROR API")} )