import Cookies from 'js-cookie'
import axios from 'axios'
import { TOKEN } from './app.constants'


const API_URL = 'http://127.0.0.1:5173'

export const $axios = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type' : 'application/json',
        Authorization:  Cookies.get(TOKEN) ? `Bearer ${Cookies.get(TOKEN) }` : ''
    }
})



