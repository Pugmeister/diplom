import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { animateScroll as scroll } from 'react-scroll';
import { UseProfile } from '../../screens/profile/useProfile';

function Navbar() {
    const { isAuth } = useAuth();
    const location = useLocation();
    const { data: user } = UseProfile();

    useEffect(() => {
        scroll.scrollToTop();
    }, [location]);

    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const [bgColor, setBgColor] = useState('light');

    const getBackgroundColor = (element) => {
        return window.getComputedStyle(element, null).getPropertyValue('background-color');
    };

    const isLightColor = (color) => {
        const rgb = color.match(/\d+/g);
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155;  
    };

    const updateNavbarColor = () => {
        const bgColor = getBackgroundColor(document.body);
        setBgColor(isLightColor(bgColor) ? 'dark' : 'light');
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
            setPrevScrollPos(currentScrollPos);
            setVisible(isVisible);
            updateNavbarColor();
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateNavbarColor);

        updateNavbarColor();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateNavbarColor);
        };
    }, [prevScrollPos]);

    return (
        <nav className={`${styles.navbar} ${visible ? '' : styles.hidden} ${styles[bgColor]}`}>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem}>
                </li>
                <>
                    <li className={styles.navbarItem}>
                        <Link to="/">Главная</Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link to="/procedure">Услуги</Link>
                    </li>
                    <li className={styles.navbarItem}>
                        {isAuth ? (
                            <Link to={user?.isAdmin ? '/admin' : '/profile'}>Профиль</Link>
                        ) : (
                            <Link to="/auth">Регистрация</Link>
                        )}
                    </li>
                    <li className={styles.navbarItem}>
                        <Link to="/contacts">Контакты</Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link to="/faq">Вопросы и ответы</Link>
                    </li>
                </>
            </ul>
        </nav>
    );
}

export default Navbar;