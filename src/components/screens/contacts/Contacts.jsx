import Layout from "../../layout/Layout";
import Footer from "../../ui/footer/Footer";
import styles from "./Contacts.module.scss"; 

const Contacts = () => {
    return (
        <> 
            <Layout heading="Контакты" bgImage='/images/faq.jpeg'></Layout>
            <div className={`${styles.contactsContainer} ${styles.marginTop}`}>
                <h2 className={styles.sectionHeading}>Связаться с нами</h2>
                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <i className={`fas fa-map-marker-alt ${styles.icon}`}></i>
                        <p>Адрес: 123456, Город Москва, Улица Мельникова, Дом Низамиди</p>
                    </div>
                    <div className={styles.contactItem}>
                        <i className={`fas fa-phone-alt ${styles.icon}`}></i>
                        <p>Телефон: +7 (123) 456-78-90</p>
                    </div>
                    <div className={styles.contactItem}>
                        <i className={`fas fa-envelope ${styles.icon}`}></i>
                        <p>Email: melnikov@nizamidi.com</p>
                    </div>
                </div>
                <p className={styles.additionalInfo}>Если у вас есть какие-либо вопросы или предложения, не стесняйтесь связаться с нами!</p>
                <div className={styles.imageLinks}>
                    <a href="https://vk.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/вк.png" alt="VKontakte" className={styles.image} />
                    </a>

                    <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/telega.png" alt="Telegram" className={styles.image} />
                    </a>
                </div>
            </div>
            <div className={styles.separator}></div>
            <div className={`${styles.contactsContainer} ${styles.marginTop}`}>
                <h2 className={styles.sectionHeading}>Мы находимся тут!</h2>
                    <p className={styles.additionalInfo}>Приходите будем рады вас видеть</p>
            <div className={styles.mapContainer}>
            <iframe
                className={styles.map}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2945.6009308272543!2d38.97809051576747!3d45.03908428500921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f04555b4f3b1b1%3A0x1fb878363f8cb960!2sUlitsa%20Krasnaya%2C%20135%2C%20Krasnodar%2C%20Krasnodar%20Krai%2C%20350020!5e0!3m2!1sen!2sru!4v1622471472843!5m2!1sen!2sru"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="map"
            ></iframe>
                </div>
            </div>
            <div className={styles.separator}></div>
            <Footer/>
        </>
        
    );
};

export default Contacts;
