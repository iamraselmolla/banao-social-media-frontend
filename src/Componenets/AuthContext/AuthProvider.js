import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext({
    token: "",
    localid: "",
    isLoggedIn: false,
    login: (localid, token, user) => { },
    logout: () => { },
    userData: {}
})


const AuthProvider = ({ children }) => {
    let initialToken, initialId, initialUserData;






    if (typeof window !== 'undefined') {
        initialToken = localStorage.getItem('token')
        initialId = localStorage.getItem('localid')
        initialUserData = localStorage.getItem('userData')
    }

    const [token, setToken] = useState(initialToken);
    const [localid, setLocalId] = useState(initialId);
    const [isLoggedIn, setLoggedIn] = useState(!!token);
    const [user, setUser] = useState(initialUserData);
    const loginHandler = (localid, token, userData) => {
        setToken(token);
        setLocalId(localid);
        setLoggedIn(true);
        localStorage.setItem('token', token);
        localStorage.setItem('localid', localid);

        localStorage.setItem('userData', JSON.stringify(userData));
    }
    const logoutHandler = () => {
        setToken(null);
        setLocalId(null);
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('localid');
        localStorage.removeItem("userData")
    }





    const authInfo = {
        token: token,
        localid: localid,
        login: loginHandler,
        logout: logoutHandler,
        isLoggedIn: isLoggedIn,
        userData: user
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;