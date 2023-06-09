import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext({
    user: null,
    setUser: () => {}
});

const DashContext = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const logout = async () => {
        await localStorage.removeItem('user');
        setUser(null);
        window.location = '/';
    };

    return <StateContext.Provider value={{ user, setUser, logout }}>{children}</StateContext.Provider>;
};

export default DashContext;
export const useStateContext = () => useContext(StateContext);
