import { useQuery } from "react-query"
import CategoryService from "../../../services/category.service"



export const UseCategory = () => {
    const {data} = useQuery(['get category'], async () => await CategoryService.getCategory()
    )

    return (data?.data??[]).reduce((acc, category) => {
        acc[category.id] = category
        return acc;
    }, {})
} 