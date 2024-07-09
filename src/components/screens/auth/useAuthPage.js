import { useEffect, useState, useMemo } from "react";
import { useMutation } from 'react-query';
import AuthService from "../../../services/auth.service";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const useAuthPage = () => {
    const [type, setType] = useState('register');

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange'
    });

    const { isAuth, setIsAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);

    const { mutate, isLoading } = useMutation((data) => {
        return type === 'register'
            ? AuthService.register(data.name, data.email, data.password, data.phone)
            : AuthService.login(data.email, data.password);
    }, {
        onSuccess: () => {
            setIsAuth(true);
            reset();
        }
    });

    const onSubmit = data => {
        mutate(data);
    };

    return useMemo(() => ({
        setType,
        register,
        handleSubmit,
        errors,
        onSubmit,
        isLoading,
    }), [errors, isLoading]);
};
