import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import AdminDash from './AdminDash';
import MainRoutes from './Main';
import { useStateContext } from 'context/authContext';
import ClientDashboard from './ClientDash';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { user } = useStateContext();
    const adminRoutes = useRoutes([AdminDash, MainRoutes]);
    const userRoutes = useRoutes([ClientDashboard, MainRoutes]);
    const mainRoutes = useRoutes([MainRoutes, LoginRoutes]);
    if (user) {
        if (user.isAdmin) {
            return adminRoutes;
        } else if (!user.isAdmin) {
            return userRoutes;
        }
    }
    return mainRoutes;
}
