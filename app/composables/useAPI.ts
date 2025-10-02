import type { ICreateResponse, IFindResponse, IFindAllResponse } from "~/types/response"
import { useAlerts } from "./useAlerts"


export const useAPI = () => {
    
    // const {token} = useAuth()
    // const headers = { "authorization": token.value?token.value:'' }
    const headers = {}

    const baseURL = useRuntimeConfig().public.apiBaseUrl as string
    const { createErrorNotification, createSuccessNotification, createDeleteNotification } = useAlerts()

    return {
        /**
         * method that will findall records
         * @returns 
         */
        async findAll<T>(path: string, query?: object, options?: any): Promise<any> {

            try {
                let { data: response, refresh, status, error } = await useFetch(path, { query, baseURL, headers })

                if (error.value) {
                    console.log('error :>> ', error);
                    createErrorNotification(error)
                }

                const results: ComputedRef<Array<T>> = computed(() => {
                    let result: Ref = response
                    return result.value && result.value.response?result.value.response.rows:[]
                })

                const count: ComputedRef<Number> = computed(() => {
                    let result: Ref = response
                    return result.value && result.value.response?result.value.response.count:0
                })

                return { results, count, data: response, refresh, pending:status.value ==='pending', error }
            } catch (error) {
                console.log('FETCH ERROR :', error)
            }
        },

        async find<T>(path: string, query?: object, options?: object): Promise<T> {
            return await $fetch<T>(`${baseURL}${path}`, { method: 'GET', query: query, headers })
        },

        async findOne<T>(path: string, query?: object, options?: object): Promise<T> {
            return await $fetch<T>(`${baseURL}${path}`, { method: 'GET', query: query, headers })
        },

        /**
         * 
         * @param body 
         * @param options 
         * @returns 
         */
        async findById<T>(path: string, id: number | string, query?: object, options?: any): Promise<IFindResponse<T>> {
            return await $fetch<IFindResponse<T>>(`${baseURL}${path}/${id}`, { method: 'GET',query: query, headers })
        },

        /**
         * 
         * @param body 
         * @param options 
         * @returns 
         */
        async createFetch(path: string, body: any, options?: any, bypassNotifications: boolean = false): Promise<any> {
            let { data: response, refresh, pending, error } = await useFetch(path, { method: "POST", body, baseURL, headers})

            //fetch error
            if (!bypassNotifications) {
                if (error.value) {
                    let errorMessage: string = '' + error.value
                    if (error.value.data) {
                        errorMessage = `ERROR #${error.value.data.error} - ${error.value.data.errorDescription}`
                    }
                    createErrorNotification(error)
                } else {
                    createSuccessNotification()
                }
            }


            const results: any = computed(() => {
                let result: Ref = response
                return result.value.response
            })

            return { results, data: response, pending, error, refresh }
        },

        /**
        * 
        * @param body 
        * @param options 
        * @returns 
        */
        async create<T>(path: string, body: any = {}, options?: any): Promise<ICreateResponse<T>|undefined>{

            let response: ICreateResponse<T>;
            try {
                response = await $fetch<ICreateResponse<T>>(
                        `${baseURL}${path}`, 
                        { method: 'POST', body, headers})

                createSuccessNotification()
                return response
            } catch (error) {
                createErrorNotification(error)
                console.log("CREATE ERROR", error)
            }
        },


        /**
       * 
       * @param body 
       * @param options 
       * @returns 
       */
        async update<T>(path: string, body: any = {}, options?: any): Promise<ICreateResponse<T> | undefined> {

            let response: ICreateResponse<T>;
            try {
                response = await $fetch<ICreateResponse<T>>(
                        `${baseURL}${path}/${body.id}`, 
                        { method: 'PUT', body, headers})

                createSuccessNotification()
                return response
            } catch (error) {
                createErrorNotification(error)
                console.log("UPDATE ERROR", error)
            }
        },

        async put<T>(path: string, body: any = {}, options?: any): Promise<ICreateResponse<T> | undefined> {

            let response: ICreateResponse<T>;
            try {
                response = await $fetch<ICreateResponse<T>>(
                        `${baseURL}${path}`, 
                        { method: 'PUT', body, headers})

                createSuccessNotification()
                return response
            } catch (error) {
                createErrorNotification(error)
                console.log("UPDATE ERROR", error)
            }
        },


        async post(path: string, body?: any, options?: any): Promise<any> {
            let { data: response, refresh, pending, error } = await useFetch(path, { method: "POST", body, baseURL, headers })

            const results: any = computed(() => {
                let result: Ref = response
                return result.value.response
            })

            return { results, data: response, pending, error, refresh }
        },

        async archive<T>(path: string, body: any = {}, options?: any): Promise<ICreateResponse<T> | undefined> {

            let response: ICreateResponse<T>;
            try {
                response = await $fetch<ICreateResponse<T>>(
                        `${baseURL}${path}/${body.id}`, 
                        { method: 'DELETE', body, headers})

                createDeleteNotification()
                return response
            } catch (error) {
                createErrorNotification(error)
                console.log("UPDATE ERROR", error)
            }
        },

        async restore<T>(path: string, body: any = {}, options?: any): Promise<ICreateResponse<T> | undefined> {

            let response: ICreateResponse<T>;
            try {
                response = await $fetch<ICreateResponse<T>>(
                        `${baseURL}${path}/restore/${body.id}`, 
                        { method: 'PUT', body, headers})

                createSuccessNotification('Restored completed', 'Record was successfully restored')
                return response
            } catch (error) {
                createErrorNotification(error)
                console.log("UPDATE ERROR", error)
            }
        },

        async upload<T>(path: string, body: FormData){

            let response: ICreateResponse<T>;
            try {
                response = await $fetch<ICreateResponse<T>>(
                        `${baseURL}${path}`, 
                        { method: 'POST', body, headers})

                return response
            } catch (error) {
                createErrorNotification(error)
                console.log("UPLOAD ERROR", error)
            }
        },

        async count(path: string, query?: object, options?: object): Promise<{count:number}> {
            return await $fetch<{count:number}>(`${baseURL}${path}`, { method: 'GET', query: query, headers })
        },


    }
}