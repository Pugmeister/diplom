import React from 'react';
import styles from './EmployeeSchedule.module.scss';

const EmployeeSchedule = ({ schedule, onEditSlot, onRemoveSlot, onSlotChange, onAddSlot, onSaveSchedule, editingSlotIndex }) => {
    const half = Math.ceil(schedule.length / 2);
    const leftColumn = schedule.slice(0, half);
    const rightColumn = schedule.slice(half);

    const formatDateTimeLocal = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const timezoneOffset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
        return localISOTime;
    };

    return (
        <div className={styles.scheduleEditor}>
            <h4>Редактировать расписание</h4>
            <div className={styles.scheduleGrid}>
                <div className={styles.column}>
                    {leftColumn.map((slot, index) => (
                        <div 
                            key={index} 
                            className={editingSlotIndex === index ? `${styles.slot} ${styles.slotActions}` : styles.slot}
                            onClick={() => onEditSlot(index)}
                        >
                            {editingSlotIndex === index ? (
                                <>
                                    <input 
                                        type="datetime-local" 
                                        value={formatDateTimeLocal(slot.startTime)} 
                                        onChange={(e) => onSlotChange(index, 'startTime', e.target.value)} 
                                    />
                                    <button onClick={() => onRemoveSlot(index)}>Удалить</button>
                                </>
                            ) : (
                                <span>{new Date(slot.startTime).toLocaleString()}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.column}>
                    {rightColumn.map((slot, index) => (
                        <div 
                            key={index + leftColumn.length} 
                            className={editingSlotIndex === (index + leftColumn.length) ? `${styles.slot} ${styles.slotActions}` : styles.slot}
                            onClick={() => onEditSlot(index + leftColumn.length)}
                        >
                            {editingSlotIndex === (index + leftColumn.length) ? (
                                <>
                                    <input 
                                        type="datetime-local" 
                                        value={formatDateTimeLocal(slot.startTime)} 
                                        onChange={(e) => onSlotChange(index + leftColumn.length, 'startTime', e.target.value)} 
                                    />
                                    <button onClick={() => onRemoveSlot(index + leftColumn.length)}>Удалить</button>
                                </>
                            ) : (
                                <span>{new Date(slot.startTime).toLocaleString()}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={onAddSlot} className={styles.addSlotButton}>Добавить расписание</button>
                <button onClick={onSaveSchedule} className={styles.saveScheduleButton}>Сохранить расписание</button>
            </div>
        </div>
    );
};

export default EmployeeSchedule;
