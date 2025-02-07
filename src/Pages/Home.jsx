import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
// import useAuth from '../Hooks/useAuth';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Home = () => {
    const [data, setData] = useState([]);
    const {user} = useContext(AuthContext);
    // console.log('hello',document.cookie)
    useEffect(() => {
        axios.get(`http://localhost:5000/secret-data?email=${user?.email}`, { withCredentials: true })
            .then(res => {
                setData(res?.data?.data)
                console.log(res);
            })
    }, [user])
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
        </div>
    );
};

export default Home;