package ru.application.service.company.impl;

import org.jooq.generated.tables.pojos.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import ru.application.exceptions.CustomSQLException;
import ru.application.pojo.company.CompaniesTreePojo;
import ru.application.pojo.company.CompanyWithEmpCountAndHeadCmpNameResponseEntity;
import ru.application.repo.CompanyRepository;
import ru.application.repo.EmployeeRepository;
import ru.application.service.company.CompanyService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public CompanyServiceImpl(CompanyRepository companyRepository, EmployeeRepository employeeRepository) {
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public CompanyWithEmpCountAndHeadCmpNameResponseEntity findAllCompaniesWithParams(
            String companyNameLike, Integer page, Integer pageSize) {
        companyNameLike = companyNameLike.replace("_","\\_").replace("%","\\%");
        return new CompanyWithEmpCountAndHeadCmpNameResponseEntity(
                companyRepository.findAllWithParams(companyNameLike, page, pageSize),
                companyRepository.getTotalCountWithParams(companyNameLike)
        );
    }

    @Override
    @Transactional
    public void deleteCompany(Integer id) {
        try {
            companyRepository.deleteCompany(id);
            employeeRepository.setEmployeesHeadToNull();

        }catch (RuntimeException e){
            throw new CustomSQLException("Удаление не произошло. Компания имеет дочерние компании.");
        }
    }

    @Override
    public void createCompany(Company company) {
        if (company.getName()==null || company.getName().length()<1){
            throw new CustomSQLException("Компания не создана. Проверьте правильность введенных данных");
        }
        companyRepository.createCompany(company);
    }

    @Override
    public void updateCompany(Company company) {
        if (company.getName()==null || company.getName().length()<1){
            throw new CustomSQLException("Компания не обновлена. Проверьте правильность введенных данных");
        }
        try {
            companyRepository.updateCompany(company);
        }catch (RuntimeException e){
            throw new CustomSQLException("Обновление не произошло. Возможно возникает транзитивная зависимость");
        }
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.getAllCompanies();
    }

    @Override
    public List<CompaniesTreePojo> getCompaniesTree() {
        List<Company> companies = getAllCompanies();
        return getTreeFromCompaniesList(companies);
    }

    @Override
    public List<Company> getAvailableHeadCompaniesForCompany(Integer id) {
        return companyRepository.getAvailableHeadCompaniesForCompany(id);
    }

    @Override
    public Company getCompanyById(Integer id) {
        return companyRepository.getCompanyById(id);
    }

    private List<CompaniesTreePojo> getTreeFromCompaniesList(List<Company> companies){
        return getTreeFromCompaniesListRecursiveExecutor(companies, null, new ArrayList<>());
    }

    /**
     * Вызывать только из getTreeFromCompaniesList
     * @param companies cписок компаний
     * @param curHeadId головная организация (id), для которой ищутся подчиненные организации
     * @param companiesTree формирующееся дерево организаций
     * @return дерево организаций
     */
    private List<CompaniesTreePojo> getTreeFromCompaniesListRecursiveExecutor(List<Company> companies, Integer curHeadId, List<CompaniesTreePojo> companiesTree) {
        for (int i = 0; i < companies.size(); i++) {
            if (Objects.equals(companies.get(i).getHeadCompany(), curHeadId)) {
                companiesTree.add(new CompaniesTreePojo(companies.get(i).getId(),
                        companies.get(i).getName(),
                        companies.get(i).getHeadCompany()));
                Integer newHeadId = companies.get(i).getId();
                getTreeFromCompaniesListRecursiveExecutor(companies, newHeadId, companiesTree.get(companiesTree.size() - 1).getChildren());
            }
        }
        return companiesTree;
    }
}
