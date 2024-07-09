import {$axios} from '../api';

class ProcedureService {
    async getProcedures() {
            return $axios.get("/procedures");

    }
}

export default new ProcedureService();
