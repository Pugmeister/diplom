import { $axios } from "../api"

class UserService {
    async getProfile(){
            return $axios.get(`/profile`)
    }
}

export default new UserService()