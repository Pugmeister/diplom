import React, { useState } from 'react';
import Button from "../../ui/button/Button";
import Layout from "../../layout/Layout";
import Field from "../../ui/field/Field";
import Loader from "../../ui/Loader";
import styles from './Auth.module.scss';
import { useAuthPage } from "./useAuthPage";

const Auth = () => {
    const { errors, handleSubmit, isLoading, onSubmit, register, setType } = useAuthPage();
    const [authType, setAuthType] = useState('login');
    const [registrationError] = useState('');

    const handleTypeChange = (type) => {
        setAuthType(type);
        setType(type);
    };

    return (
        <>
            <Layout heading={authType === 'login' ? 'Вход' : 'Регистрация'} bgImage='/images/массаж.png' />
            <div className='wrapper-inner-page'>
                {isLoading && <Loader />}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {authType === 'register' && (
                        <>
                            <Field
                                error={errors?.name?.message}
                                name='name'
                                register={register}
                                options={{ required: 'Необходимо имя' }}
                                type="text"
                                placeholder="Введите имя"
                            />
                            <Field
                                error={errors?.phone?.message}
                                name='phone'
                                register={register}
                                options={{ required: 'Необходим номер телефона' }}
                                type="text"
                                placeholder="Введите номер телефона"
                            />
                        </>
                    )}
                    <Field
                        error={errors?.email?.message}
                        name='email'
                        register={register}
                        options={{ required: 'Необходима почта' }}
                        type="text"
                        placeholder="Введите почту"
                    />
                    <Field
                        error={errors?.password?.message}
                        name='password'
                        register={register}
                        options={{ required: 'Необходим пароль' }}
                        type="password"
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                    />
                    {registrationError && <p className={`${styles.registrationError} ${styles.error}`}>{registrationError}</p>}
                    <div className={styles.wrapperButtons}>
                        <Button clickHandler={() => handleTypeChange('login')}>Вход</Button>
                        <Button clickHandler={() => handleTypeChange('register')}>Регистрация</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Auth;
