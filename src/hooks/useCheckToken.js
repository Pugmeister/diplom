import { useLocation } from "react-router-dom"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { TOKEN } from "../app.constants"
import { useAuth } from "./useAuth"


export const useCheckToken = () => {
const {setIsAuth, isAuth} = useAuth()

    const {pathname} = useLocation()

    useEffect(() =>{
        const token = Cookies.get(TOKEN)
        if(!token) setIsAuth(false)
    }, [pathname, isAuth])
}