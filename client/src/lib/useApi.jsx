import { useGlobalContext } from '@/context/globalContext'
import axios from 'axios'

const useApi = () => {
    const { token } = useGlobalContext();
    const ENDPOINT = {
        json: axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/"
        }),
        authjson: axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/",
            headers: {
                "auth-token": token
            }
        }),
        formdata: axios.create({
            baseURL: "http://localhost:5000/api/",
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }),
        authformdata: axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/",
            headers: {
                "Content-Type": "multipart/form-data",
                "auth-token": token
            }
        })

    }
    return ENDPOINT
}

export default useApi