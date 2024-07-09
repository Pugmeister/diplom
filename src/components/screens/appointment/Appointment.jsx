import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import stylesLayout from "../../layout/Layout.module.scss";
import cn from "clsx";
import Button from "../../ui/button/Button";
import { useForm, Controller } from "react-hook-form";
import { NavLink, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { $axios } from "../../../api";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import styles from './Appointment.module.scss';
import { UseProfile } from "../profile/useProfile";
import TimePicker from './TimePicker/TimePicker';
import { UseEmployee } from "./useEmployee";
import DatePicker from 'react-datepicker';
import Footer from "../../ui/footer/Footer";

const Appointment = () => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const location = useLocation();
    const { procedureData } = location.state;
    const { data: userData } = UseProfile();
    const { data: employees, isLoading, error } = UseEmployee();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [hasSlots, setHasSlots] = useState(true);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        const fetchSchedule = async (employeeId, date) => {
            try {
                const moscowDate = new Date(date.getTime() + 3 * 60 * 60 * 1000); 
                const response = await $axios.get(`/employee/${employeeId}/schedule`, {
                    params: { date: moscowDate.toISOString().split('T')[0] }
                });
                const availableSlots = response.data;
                availableSlots.forEach(slot => {
                    const startTime = new Date(slot.startTime);
                    startTime.setHours(startTime.getHours() + 3); 
                    slot.startTime = startTime;
                });
                setSchedule(availableSlots);
                setHasSlots(availableSlots.length > 0);
            } catch (error) {
                console.error("Failed to fetch schedule:", error);
                setHasSlots(false);
            }
        };

        if (selectedEmployee && selectedDate) {
            fetchSchedule(selectedEmployee.id, selectedDate);
        }
    }, [selectedEmployee, selectedDate]);

    const modalContent = (
        <div className={styles.modalContent}>
            <h2>Вы успешно записались!</h2>
            <p>Можете выбрать что-нибудь ещё🥰🥰🥰</p>
            <NavLink to="/" className={styles.closeButton}>Закрыть</NavLink>
        </div>
    );

    const onSubmit = async (formData) => {
        console.log("Received form data:", formData);

        const employeeId = parseInt(formData.employeeId);
        if (isNaN(employeeId)) {
            alert("Не выбран сотрудник!");
            return;
        }

        try {
            const dateObject = new Date(formData.date);
            const timeObject = new Date(formData.time);

            dateObject.setHours(timeObject.getHours(), timeObject.getMinutes(), 0, 0);
            dateObject.setHours(dateObject.getHours() - 3); 

            if (isNaN(dateObject.getTime())) {
                throw new Error("Invalid date or time input.");
            }

            const dataToSend = {
                userId: userData?.id,
                procedureId: procedureData.id,
                employeeId: employeeId,
                date: dateObject.toISOString(),
                paymentMethod: formData.paymentMethod
            };

            console.log("Data to send:", dataToSend);

            const response = await $axios.post('/appointment', dataToSend);
            console.log("Response:", response.data);

            await $axios.post('/schedule/book', { scheduleId: formData.scheduleId });

            openModal();
        } catch (error) {
            console.error("Failed to book appointment:", error);
            alert(`Не удалось записаться на приём. Ошибка: ${error.message}`);
        }
    };

    return (
        <>
            <div
                className={cn(stylesLayout.wrapper, stylesLayout.otherPage)}
                style={{ backgroundImage: `url('/images/profile.jpeg')`, height: 356 }}
            >
                <Layout heading="Запись на приём" />
            </div>
            {procedureData && (
                <div key={procedureData.id} className="wrapper-inner-page">
                    <h2>Выбранная услуга: {procedureData.name}</h2>
                    <p>Стоимость: {procedureData.price} ₽</p>
                    <div className={styles.appointmentFormContainer}>
                        {isLoading ? (
                            <p>Загрузка данных сотрудников...</p>
                        ) : error ? (
                            <p>Ошибка загрузки данных сотрудников: {error.message}</p>
                        ) : (
                            <form className={styles.appointmentForm} onSubmit={handleSubmit(onSubmit)}>
                                <label className={styles.label}>Выберите Мастера</label>
                                <Controller
                                    control={control}
                                    name="employeeId"
                                    rules={{ required: "Выберите Мастера" }}
                                    render={({ field }) => (
                                        <div className={styles.customSelect}>
                                            <button
                                                type="button"
                                                className={styles.selectButton}
                                                onClick={() => setIsDropdownOpen((prev) => !prev)}
                                            >
                                                {selectedEmployee ? selectedEmployee.name : "Выберите Мастера"}
                                            </button>
                                            {isDropdownOpen && (
                                                <ul className={styles.options}>
                                                    {employees.map((employee) => (
                                                        <li
                                                            key={employee.id}
                                                            onClick={() => {
                                                                field.onChange(employee.id);
                                                                setSelectedEmployee(employee);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={styles.option}
                                                        >
                                                            <img src={employee.photo} alt={employee.name} className={styles.employeePhoto} />
                                                            {employee.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                />
                                {errors.employeeId && <p className={styles.error}>{errors.employeeId.message}</p>}

                                <label className={styles.label}>Выберите Дату</label>
                                <Controller
                                    control={control}
                                    name="date"
                                    rules={{ required: "Выберите дату" }}
                                    render={({ field }) => (
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date) => {
                                                field.onChange(date);
                                                setSelectedDate(date);
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            className={styles.datePicker}
                                        />
                                    )}
                                />
                                {errors.date && <p className={styles.error}>{errors.date.message}</p>}

                                {selectedEmployee && selectedDate && (
                                    <div className={styles.scheduleContainer}>
                                        <label className={styles.label}>Выберите Время</label>
                                        <Controller
                                            control={control}
                                            name="time"
                                            rules={{ required: "Выберите время" }}
                                            render={({ field }) => (
                                                <TimePicker
                                                    selectedTime={field.value}
                                                    onTimeChange={(time, id) => {
                                                        field.onChange(time);
                                                        setValue("scheduleId", id);  
                                                    }}
                                                    schedule={schedule}
                                                    hasSlots={hasSlots}  
                                                />
                                            )}
                                        />
                                        {errors.time && <p className={styles.error}>{errors.time.message}</p>}
                                    </div>
                                )}

                                <label className={styles.label}>Выберите Способ Оплаты</label>
                                <Controller
                                    control={control}
                                    name="paymentMethod"
                                    rules={{ required: "Выберите способ оплаты" }}
                                    render={({ field }) => (
                                        <select {...field} className={styles.paymentSelect}>
                                            <option value="cash">Наличными</option>
                                            <option value="online">Онлайн</option>
                                        </select>
                                    )}
                                />
                                {errors.paymentMethod && <p className={styles.error}>{errors.paymentMethod.message}</p>}

                                <Button type="submit" className={styles.button}>Записаться</Button>
                            </form>
                        )}
                    </div>
                </div>
            )}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                    background: 'none',
                    overflow: 'visible',
                    padding: '0',
                    maxWidth: '80%',
                    maxHeight: '80%',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px'
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }
            }}>
                {modalContent}
            </Modal>
            <Footer />
        </>
    );
};

export default Appointment;