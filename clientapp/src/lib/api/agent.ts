import axios, { AxiosError } from "axios";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
});

agent.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        const axiosError = error as AxiosError;
        const data = axiosError.response?.data;
        const status = axiosError.response?.status;
        switch (status) {
            case 400:
                console.log('Bad Request', data);
                break;
            case 401:
                console.log('Unauthorized', data);
                break;
            case 403:
                console.log('Forbidden', data);
                break;
            case 404:
                console.log('Not Found', data);
                break;
            case 500:
                console.log('Server Error', data);
                break;
            default:
                console.log('Unknown Error', data);
                break;
        }
        return Promise.reject(error);
    } finally {
        store.uiStore.isIdle();
    }
});

export default agent;