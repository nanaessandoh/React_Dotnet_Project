import axios from "axios";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, async error => {
    const { data, status } = error.response;
    switch (status) {
        case 400:
            console.log('Bad Request', data);
            break;
        case 401:
            console.log('Unauthorized', data);
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
});

export default agent;