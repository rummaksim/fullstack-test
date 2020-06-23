package ru.application.repo;

import org.jooq.DSLContext;
import org.jooq.generated.tables.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ru.application.pojo.company.CompanyWithEmpCountAndHeadCmpNamePojo;

import java.util.List;

import static org.jooq.generated.tables.Company.COMPANY;
import static org.jooq.generated.tables.Employee.EMPLOYEE;
import static org.jooq.impl.DSL.count;

@Repository
public class CompanyRepository {

    private final DSLContext dslContext;

    @Autowired
    public CompanyRepository(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public List<CompanyWithEmpCountAndHeadCmpNamePojo> findAllWithParams(String companyNameLike, Integer page, Integer pageSize) {
        Integer offset = pageSize*(page-1);
        String companyNameLikeCondition = "%"+companyNameLike+"%";
        Company ALIAS_COMPANY = COMPANY.as("ALIAS_COMPANY");
        return dslContext.select(
                COMPANY.ID,
                COMPANY.NAME,
                COMPANY.HEAD_COMPANY,
                count(EMPLOYEE.ID),
                (dslContext.select(ALIAS_COMPANY.NAME)
                                .from(ALIAS_COMPANY)
                                .where(COMPANY.HEAD_COMPANY
                                        .equal(ALIAS_COMPANY.ID))
                        .asField("headCompanyName")))
                .from(COMPANY)
                .leftJoin(EMPLOYEE)
                .on(COMPANY.ID.equal(EMPLOYEE.COMPANY))
                .where(COMPANY.NAME.like(companyNameLikeCondition))
                .groupBy(COMPANY.ID)
                .orderBy(COMPANY.ID)
                .offset(offset)
                .limit(pageSize)
                .fetch()
                .into(CompanyWithEmpCountAndHeadCmpNamePojo.class);
    }

    public Integer getTotalCountWithParams(String companyNameLike){
        String companyNameLikeCondition = "%"+companyNameLike+"%";
        return dslContext.select(
            count())
                .from(COMPANY)
                .where(COMPANY.NAME.like(companyNameLikeCondition))
                .fetchOne()
                .into(Integer.class);
    }

    public void deleteCompany(Integer id){
            dslContext.delete(COMPANY)
                    .where(COMPANY.ID.eq(id))
                    .execute();
    }

    public void createCompany(org.jooq.generated.tables.pojos.Company company){
        dslContext.insertInto(COMPANY, COMPANY.NAME, COMPANY.HEAD_COMPANY)
                .values(company.getName(),company.getHeadCompany())
                .execute();
    }

    public void updateCompany(org.jooq.generated.tables.pojos.Company company){
        dslContext.update(COMPANY)
                .set(COMPANY.NAME, company.getName())
                .set(COMPANY.HEAD_COMPANY, company.getHeadCompany())
                .where(COMPANY.ID.eq(company.getId()))
                .execute();
    }

    public List<org.jooq.generated.tables.pojos.Company> getAllCompanies(){
        return dslContext.select(COMPANY.ID, COMPANY.NAME, COMPANY.HEAD_COMPANY)
                .from(COMPANY)
                .fetch()
                .into(org.jooq.generated.tables.pojos.Company.class);
    }

    public List<org.jooq.generated.tables.pojos.Company> getAvailableHeadCompaniesForCompany(Integer id){
        return dslContext.select(COMPANY.ID, COMPANY.NAME, COMPANY.HEAD_COMPANY)
                .from(COMPANY)
                .where(COMPANY.ID.notEqual(id))
                .and(COMPANY.HEAD_COMPANY.notEqual(id).or(COMPANY.HEAD_COMPANY.isNull()))
                .fetch()
                .into(org.jooq.generated.tables.pojos.Company.class);
    }

    public org.jooq.generated.tables.pojos.Company getCompanyById(Integer id){
        return dslContext.select(COMPANY.ID, COMPANY.NAME, COMPANY.HEAD_COMPANY)
                .from(COMPANY)
                .where(COMPANY.ID.eq(id))
                .fetchOne()
                .into(org.jooq.generated.tables.pojos.Company.class);
    }
}
