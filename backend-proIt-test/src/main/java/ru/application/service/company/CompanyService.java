package ru.application.service.company;

import org.jooq.generated.tables.pojos.Company;
import ru.application.pojo.company.CompaniesTreePojo;
import ru.application.pojo.company.CompanyWithEmpCountAndHeadCmpNameResponseEntity;

import java.util.List;


public interface CompanyService {
    CompanyWithEmpCountAndHeadCmpNameResponseEntity findAllCompaniesWithParams(
            String companyNameLike, Integer page,  Integer pageSize
    );

    void deleteCompany(Integer id);

    void createCompany(Company company);

    void updateCompany(Company company);

    List<Company> getAllCompanies();

    List<CompaniesTreePojo> getCompaniesTree();

    List<Company> getAvailableHeadCompaniesForCompany(Integer id);

    Company getCompanyById(Integer id);
}
