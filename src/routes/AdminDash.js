import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Material from 'pages/AdminDash/Material';
import Visit from 'pages/AdminDash/Visit';
import InfoClient from 'pages/AdminDash/InfoClient';
import Equipement from 'pages/AdminDash/Equipement';
import DashLayout from 'layout/DashLayout/index';
import Users from 'pages/AdminDash/Users';
import { Outlet } from 'react-router-dom';
import UserDetails from 'pages/AdminDash/UserDetails';
import MachineDetails from 'pages/AdminDash/MachineDetails';
import { element } from 'prop-types';
import VisitDetails from 'pages/AdminDash/VisitDetails';

// ==============================|| DASH ROUTING ||============================== //

const AdminDash = {
    path: '/dashboard/admin',
    element: <DashLayout />,
    children: [
        {
            path: 'users',
            element: <Outlet />,
            children: [
                { path: '', element: <Users /> },
                {
                    path: ':userId',
                    element: <Outlet />,
                    children: [
                        {
                            path: '',
                            element: <UserDetails />
                        },
                        {
                            path: 'machine/:machineId',
                            element: <Outlet />,
                            children: [
                                {
                                    path: '',
                                    element: <MachineDetails />
                                },
                                {
                                    path: 'visit/:id',
                                    element: <VisitDetails />
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/dashboard/admin/material',
            element: <Material />
        },
        {
            path: '/dashboard/admin/visit',
            element: <Visit />
        },
        {
            path: '/dashboard/admin/infoClient',
            element: <InfoClient />
        },
        {
            path: '/dashboard/admin/equipement',
            element: <Equipement />
        }
    ]
};

export default AdminDash;
