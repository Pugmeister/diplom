import React, { useState } from 'react';
import { UseProfile } from "./useProfile";
import styles from './Profile.module.scss';
import stylesLayout from '../../layout/Layout.module.scss';
import cn from 'clsx';
import Header from '../../layout/header/Header';
import Loader from '../../ui/Loader';
import Navbar from '../../layout/navbar/Navbar';
import Footer from "../../ui/footer/Footer";
import Cookies from 'js-cookie';
import { TOKEN } from '../../../app.constants';
import { $axios } from '../../../api';
import StarRatingComponent from 'react-star-rating-component';
import { useAuth } from '../../../hooks/useAuth';

const Profile = () => {
    const { data, isLoading } = UseProfile();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState({});
    const { setIsAuth } = useAuth();

    const logoutHandler = () => {
        Cookies.remove(TOKEN);
        setIsAuth(false);
        setIsShow(false);
    }

    const toggleReviewForm = (id) => {
        setShowReviewForm(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const sortAppointmentsByDate = (appointments) => {
        return appointments.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    const calculateTotalSum = (appointments) => {
        return appointments.reduce((total, appointment) => total + appointment.procedure.price, 0);
    }

    const getLoyaltyDiscount = (totalSum) => {
        if (totalSum >= 200000) {
            return 20;
        } else if (totalSum >= 100000) {
            return 15;
        } else if (totalSum >= 50000) {
            return 10;
        } else {
            return 0;
        }
    }

    const handleReviewSubmit = async (appointmentId) => {
        try {
            const response = await $axios.post(`/review`, { 
                userId: data?.id, 
                procedureId: appointmentId, 
                rating, 
                comment: review 
            });
            setReview('');
            setRating(0);
            alert('Ваш отзыв успешно добавлен!');
        } catch (error) {
            console.error('Вы уже оставили отзыв, большое спасибо', error);
            alert('Вы уже оставили отзыв, большое спасибо');
        }
    }

    const totalSum = data ? calculateTotalSum(data.appointments) : 0;
    const discount = getLoyaltyDiscount(totalSum);

    return (
        <>
            <div
                className={cn(stylesLayout.wrapper, stylesLayout.otherPage, styles.backgroundImageContainer)}
                style={{ backgroundImage: `url('/images/profile.jpeg')`, height: "35%" }}>
                <Navbar />
                <Header />
                <div className={styles.center}>
                    {isLoading ? <Loader /> :
                        <>
                            <img src='images/user1.svg' alt='Profile' height='56' draggable={false} />
                            <h1 className={stylesLayout.heading}>{data?.name}</h1>
                            <div className={styles.totalSumContainer}>
                                <h2 className={styles.totalSum}>Общая сумма заказов: {totalSum} ₽</h2>
                                {discount > 0 && (
                                    <h2 className={styles.discount}>
                                        Ваша скидка: {discount}%
                                    </h2>
                                )}
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className={styles.centerHeading}>
                <div className={styles.heading}>Записи</div>
            </div>
            <div className={styles.appointmentsContainer}>
                {isLoading ? <Loader /> :
                    data?.appointments.length > 0 ? (
                        <div className={styles.appointmentsGrid}>
                            {sortAppointmentsByDate(data.appointments).map(appointment => (
                                <div key={appointment.id} className={styles.appointmentCard}>
                                    <div className={styles.appointmentDetail}>
                                        <span className={styles.label}>Услуга:</span>
                                        <span>{appointment.procedure.name}</span>
                                    </div>
                                    <div className={styles.appointmentDetail}>
                                        <span className={styles.label}>Стоимость:</span>
                                        <span>{appointment.procedure.price} ₽</span>
                                    </div>
                                    <div className={styles.appointmentDetail}>
                                        <span className={styles.label}>Дата приёма:</span>
                                        <span>{new Date(new Date(appointment.date).getTime() + 3 * 60 * 60 * 1000).toLocaleString()}</span>
                                    </div>
                                    <div className={styles.appointmentDetail}>
                                        <span className={styles.label}>Мастер:</span>
                                        <span>{appointment.employee.name}</span>
                                    </div>
                                    {new Date(appointment.date) < new Date() && (
                                        <>
                                            <div className={styles.statusDone}>Выполнено</div>
                                            <div className={styles.reviewToggle} onClick={() => toggleReviewForm(appointment.id)}>
                                                Оставить отзыв
                                            </div>
                                            {showReviewForm[appointment.id] && (
                                                <div className={styles.reviewForm}>
                                                    <textarea
                                                        value={review}
                                                        onChange={(e) => setReview(e.target.value)}
                                                        placeholder="Ваш отзыв"
                                                    />
                                                    <div className={styles.ratingContainer}>
                                                        <StarRatingComponent 
                                                            name="rate1" 
                                                            starCount={5}
                                                            value={rating}
                                                            onStarClick={(nextValue) => setRating(nextValue)}
                                                        />
                                                    </div>
                                                    <div className={styles.buttonContainer}>
                                                        <button onClick={() => handleReviewSubmit(appointment.procedureId)}>Отправить</button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.heading}>Нет записей</p>
                    )
                }
            </div>
            <p>
                <button className={styles.exit} onClick={logoutHandler}>Выйти</button>
            </p>
            <Footer />
        </>
    );
};

export default Profile;
