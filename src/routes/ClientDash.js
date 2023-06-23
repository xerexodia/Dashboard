import Loadable from 'components/Loadable';
import Material from 'pages/AdminDash/Material';
import Visit from 'pages/AdminDash/Visit';
import InfoClient from 'pages/AdminDash/InfoClient';
import DashLayout from 'layout/DashLayout/index';
import Users from 'pages/AdminDash/Users';
import { Outlet } from 'react-router-dom';
import UserDetails from 'pages/AdminDash/UserDetails';
import { element } from 'prop-types';
import VisitDetails from 'pages/AdminDash/VisitDetails';
import Profile from 'pages/clientDashboard/Profile';
import Equipement from 'pages/clientDashboard/Equipement';
import Contact from 'pages/clientDashboard/Contact';
import BonCommande from 'pages/clientDashboard/BonCommande';
import MachineDetails from 'pages/clientDashboard/MachineDetails';
import AdminNotifications from 'pages/clientDashboard/AdminNotifications'

// ==============================|| DASH ROUTING ||============================== //

const ClientDashboard = {
    path: '/dashboard/user',
    element: <DashLayout />,
    children: [
        {
            path: '/dashboard/user/equipement',
            element: <Outlet />,
            children: [
                {
                    path: '',
                    element: <Equipement />
                },
                {
                    path: ':machineId',
                    element: <MachineDetails />
                }
            ]
        },
        {
            path: '/dashboard/user/profile',
            element: <Profile />
        },
        {
            path: '/dashboard/user/contact',
            element: <Contact />
        },
        {
            path: '/dashboard/user/AdminNotifications',
            element: <AdminNotifications />
        },
        {
            path: '/dashboard/user/bon',
            element: <BonCommande />
        }
    ]
};

export default ClientDashboard;
