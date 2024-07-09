    import React from "react";
    import styles from "./Footer.module.scss";

    const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8" >
            <div className={`${styles.logo}`} >
            <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/images/spaicon.svg" className="copyright" alt="Logo" />
                <span className={styles.title} >MelNiz</span>
            </a>
            </div>
            <ul className={`${styles.links} flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0`}>
            <li>
                <a href="/procedure" className="copyright">Услуги</a>
            </li>
            <li>
                <a href="/not-found" className="copyright">Политика конфиденциальности</a>
            </li>
            <li>
                <a href="/contacts" className="copyright">Контакты</a>
            </li>
            <li>
                <a href="/faq" className="copyright">О нас</a>
            </li>
            </ul>
            <hr className={`${styles.hr}`} />
            <span className={`${styles.copyright} block text-sm text-gray-500 sm:text-center`}>© 2024 <a href="№" className="copyright">MelNiz™</a>. All Rights Reserved.</span>
        </div>
        </footer>
    );
    };

    export default Footer;
