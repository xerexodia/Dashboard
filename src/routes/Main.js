import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Home from 'pages/Main/Home';
import MainLayout from 'layout/MainLayout/index';
import ProductDetails from 'pages/Main/ProductDetails';
import About from 'pages/Main/About';
import Login from 'pages/authentication/Login';
import Products from 'pages/Main/Products';
import Contact from 'pages/Main/Contact';

// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'products',
            element: <Products />
        },
        {
            path: 'product/:id',
            element: <ProductDetails />
        },
        {
            path: 'about',
            element: <About />
        },

        {
            path: 'contact',
            element: <Contact />
        }
    ]
};

export default MainRoutes;
