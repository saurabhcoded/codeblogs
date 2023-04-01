import axios from 'axios'

const useApi = () => {
    const apiJson = axios.create({
        baseURL: "http://localhost:5000/api/"
    })
    const apiAuthJson = axios.create({
        baseURL: "http://localhost:5000/api/"
    })
    return { apiJson, apiAuthJson }
}

export default useApi