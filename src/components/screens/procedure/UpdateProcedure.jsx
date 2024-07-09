import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../ui/Loader';
import { $axios } from '../../../api';
import styles from './UpdateProcedure.module.scss';

const UpdateProcedure = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const procedureId = data.procedureData;
    console.log(procedureId);
    const [procedure, setProcedure] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
    });

    useEffect(() => {
        const fetchProcedure = async () => {
            try {
                const response = await $axios.get(`/procedures/${procedureId}`);
                setProcedure(response.data);
                setFormData({
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price,
                });
            } catch (error) {
                console.error('Failed to fetch procedure:', error);
            }
        };
        fetchProcedure();
    }, [procedureId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await $axios.put(`/procedures/${procedureId}`, { ...formData, price: Number(formData.price) });
            navigate('/procedure');
        } catch (error) {
            console.error('Failed to update procedure:', error);
        }
    };

    if (!procedure) {
        return <Loader />;
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                Название:
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} />
            </label>
            <label className={styles.label}>
                Описание:
                <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} />
            </label>
            <label className={styles.label}>
                Стоимость:
                <input type="number" name="price" value={formData.price} onChange={handleChange} className={styles.input} />
            </label>
            <button type="submit" className={styles.button}>Изменить</button>
        </form>
    );
};

export default UpdateProcedure;
