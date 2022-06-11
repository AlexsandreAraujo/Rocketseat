import React, { createContext, useCallback, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';

interface Props {
    children: React.ReactNode;
}

interface ToastContextData {
    addToast(): void;
    removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<Props> = ({ children }) => {
    const addToast = useCallback(() => {
        console.log(addToast);
    }, []);

    const removeToast = useCallback(() => {
        console.log(removeToast);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

export function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used whithin a ToastProvider');
    }

    return context;
}
