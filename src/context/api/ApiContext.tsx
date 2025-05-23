import React, { createContext, useContext, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSnackbar } from '../snackbar/SnackbarContext';

type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

interface ApiContextType {
    post: <T, R>(url: string, data: T) => Promise<AxiosResponse<R> | undefined>;
    put: <T, R>(url: string, data: T) => Promise<AxiosResponse<R> | undefined>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};

interface ApiProviderProps {
    children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
    const { showMessage } = useSnackbar();

    const post = async <T, R>(url: string, data: T): Promise<AxiosResponse<R> | undefined> => {
        try {
            const response = await axios.post<R>(url, data);
            //showMessage('Request successful', 'success');
            return response;
        } catch (error: any) {
            handleAxiosError(error);
        }
    };

    const put = async <T, R>(url: string, data: T): Promise<AxiosResponse<R> | undefined> => {
        try {
            const response = await axios.put<R>(url, data);
            //showMessage('Update successful', 'success');
            return response;
        } catch (error: any) {
            handleAxiosError(error);
        }
    };

    const handleAxiosError = (error: any) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Server responded with a status other than 200 range
                showMessage(`Error: ${error.response.data.message || error.message}`, 'error');
            } else if (error.request) {
                // Request was made but no response received
                showMessage('No response from the server. Please try again later.', 'error');
            } else {
                // Something happened in setting up the request
                showMessage(`Error: ${error.message}`, 'error');
            }
        } else {
            // Non-Axios error
            showMessage('An unexpected error occurred. Please try again later.', 'error');
        }
    };

    return (
        <ApiContext.Provider value={{ post, put }}>
            {children}
        </ApiContext.Provider>
    );
};
