import styles from './Hamburger.module.scss';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Cookies from 'js-cookie';
import { TOKEN } from '../../../app.constants';
import menu from './menu.data';

const Menu = ({ isShow, setIsShow }) => {
    const { setIsAuth } = useAuth();

    const logoutHandler = () => {
        Cookies.remove(TOKEN);
        setIsAuth(false);
        setIsShow(false);
    }
    const menuItems = menu();

    return (
        <nav className={cn(styles.menu, {
            [styles.show]: isShow
        })}>
            <ul>  
                {menuItems.map((item, index) => (
                    <li key={`_menu_${index}`}>
                        <Link to={item.link}>{item.title}</Link>
                    </li>
                ))}
                <li>
                    <button onClick={logoutHandler}>Выйти</button>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
