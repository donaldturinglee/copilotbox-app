import axios, {AxiosError, AxiosRequestConfig} from "axios";

const instance = axios.create({
    baseURL: "",
    timeout: 5000,
    timeoutErrorMessage: "Request timed out",
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

instance.interceptors.request.use(
    config => {
        return {
            ...config,
        };
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export const requests = {
    get<T>(url: string, params: object, options?:AxiosRequestConfig): Promise<T> {
        return instance.get(url, { params, ...options });
    },
    post<T>(url: string, params: object, options?:AxiosRequestConfig): Promise<T> {
        return instance.post(url, params, {...options});
    },
    put<T>(url: string, params: object, options?:AxiosRequestConfig): Promise<T> {
        return instance.put(url, params, {...options});
    },
    delete<T>(url: string, params: object, options?:AxiosRequestConfig): Promise<T> {
        return instance.delete(url, { params, ...options });
    },
    patch<T>(url: string, params: object, options?:AxiosRequestConfig): Promise<T> {
        return instance.patch(url, params, {...options});
    },
};
