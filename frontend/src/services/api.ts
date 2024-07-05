import axios from 'axios'
import * as process from "node:process";

const API_URL = `${process?.env?.APP_API_URL || 'http://localhost:4000'}/api/v1`

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const signUp = async (newUserCredentials: {
    email: string;
    password: string;
    name: string;
}) => api.post('/auth/signup', newUserCredentials)

export const login = async (credentials: {
    email: string;
    password: string;
}) => api.post('/auth/login', credentials);
