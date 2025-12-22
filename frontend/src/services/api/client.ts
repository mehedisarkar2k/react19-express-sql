import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
} from 'axios'


export const API_BASE_URL = 'http://localhost:8080'

export interface Response<T = unknown> {
    success: boolean
    message: string
    data?: T
}

export interface APIError {
    success: boolean
    message: string
    data: APIErrorData
}

export interface APIErrorData {
    error: string
    errors?: ValidationError[]
}

export interface ValidationError {
    field: string
    message: string
    code: string
}

class ApiClient {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: `${API_BASE_URL}/api/v1`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        this.setupInterceptors()
    }

    private setupInterceptors() {
        // Request interceptor to add auth token
        this.instance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                // TODO: add auth token
                return config
            },
            (error) => {
                return Promise.reject(error)
            },
        )

        // Response interceptor for error handling
        this.instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                // TODO: handle auth
                if (error.response?.status === 401) {
                    // if (data?.session) {
                    //     await authClient.signOut();
                    // }
                    return Promise.reject(error)
                }

                return Promise.reject(error)
            },
        )
    }

    public get<T = any>(url: string, config = {}) {
        return this.instance.get<Response<T>>(url, config)
    }

    public post<T = any>(url: string, data?: any, config = {}) {
        return this.instance.post<Response<T>>(url, data, config)
    }

    public put<T = any>(url: string, data?: any, config = {}) {
        return this.instance.put<Response<T>>(url, data, config)
    }

    public patch<T = any>(url: string, data?: any, config = {}) {
        return this.instance.patch<Response<T>>(url, data, config)
    }

    public delete<T = any>(url: string, config = {}) {
        return this.instance.delete<Response<T>>(url, config)
    }
}

export const apiClient = new ApiClient()
