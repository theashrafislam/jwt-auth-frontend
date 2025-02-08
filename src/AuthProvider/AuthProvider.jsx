import React, { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    // const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUserEmailPassword = async (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    const signInEmailPassword = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    const userSignOut = async () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const email = currentUser?.email || user?.email;
            const info = {
                role: 'user',
                email: currentUser?.email || user?.email
            };
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', info, { withCredentials: true })
                    .then(res => {
                        // navigate('/')
                    })
            }
            else {
                axios.post('http://localhost:5000/logout', { email }, { withCredentials: true })
                    .then(res => {
                        // navigate('/')
                        setUser(null);
                    })
            }
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        createUserEmailPassword,
        signInEmailPassword,
        loading,
        user,
        userSignOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;