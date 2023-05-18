import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import AdminDash from './AdminDash';
import MainRoutes from './Main';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([AdminDash, MainRoutes, LoginRoutes]);
}
