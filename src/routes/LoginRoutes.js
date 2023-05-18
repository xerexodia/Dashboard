import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/login',
    element: <AuthLogin />
};

export default LoginRoutes;
