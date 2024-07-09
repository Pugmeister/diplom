import React, { useEffect, useState } from 'react';
import { $axios } from '../../../api';
import styles from './AdminDashboard.module.scss';
import Navbar from '../../layout/navbar/Navbar';
import Header from '../../layout/header/Header';
import cn from 'clsx';
import stylesLayout from '../../layout/Layout.module.scss';
import Loader from '../../ui/Loader';
import { UseProfile } from '../../screens/profile/useProfile';
import Footer from "../../ui/footer/Footer";
import EmployeeSchedule from './EmployeeSchedule';
import { TOKEN } from '../../../app.constants';
import Cookies from 'js-cookie';
import { useAuth } from '../../../hooks/useAuth';

const AdminDashboard = () => {
    const { data, isLoading } = UseProfile();
    const [appointments, setAppointments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [view, setView] = useState('appointments');
    const [editingSlotIndex, setEditingSlotIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const { setIsAuth } = useAuth();

    const logoutHandler = () => {
        Cookies.remove(TOKEN);
        setIsAuth(false);
        setIsShow(false);
    }

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await $axios.get('/appointment');
                setAppointments(response.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
            } catch (error) {
                console.error("Не удалось загрузить записи:", error);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await $axios.get('/employee');
                setEmployees(response.data);
            } catch (error) {
                console.error("Не удалось загрузить сотрудников:", error);
            }
        };

        fetchAppointments();
        fetchEmployees();
    }, []);

    const handleScheduleChange = async (employeeId) => {
        try {
            const response = await $axios.get(`/employee/${employeeId}/all-schedules`);
            setSchedule(response.data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)));
            setSelectedEmployee(employeeId);
        } catch (error) {
            console.error("Не удалось загрузить расписание сотрудника:", error.response ? error.response.data : error.message);
        }
    };

    const handleSaveSchedule = async () => {
        if (!schedule || schedule.length === 0) {
            alert('Нет данных для обновления');
            return;
        }

        try {
            const updatedSchedule = schedule.map(slot => ({
                id: slot.id,
                startTime: new Date(slot.startTime).toISOString(),
                isBooked: slot.isBooked || false
            }));

            console.log("Отправка данных на сервер:", updatedSchedule);

            await $axios.put(`/schedule/${selectedEmployee}`, updatedSchedule, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            alert('Расписание успешно обновлено');
            setEditingSlotIndex(null);
        } catch (error) {
            console.error('Ошибка при обновлении расписания:', error);
            alert('Ошибка при обновлении расписания');
        }
    };

    const handleAddSlot = async () => {
        try {
            const newSlot = { employeeId: selectedEmployee, startTime: new Date().toISOString(), isBooked: false };
            const response = await $axios.post(`/schedule`, newSlot);
            setSchedule([...schedule, response.data]);
        } catch (error) {
            console.error('Ошибка при добавлении слота расписания:', error);
            alert('Ошибка при добавлении слота расписания');
        }
    };

    const handleSlotChange = (index, field, value) => {
        const updatedSchedule = schedule.map((slot, idx) => 
            idx === index ? { ...slot, [field]: value } : slot
        ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        setSchedule(updatedSchedule);
    };

    const handleRemoveSlot = async (index) => {
        const slot = schedule[index];
        if (slot.id) {
            try {
                await $axios.delete(`/schedule/${slot.id}`);
                setSchedule(schedule.filter((_, idx) => idx !== index));
            } catch (error) {
                console.error('Ошибка при удалении слота расписания:', error);
                alert('Ошибка при удалении слота расписания');
            }
        } else {
            setSchedule(schedule.filter((_, idx) => idx !== index));
        }
    };

    const handleEditSlot = (index) => {
        setEditingSlotIndex(index);
    };

    const handleSelectEmployee = (employee) => {
        setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id);
        if (selectedEmployee !== employee.id) {
            handleScheduleChange(employee.id);
        }
    };

    const handleGenerateWeeklySchedule = async () => {
        try {
            const scheduleTemplate = [
                { startTime: '06:00'},
                { startTime: '9:00'},
                { startTime: '12:00'},
                { startTime: '15:00'}
            ];

            const today = new Date();
            const startDay = new Date(today);
            startDay.setDate(today.getDate() + 1); 

            for (const employee of employees) {
                for (let day = 0; day < 7; day++) {
                    const currentDay = new Date(startDay);
                    currentDay.setDate(startDay.getDate() + day);

                    for (const slot of scheduleTemplate) {
                        const [hours, minutes] = slot.startTime.split(':');
                        const slotTime = new Date(currentDay);
                        slotTime.setHours(hours, minutes, 0, 0);

                        await $axios.post('/schedule', {
                            employeeId: employee.id,
                            startTime: slotTime.toISOString(),
                            isBooked: false
                        });
                    }
                }
            }

            alert('Расписание на неделю успешно создано для всех сотрудников');
        } catch (error) {
            console.error('Ошибка при создании расписания на неделю:', error);
            alert('Ошибка при создании расписания на неделю');
        }
    };

    const handleDeleteDaySchedule = async () => {
        if (!selectedEmployee || !selectedDate) {
            alert('Выберите сотрудника и дату для удаления расписания');
            return;
        }
    
        try {
            await $axios.delete(`/schedule/day/${selectedEmployee}`, {
                params: { date: selectedDate }
            });
    
            alert('Расписание за день успешно удалено');
            handleScheduleChange(selectedEmployee); 
        } catch (error) {
            console.error('Ошибка при удалении расписания за день:', error);
            alert('Ошибка при удалении расписания за день');
        }
    };    
    
    return (
        <>
            <div
                className={cn(stylesLayout.wrapper, stylesLayout.otherPage, styles.backgroundImageContainer)}
                style={{ backgroundImage: `url('/images/profile.jpeg')`, height: "35%" }}
            >
                <Navbar />
                <Header />
                <div className={styles.center}>
                    {isLoading ? <Loader /> :
                        <>
                            <img src='/images/user1.svg' alt='Profile' height='56' draggable={false} />
                            <h1 className={stylesLayout.heading}>{data?.name}</h1>
                        </>
                    }
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button 
                    className={cn(styles.toggleButton, { [styles.active]: view === 'appointments' })}
                    onClick={() => setView('appointments')}
                >
                    Записи клиентов
                </button>
                <button 
                    className={cn(styles.toggleButton, { [styles.active]: view === 'employees' })}
                    onClick={() => setView('employees')}
                >
                    График сотрудников
                </button>
            </div>
            {view === 'appointments' && (
                <>
                    <div className={styles.appointmentsContainer}>
                        <div className={styles.appointmentsList}>
                            {appointments.length > 0 ? (
                                appointments.map(appt => (
                                    <div key={appt.id} className={styles.appointmentCard}>
                                        <div className={styles.appointmentDetail}>
                                            <span className={styles.label}>Клиент:</span>
                                            <span>{appt.user?.name || 'Неизвестно'}</span>
                                        </div>
                                        <div className={styles.appointmentDetail}>
                                            <span className={styles.label}>Номер:</span>
                                            <span>{appt.user?.phone || 'Неизвестно'}</span>
                                        </div>
                                        <div className={styles.appointmentDetail}>
                                            <span className={styles.label}>Услуга:</span>
                                            <span>{appt.procedure?.name || 'Неизвестно'}</span>
                                        </div>
                                        <div className={styles.appointmentDetail}>
                                            <span className={styles.label}>Дата:</span>
                                            <span>{new Date(appt.date).toLocaleString()}</span>
                                        </div>
                                        <div className={styles.appointmentDetail}>
                                            <span className={styles.label}>Мастер:</span>
                                            <span>{appt.employee?.name || 'Неизвестно'}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Нет записей</p>
                            )}
                        </div>
                    </div>
                </>
            )}
            {view === 'employees' && (
                <>
                    <div className={styles.employeesContainer}>
                        
                        <div className={styles.employeesList}>
                            
                            {employees.length > 0 ? (
                                employees.map(emp => (
                                    
                                    <div key={emp.id} className={styles.employeeCard}>
                                        
                                        <h3 onClick={() => handleSelectEmployee(emp)}>{emp.name}</h3>
                                        
                                        {selectedEmployee === emp.id && (
                                            <>
                                                <EmployeeSchedule 
                                                    schedule={schedule}
                                                    onEditSlot={handleEditSlot}
                                                    onRemoveSlot={handleRemoveSlot}
                                                    onSlotChange={handleSlotChange}
                                                    onAddSlot={handleAddSlot}
                                                    onSaveSchedule={handleSaveSchedule}
                                                    editingSlotIndex={editingSlotIndex}
                                                />
                                                <div>
                                                    <div className={styles.inputContainer}>
                                                        <input 
                                                            type="date" 
                                                            value={selectedDate} 
                                                            onChange={(e) => setSelectedDate(e.target.value)} 
                                                        />
                                                        <button 
                                                            className={styles.deleteDayButton}
                                                            onClick={handleDeleteDaySchedule}
                                                        >
                                                            Удалить расписание за день
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                ))
                            ) : (
                                <p>Нет сотрудников</p>
                            )}
                                <button 
                                    className={styles.showslots}
                                        onClick={handleGenerateWeeklySchedule}
                                >
                                    Добавить расписание на неделю для всех сотрудников
                                </button>
                        </div>
                    </div>
                </>
            )}
            <p>
                <button className={styles.exit} onClick={logoutHandler}>Выйти</button>
            </p>
            <Footer />
        </>
    );
};

export default AdminDashboard;
