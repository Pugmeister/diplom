import { useQuery } from "react-query";
import EmployeeService from "../../../services/employee.service"; 

export const UseEmployee = () => {
    return useQuery(['getEmployee'], async () => {
        const response = await EmployeeService.getEmployees();
        return response.data;
    }, {
        select: (data) => data,
        staleTime: 60000, 
    });
};
