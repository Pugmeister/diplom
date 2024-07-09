import { $axios } from '../api';

class EmployeeService {
    async getEmployees() {
        return $axios.get("/employee");
    }
}

export default new EmployeeService();
