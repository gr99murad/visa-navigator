import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
 export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    // console.log(user);

    const login = (userData) =>{
        setIsAuthenticated(true);
        setUser(userData);
    };
    const logout = () =>{
        setIsAuthenticated(false);
        setUser(null);
    };

    const createNewUser =(email,password,name,photoURL) =>{
        return createUserWithEmailAndPassword(auth,email,password)
        .then((result) => {
            const user = result.user;
            return updateProfile(user, {
                displayName: name,
                photoURL,
            }).then(() => setUser({...user, displayName: name,photoURL}));
        });
    };

    const authInfo ={
        user,
        setUser,
        createNewUser,
        loading,
        login,
        logout,
    };
 

    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }

    }, [auth])
    return <AuthContext.Provider value={authInfo}>
        {!loading && children}
    </AuthContext.Provider>
};

export default AuthProvider;