export const headersBuilder = () => ({
    "Content-type" : "application/json"
})

type ApiType = {
    baseUrl?: string;
    path?: string;
    method?: "GET" | "POST" |  "PUT" | "PATCH" | "DELETE";
    parse?: "JSON";
    body?: object | string | any;
    headers?: Headers
}

export type ApiInternalSetType = {
    baseUrl?: string;
    path?: string;
    body?: object | string | any;
    headers: Headers
}

export default class Api {
    private baseUrl?: string
    private interceptor?: (params: ApiInternalSetType) => ApiInternalSetType | Promise<ApiInternalSetType | undefined> | undefined
    private handleError?: (error: any) => Promise<void> | void | undefined

    constructor(
        baseUrl: string,
        interceptor?: (params: ApiInternalSetType) => ApiInternalSetType | Promise<ApiInternalSetType | undefined> | undefined,
        handleError?: (error: any) => Promise<void> | void | undefined
    ) {
        
        this.interceptor = this.interceptor
        this.handleError = this.handleError
        this.baseUrl = this.baseUrl
    }

    setBaseUrl(baseUrl : string)  {
        this.baseUrl = baseUrl
    }

    async call<BodyType>({
        baseUrl = this.baseUrl,
        path,
        method = "GET",
        parse = "JSON",
        body = undefined,
        headers: customHeaders  = new Headers()
    }: ApiType) : Promise<{payload: Response; body: BodyType | any}> {
        let headers = new globalThis.Headers(customHeaders)

        if(this.interceptor) {
            const {
                body: newBody,
                headers: newHeaders,
                baseUrl: newBaseUrl,
                path: newPath
            } = (await this.interceptor({
                body, headers, baseUrl, path
            })) || {};
            body = newBody || baseUrl
            headers = newHeaders || headers
            baseUrl = newBaseUrl ||baseUrl 
            path = newPath || path
        }

        if (method === "POST" || method === "PATCH") {
            headers.append("X-Request-With", "XMLHttpRequest")
        }

        const JsonBody = JSON.stringify(body)
        try {
            const result = await fetch(`${baseUrl}${path}`, {
                method,
                body: JsonBody,
                headers
            }).then(async (res) => {
                const p = res.clone()
                const b = await res.clone().json()
                if(res.status >= 200 && res.status <=399){
                    return {payload: p, body: b}
                }
                const error = b
                if(this.handleError) {
                    await this.handleError(error)
                }
                throw error
            })
            console.log(result)
            return result
        } catch(e) {
            throw e
        }
         
    }
}