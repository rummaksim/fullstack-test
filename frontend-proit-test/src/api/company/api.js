import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});

export const CompanyApi = {
    getCompaniesWithParams(companyNameLike, page, pageSize) {
        return instance.get(`companies?pageSize=${pageSize}&page=${page}&companyNameLike=${companyNameLike}`);
    },

    deleteCompany(id) {
        return instance.delete(`companies?id=${id}`);
    },

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
    }
};
