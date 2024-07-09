import React from 'react';
import styles from './TimePicker.module.scss';

const TimePicker = ({ selectedTime, onTimeChange, schedule, hasSlots }) => {
    const groupedSlots = {
        'Утро': [],
        'День': [],
        'Вечер': []
    };

    schedule.forEach(slot => {
        const startTime = new Date(slot.startTime);
        startTime.setHours(startTime.getHours() - 3); 
        const hour = startTime.getHours();
        const period = hour < 9 ? 'Утро' : (hour < 15 ? 'День' : 'Вечер');
        groupedSlots[period].push(slot);
    });

    ['Утро', 'День', 'Вечер'].forEach(period => {
        groupedSlots[period].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    });

    return (
        <div className={styles.timePicker}>
            {hasSlots ? (
                <>
                    {['Утро', 'День', 'Вечер'].map((period) => (
                        <div key={period} className={styles.timeSlotGroup}>
                            <h3>{period}</h3>
                            <div className={styles.timeSlots}>
                                {groupedSlots[period].length > 0 ? (
                                    groupedSlots[period].map((slot) => (
                                        <button
                                            key={slot.id}
                                            className={`${styles.timeOption} ${selectedTime === slot.startTime ? styles.selected : ''}`}
                                            onClick={() => onTimeChange(slot.startTime, slot.id)}
                                            disabled={slot.isBooked}
                                        >
                                            {new Date(slot.startTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                        </button>
                                    ))
                                ) : (
                                    <p className={styles.noSlots}>Свободного времени нет</p>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p className={styles.noSlots}>Нет времени</p>
            )}
        </div>
    );
};

export default TimePicker;
