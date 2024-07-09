import { useAuth } from "../../../hooks/useAuth";
import { UseProfile } from "../../screens/profile/useProfile";

const menu = () => {
    const { isAuth } = useAuth();
    const { data: user } = UseProfile();
    
    const menuItems = [
        isAuth && user && {
            title: 'Профиль',
            link: user.isAdmin ? '/admin' : '/profile',
        },
        !isAuth && {
            title: 'Регистрация',
            link: '/auth',
        },
        {
            title: 'Услуги', 
            link: '/procedure',
        },
        {
            title: 'Контакты', 
            link: '/contacts',
        },
        {
            title: 'Вопросы и ответы', 
            link: '/faq',
        }
    ]

    return menuItems.filter(Boolean);
}

export default menu;
