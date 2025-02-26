import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {

    const { userSignOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                // console.log('log out the user');
                userSignOut()
                    .then(() => {
                        navigate('/login')
                    })
                    .catch(error => {
                        
                    })
            }
        })
    }, [])

    return axiosSecure;
};

export default useAxiosSecure;