import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react'

export const globalContext = createContext(null)

export function Context({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const logoutHandler = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
        router.push("/");
    }
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
        if (localStorage.getItem('user')) {
            setToken(localStorage.getItem('token'));
        }
    }, [])
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        }
        if (token) {
            localStorage.setItem('token', token)
        }
    }, [user, token])
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