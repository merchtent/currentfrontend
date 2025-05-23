import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Genre } from "../../models/genre";
import { urlGenres, urlOrders } from "../../endpoints";
import { useSnackbar } from "../snackbar/SnackbarContext";
import { Order } from "../../models/order";

interface AccountProviderProps {
    children: ReactNode;
}

interface AccountContextType {
    genres: string[];
    fetchGenres: () => Promise<void>;
    orders: Order[];
    fetchOrders: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
    const [genres, setGenres] = useState<string[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const { showMessage } = useSnackbar();

    const fetchGenres = useCallback(async () => {
        try {
            const response: AxiosResponse<Genre[]> = await axios.get(urlGenres);
            const genres = response.data.map((type) => type.name ?? "");
            setGenres(genres);
        } catch (error: any) {
            showMessage('Failed to fetch genres', 'error');
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        try {
            const response: AxiosResponse<Genre[]> = await axios.get(urlOrders);
            setOrders(response.data);
        } catch (error: any) {
            showMessage('Failed to fetch orders', 'error');
        }
    }, []);

    useEffect(() => {
        fetchGenres();
    }, []);

    const value = {
        genres,
        fetchGenres,
        orders,
        fetchOrders
    };

    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export const useAccountContext = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccountContext must be used within an AccountProvider');
    }
    return context;
};
