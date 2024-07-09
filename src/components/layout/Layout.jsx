import Header from '/src/components/layout/header/Header';
import cn from 'clsx';
import styles from './Layout.module.scss';
import { useCheckToken } from '../../hooks/useCheckToken';
import Navbar from '/src/components/layout/navbar/Navbar';

const Layout = ({children, bgImage, heading = '', backLink = '/'}) => {
    useCheckToken()
return (
    <>

    <section
    className={cn(styles.wrapper, {
        [styles.otherPage]: !!heading
    })}
    style = {{ backgroundImage: `url(${bgImage})` }} 
    >
        <Header backLink = {backLink}/>
        {heading && <h1 className={styles.heading}>{heading}</h1>}
        {children && <div>{children}</div>}
    </section>
    </>
    )
}

export default Layout 