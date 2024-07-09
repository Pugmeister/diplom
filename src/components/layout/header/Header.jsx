import styles from './Header.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import Hamburger from '../hamburger/Hamburger';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const Header = ({backLink = '/'}) => {

const {pathname} = useLocation()

const navigate = useNavigate()

const {isAuth} = useAuth()

    return ( 
        <>
        <Navbar/>
    <header className={styles.header}>
        <button onClick={()=>{navigate('/')}} className={styles.profileButton}>
            <img src="/images/spaicon.svg" alt="Spa Icon" className={styles.icon} style={{width: '50px', height: '50px'}}/>
            <h1 className={styles.logo}>
                SPA-SALON <br/> MelNiz
            </h1>
        </button>
        <Hamburger/>
    </header>
    </>
    )
}

export default Header
