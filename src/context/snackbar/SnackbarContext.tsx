import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

interface SnackbarContextType {
    showMessage: (message: string, severity: SnackbarSeverity) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('info');

    const showMessage = (message: string, severity: SnackbarSeverity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Set position to top-right
            >
                <Alert onClose={handleClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
