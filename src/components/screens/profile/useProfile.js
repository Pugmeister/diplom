import { useQuery } from "react-query"
import UserService from "../../../services/user.service"


export const UseProfile = () => {
    return useQuery(['get profile'], async ()  => await UserService.getProfile(), {
        select: ({data}) => data
    })
} 