import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://zap-shift-server-2i38.onrender.com', 
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;