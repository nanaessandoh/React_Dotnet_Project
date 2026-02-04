/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
});

agent.interceptors.response.use(
    async response => {
        await sleep(1000);
        store.uiStore.isIdle();
        return response;
    },
    async (error: AxiosError) => {
        await sleep(1000);
        store.uiStore.isIdle();
        const { status, data } = error.response as any

        switch (status) {
            case 400:
                if (data?.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    const flattened = modalStateErrors.flat();
                    for (const msg of flattened) {
                        toast.error(msg);
                    }
                    throw flattened;
                } else {
                    toast.error(data || "Bad Request");
                }
                break;
            case 401:
                toast.error("Unauthorized");
                break;
            case 404:
                router.navigate("/not-found");
                break;
            case 500:
                router.navigate("/server-error", { state: { error: data } });
                break;
            default:
                toast.error("Unknown Error");
                break;
        }
        return Promise.reject(error.response?.data);
    }
);

export default agent;