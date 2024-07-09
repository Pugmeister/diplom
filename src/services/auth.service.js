import Cookies from "js-cookie";
import { $axios } from "../api";
import { TOKEN } from "../app.constants";

class AuthService {
    async register(name, email, password, phone) {
        try {
            const { data } = await $axios.post(`/register`, {
                name,
                email,
                password,
                phone,
            });
            if (data.token) Cookies.set(TOKEN, data.token);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(email, password) {
        try {
            const { data } = await $axios.post(`/login`, {
                email,
                password,
            });
            if (data.token) Cookies.set(TOKEN, data.token);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new AuthService();
