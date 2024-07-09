import Layout from '../../layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import style from './Home.module.scss';
import Footer from '../../ui/footer/Footer';
import Carousel from '../../ui/carousel/Carousel';

function Home() {
    const { isAuth } = useAuth(true);
    const navigate = useNavigate();         

    const handleButtonClick = () => {
        navigate(isAuth ? '/procedure' : '/auth');
    };

    return (
        <>
            <Layout bgImage='/images/home.webp'>
                <div className={style.container}>
                    <h1 className={style.text}>
                        РАДЫ ПРИВЕТСТВОВАТЬ {' '}
                        <p>В НАШЕМ</p>
                        <p style={{ color: '#3CB371' }}>СПА-САЛОНЕ</p>
                        <button className={style.button} onClick={handleButtonClick}>
                            {isAuth ? 'Записаться' : 'Войти'}
                        </button>
                    </h1>
                </div>
            </Layout>
            <div className={style.container}>
                <section className={style.additionalSection}>
                <Carousel/>
                </section>
                <section className={style.additionalSection}>
                    <h2 className={style.sectionHeading}>О нас</h2>
                    <p>Мы открылись с целью предложить нашим клиентам высококачественные услуги в уютной и спокойной атмосфере. Наша команда состоит из опытных специалистов, готовых удовлетворить все ваши потребности.</p>
                </section>
                <section className={style.additionalSection}>
                    <h2 className={style.sectionHeading}>Контакты</h2>
                    <p>Вы всегда можете связаться с нами по телефону +7 (123) 456-78-90 или по электронной почте melnikov@nizamidi.com. Мы находимся по Адресу: 123456, Город Москва, Улица Мельникова, Дом Низамиди. Мы рады видеть вас!</p>
                </section>
            </div>
            <div className={style.separator}></div>
            <Footer/>
        </>
    );
}

export default Home;
