import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ButtonBase, MenuItem, Stack } from '../../../node_modules/@mui/material/index';
import NavItem from 'layout/DashLayout/Drawer/DrawerContent/Navigation/NavItem';
import { NavLink } from '../../../node_modules/react-router-dom/dist/index';
import 'styles/mainNavBar.scss';
import { useStateContext } from 'context/authContext';
import Profile from 'layout/DashLayout/Header/HeaderContent/Profile/index';
const MainLayout = () => {
    const { user } = useStateContext();
    return (
        <>
            <div className="navBarContainer">
                <div>
                    <NavLink to={''}>TMS</NavLink>
                    <div>
                        <NavLink to={'/Products'}>Produits</NavLink>
                        <NavLink to={'/About'}>A propos nous</NavLink>
                        <NavLink to={'/contact'}>Contacter-nous</NavLink>
                    </div>
                    {user ? (
                        <Profile />
                    ) : (
                        <NavLink className="auth" to={'/login'}>
                            login
                        </NavLink>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default MainLayout;
