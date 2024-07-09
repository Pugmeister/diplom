import Home from '../components/screens/home/Home'
import Auth from '../components/screens/auth/auth.jsx'
import Profile from '../components/screens/profile/Profile'
import Procedure from '../components/screens/procedure/Procedure'
import Appointment from '../components/screens/appointment/Appointment.jsx'
import Contacts from '../components/screens/contacts/Contacts'
import Faq from '../components/screens/faq/Faq'
import UpdateProcedure from '../components/screens/procedure/UpdateProcedure'
import AdminDashboard from '../components/screens/profile/AdminDashboard.jsx'

export const routes = [
    {
        path: '/',
        component: Home,
        isAuth: false,
    },
    {
        path: '/auth',
        component: Auth,
        isAuth: false,
    },
    {
        path: '/profile',
        component: Profile,
        isAuth: true,
        
    },
    {
        path: '/admin',
        component: AdminDashboard,
        isAdmin:true,
        isAuth: true,
    },
    {
        path: '/procedure', 
        component: Procedure,
        isAuth: false,
    },
    {
        path: '/appointment',
        component: Appointment,
        isAuth: true,
    },
    {
        path: '/contacts',
        component: Contacts,
        isAuth: false,
    },
    {
        path: '/faq',
        component: Faq,
        isAuth: false,
    },
    {
        path: '/procedure/update',
        component: UpdateProcedure,
        isAuth: true,
        isAdmin:true,
    },
]