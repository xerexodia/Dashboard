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

const dashboardClient = {
    id: 'group-dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'Profile',
            type: 'item',
            url: '/dashboard/user/profile',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },

        {
            id: 'material',
            title: 'Equipement',
            type: 'item',
            url: '/dashboard/user/equipement',
            icon: icons.ToolOutlined,
            breadcrumbs: false
        },
        {
            id: 'visit',
            title: 'Bon de commande',
            type: 'item',
            url: '/dashboard/user/bon',
            icon: icons.ProfileOutlined,
            breadcrumbs: false
        },
        {
            id: 'info',
            title: 'Contact admin',
            type: 'item',
            url: '/dashboard/user/contact',
            icon: icons.MessageOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboardClient;
