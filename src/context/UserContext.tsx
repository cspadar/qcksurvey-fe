import * as React from 'react';
import { KEY_EMAIL, KEY_JWT } from '../utils/constants';

export interface IUserContext {
    email: string | null;
    onLogin: (email: string, token: string) => void;
    onLogout: () => void;
}

const DEFAULT_CONTEXT_VALUE = {
    email: localStorage.getItem(KEY_EMAIL) || null,
    onLogin: () => { },
    onLogout: () => { }
};

export const UserContext = React.createContext<IUserContext | null>(DEFAULT_CONTEXT_VALUE);

interface IProps {
    children: React.ReactNode;
}

export const UserContextProvider: React.FC<IProps> = ({ children }) => {

    const [email, setEmail] = React.useState<string | null>(DEFAULT_CONTEXT_VALUE.email);

    const onLogin = (email: string, token: string) => {
        localStorage.setItem(KEY_EMAIL, email);
        localStorage.setItem(KEY_JWT, token);
        setEmail(email);
    }

    const onLogout = () => {
        localStorage.removeItem(KEY_EMAIL);
        localStorage.removeItem(KEY_JWT);
        setEmail(null);
    }

    return <UserContext.Provider
        value={{
            email,
            onLogin,
            onLogout
        }}>
        {children}
    </UserContext.Provider>
}