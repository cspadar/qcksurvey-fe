import axios from 'axios';
import { KEY_JWT } from './constants';

export const getToken = () => localStorage.getItem(KEY_JWT) || null;

const BASE_URL = 'http://localhost:8080/';
const TIMEOUT_MS = 1000 * 60;

const HEADERS = {
    "Content-type": "application/json",
};

const client = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT_MS,
    headers: HEADERS,
});

client.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${getToken()}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default client;