import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Genre } from "../../models/genre";
import { urlGenres } from "../../endpoints";
import { useSnackbar } from "../snackbar/SnackbarContext";

interface DataProviderProps {
    children: ReactNode;
}

interface DataContextType {
    genres: string[];
    fetchGenres: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {

    const [genres, setGenres] = useState<string[]>([]);
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

    useEffect(() => {
        fetchGenres();
    }, []);

    const value = {
        genres,
        fetchGenres,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within an DataProvider');
    }
    return context;
};