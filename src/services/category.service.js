import {$axios} from '../api';

class CategoryService {
    async getCategory() {
            return $axios.get("/category");
    }
}

export default new CategoryService();
