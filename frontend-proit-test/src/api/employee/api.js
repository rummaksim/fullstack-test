import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});

export const EmployeeApi = {

    getEmployeesTree(){
        return instance.get(`employees/tree`);
    },

    getEmployeesWithParams(companyNameLike, employeeNameLike, page, pageSize) {
        return instance.get(`employees?pageSize=${pageSize}&page=${page}&companyNameLike=${companyNameLike}&employeeNameLike=${employeeNameLike}`);
    },

    deleteEmployee(id){
        return instance.delete(`employees?id=${id}`);
    },

    getAvailableHeadEmployees(companyId, employeeId) {
        return instance.get(`employees/available-head-employees?companyId=${companyId}&employeeId=${employeeId}`);
    },

    createEmployee(name, company, headEmployee){
        return instance.post(`employees/create-employee`, {name,company,headEmployee})
    },
    getEmployeeById(id){
        return instance.get(`employees/employee?id=${id}`);
    },
    updateEmployee(id, name, company, headEmployee){
        return instance.put(`employees/update-employee`, {id, name, company, headEmployee})
    }


   /*
    getAllCompanies() {
        return instance.get(`companies/all`);
    },
    createCompany(name, headCompany) {
        return instance.post(`companies/create-company`, {name, headCompany});
    },
    getCompany(id) {
        return instance.get(`companies/company?id=${id}`);
    },
    getAvailableHeadCompanies(id) {
        return instance.get(`companies/available-head-companies?id=${id}`);
    },

    updateCompany(id, name, headCompany) {
        return instance.put(`companies/update-company`, {id, name, headCompany});
    },

    getCompaniesTree(){
        return instance.get(`companies/tree`);
    }*/
};
