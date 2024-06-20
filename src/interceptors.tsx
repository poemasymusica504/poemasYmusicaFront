import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import useUserStore from './infrastructure/context/User';

import axios from "axios";


const URL_API = import.meta.env.VITE_URL_API;

type ErrorResponse = {
    response?: {
        status: number;
        data: {
            error: string
        };
    };
    error_name?: string
};

function getCSRFTokenFromCookie(): string {
	const cookieValue = document.cookie
		.split('; ')
		.find((row) => row.startsWith('csrftoken='))
		?.split('=')[1];
	return cookieValue || '';
}

export const RequestInterceptor = () => {
    const navigate = useNavigate();
    const { token } = useUserStore((state) => state);
    
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                config.baseURL = URL_API;

                if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json';
                if (token) {
                    config.headers.Authorization = `token ${token}`;
					if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json';               
                }

                const csrftoken = getCSRFTokenFromCookie();
                if (csrftoken) {
                    config.headers['X-CSRFToken'] = csrftoken;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error)
            },
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor)
        };
    }, [navigate]);

    return null;
};

export const ResponseInterceptor = () => {
    const navigate = useNavigate();
    const { message } = App.useApp();

    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: ErrorResponse) => {
                if (!error.response) {
                    void message.open({
                        type: 'error',
                        content: 'No se puede establecer conexión con el servidor',
                        key: '502',
                    });
                } else {
                    const code = error.response.status;

                    if (code === 401) {
                        void message.error('Acceso no autorizado');
                        navigate('/login');
                    }
                }

                error.error_name = 'Testing';
                return Promise.reject(error);
            },
        );

        return () => {
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate])

    return null;
};