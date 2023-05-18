import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ButtonBase, MenuItem, Stack } from '../../../node_modules/@mui/material/index';
import NavItem from 'layout/DashLayout/Drawer/DrawerContent/Navigation/NavItem';
import { NavLink } from '../../../node_modules/react-router-dom/dist/index';
import 'styles/mainNavBar.scss';
const MainLayout = () => {
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
                    <NavLink to={'/login'}>login</NavLink>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default MainLayout;
