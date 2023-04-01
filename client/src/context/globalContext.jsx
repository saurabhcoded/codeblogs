import { useRouter } from 'next/router';
import React, { createContext, useContext, useState } from 'react'

export const globalContext = createContext(null)

export function Context({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const logoutHandler = () => {
        setUser(null);
        setToken(null);
        router.push("/");
    }
    return (
        <globalContext.Provider value={{ user, setUser, token, setToken, logoutHandler }}>
            {children}
        </globalContext.Provider>
    )

}
export const useGlobalContext = () => {
    const { user, setUser, token, setToken, logoutHandler } = useContext(globalContext);
    return { user, setUser, token, setToken, logoutHandler }
}