import { useGlobalContext } from '@/context/globalContext'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const LoginChecker = ({ path }) => {
    const { user } = useGlobalContext();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push(path ? path : "/auth/login")
        }
    },[user])
    return (
        <></>
    )
}

export default LoginChecker