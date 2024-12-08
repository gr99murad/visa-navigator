import  { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("UseAuth must be used within an AuthProvider");
    }
    const {isAuthenticated, user} = context;
    return {isAuthenticated,user};
        
};

export default useAuth;