// assets
import { DashboardOutlined, UserOutlined, ProfileOutlined, MessageOutlined, ToolOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UserOutlined,
    ToolOutlined,
    MessageOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/dashboard/admin/users',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },

        {
            id: 'material',
            title: 'Matériel',
            type: 'item',
            url: '/dashboard/admin/material',
            icon: icons.ToolOutlined,
            breadcrumbs: false
        },
        {
            id: 'visit',
            title: 'Visite',
            type: 'item',
            url: '/dashboard/admin/visit',
            icon: icons.ProfileOutlined,
            breadcrumbs: false
        },
        {
            id: 'info',
            title: 'Info client',
            type: 'item',
            url: '/dashboard/admin/infoClient',
            icon: icons.MessageOutlined,
            breadcrumbs: false
        },
        {
            id: 'equipement',
            title: 'Equipement',
            type: 'item',
            url: '/dashboard/admin/equipement',
            icon: icons.ToolOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
