import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layout/Layout';
import styles from './Procedure.module.scss';
import { UseProcedure } from './useProcedure.js';
import { UseCategory } from './useCategory.js';
import { UseProfile } from '../profile/useProfile.js';
import Footer from '../../ui/footer/Footer.jsx';

const Procedure = () => {
    const [procedures, setProcedures] = useState([]);
    const { data } = UseProcedure();
    const category = UseCategory();
    const { data: userData } = UseProfile();
    const [openProcedureIds, setOpenProcedureIds] = useState([]);

    useEffect(() => {
        if (data) {
            setProcedures(data);
        }
    }, [data]);

    const handleOverlayClick = (id) => {
        setOpenProcedureIds(prevState =>
            prevState.includes(id) ? prevState.filter(procedureId => procedureId !== id) : [...prevState, id]
        );
    };

    const handleMouseEnter = (id) => {
        if (!openProcedureIds.includes(id)) {
            setOpenProcedureIds(prevState => [...prevState, id]);
        }
    };

    const handleMouseLeave = (id) => {
        if (!openProcedureIds.includes(id)) {
            setOpenProcedureIds(prevState => prevState.filter(procedureId => procedureId !== id));
        }
    };

    return (
        <>
            <Layout heading="Услуги" bgImage='/images/procedure.jpeg' />
            <div className={styles.procedureContainer}>
                {procedures.map((data) => (
                    <div key={data.id} className={styles.serviceItem}>
                        <img
                            src={data.image}
                            alt={data.name}
                            className={styles.bgImage}
                        />
                        <div
                            className={`${styles.overlay} ${openProcedureIds.includes(data.id) ? styles.open : ''}`}
                            onClick={() => handleOverlayClick(data.id)}
                        >
                            {openProcedureIds.includes(data.id) ? (
                                <>
                                    <p className={styles.name}>{data.name}</p>
                                    <p className={styles.description}>{data.description}</p>
                                    <p>{data.price} ₽</p>
                                    <Link to="/appointment" state={{ procedureData: data }} className={styles.button}>
                                        Выбрать
                                    </Link>
                                    {userData.isAdmin && (
                                        <Link to='/procedure/update' state={{ procedureData: data.id }} className={styles.button_update}>Изменить</Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h2 className={styles.categoryId}>{category[data.categoryId]?.name}</h2>
                                    <h3 className={styles.description}>{category[data.categoryId]?.description}</h3>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Procedure;
