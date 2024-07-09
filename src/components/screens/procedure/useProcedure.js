import { useQuery } from "react-query"
import ProcedureService from '../../../services/procedure.service'
import categoryService from "../../../services/category.service"


export const UseProcedure = () => {
    return useQuery(['get procedures'], () => ProcedureService.getProcedures(), {
        select: ({data}) => data
    })
} 