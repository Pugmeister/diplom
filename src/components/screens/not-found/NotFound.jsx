import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import Layout from "../../layout/Layout"
import { useEffect } from "react"

const NotFound = () => {

    const {isAuth} = useAuth()
    const navigate = useNavigate()

    useEffect(() =>{
        if(!isAuth) {
            navigate('/auth')
        }
    }, [])

    return (
    <>
    <Layout heading="Страница не найдена"/>
    <div className='wrapper-inner-page'>404 Страница не найдена</div>
    </>
    )
}

export default NotFound