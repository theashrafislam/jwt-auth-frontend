import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
// import useAuth from '../Hooks/useAuth';
import { AuthContext } from '../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const Home = () => {
    const [data, setData] = useState([]);
    const { user, loading } = useContext(AuthContext);

    const [adminData, setAdminData] = useState({});
    const getAdminData = async () => {
        const response = await axios.get('http://localhost:5000/admin-api', { withCredentials: true })
        setAdminData(response?.data?.data)
        console.log(response);
    }

    // console.log('hello',document.cookie)
    useEffect(() => {
        if (!user?.email) return
        axios.get(`http://localhost:5000/secret-data?email=${user?.email}`, { withCredentials: true })
            .then(res => {
                setData(res?.data?.data)
                console.log(res);
            })
            .catch(error => {
                // alert(error?.response?.status)
                toast.error(error?.response?.status)
            });
        getAdminData()
    }, [user?.email]);
    if (loading) {
        return <p className='text-2xl text-center text-red-500 font-bold mt-16'>Loading...</p>
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">User List</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((user, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>

            <div>
                <h1 className='text-center text-2xl mb-3'>For Admin
                </h1>
                <div className='border-2 p-3 bg-gray-400 text-white'>
                    <h1 className='text-xl text-red-500 font-bold'>Name: {adminData?.name}</h1>
                    <h1 className='text-xl text-red-500 font-bold'>Email: {adminData?.email}</h1>
                    <h1 className='text-xl text-red-500 font-bold'>Passwrod: {adminData?.password}</h1>
                    <h1 className='text-xl text-red-500 font-bold'>Role: {adminData?.role}</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;