package ru.application.repo;

import org.jooq.DSLContext;
import org.jooq.generated.tables.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import ru.application.pojo.employee.EmployeeWithCmpNameAndHeadNamePojo;

import java.util.List;

import static org.jooq.generated.tables.Company.COMPANY;
import static org.jooq.generated.tables.Employee.EMPLOYEE;
import static org.jooq.impl.DSL.count;

@Repository
public class EmployeeRepository {

    private final DSLContext dslContext;

    @Autowired
    public EmployeeRepository(DSLContext dslContext) {
        this.dslContext = dslContext;
    }


    public List<org.jooq.generated.tables.pojos.Employee> getAllEmployees() {
        return dslContext.select(EMPLOYEE.ID, EMPLOYEE.NAME, EMPLOYEE.COMPANY, EMPLOYEE.HEAD_EMPLOYEE)
                .from(EMPLOYEE)
                .fetch()
                .into(org.jooq.generated.tables.pojos.Employee.class);
    }

    public List<EmployeeWithCmpNameAndHeadNamePojo> getEmployeesWithParams(String companyNameLike,
                                                                           String employeeNameLike,
                                                                           Integer page,
                                                                           Integer pageSize) {
        Integer offset = (page - 1) * pageSize;
        String companyNameLikeCondition = "%" + companyNameLike + "%";
        String employeeNameLikeCondition = "%" + employeeNameLike + "%";
        Employee ALIAS_EMPLOYEE = EMPLOYEE.as("ALIAS_EMPLOYEE");
        return dslContext.select(EMPLOYEE.ID, EMPLOYEE.NAME.as("ename"), EMPLOYEE.COMPANY, EMPLOYEE.HEAD_EMPLOYEE, COMPANY.NAME.as("cname"),
                (dslContext.select(ALIAS_EMPLOYEE.NAME)
                        .from(ALIAS_EMPLOYEE)
                        .where(EMPLOYEE.HEAD_EMPLOYEE.eq(ALIAS_EMPLOYEE.ID))
                        .asField("headName")),
                (dslContext.select(count())
                .from(ALIAS_EMPLOYEE)
                .where(ALIAS_EMPLOYEE.HEAD_EMPLOYEE.eq(EMPLOYEE.ID)).asField("subordinate")))
                .from(EMPLOYEE)
                .leftJoin(COMPANY)
                .on(EMPLOYEE.COMPANY.eq(COMPANY.ID))
                .where(EMPLOYEE.NAME.like(employeeNameLikeCondition)
                        .and(companyNameLike.length() > 0 ? COMPANY.NAME.like(companyNameLikeCondition) : COMPANY.NAME.like(companyNameLikeCondition).or(COMPANY.NAME.isNull())))
                .orderBy(EMPLOYEE.ID)
                .offset(offset)
                .limit(pageSize)
                .fetch()
                .into(EmployeeWithCmpNameAndHeadNamePojo.class);
    }

    public Integer getTotalCountWithParams(String companyNameLike, String employeeNameLike) {
        String companyNameLikeCondition = "%" + companyNameLike + "%";
        String employeeNameLikeCondition = "%" + employeeNameLike + "%";
        return dslContext.select(count())
                .from(EMPLOYEE)
                .leftJoin(COMPANY)
                .on(EMPLOYEE.COMPANY.eq(COMPANY.ID))
                .where(EMPLOYEE.NAME.like(employeeNameLikeCondition)
                        .and(companyNameLike.length() > 0 ? COMPANY.NAME.like(companyNameLikeCondition) : COMPANY.NAME.like(companyNameLikeCondition).or(COMPANY.NAME.isNull())))
                .fetchOne()
                .into(Integer.class);
    }

    public void deleteEmployee(Integer id){
        dslContext.delete(EMPLOYEE)
                .where(EMPLOYEE.ID.eq(id))
                .execute();
    }

    public List<org.jooq.generated.tables.pojos.Employee> getAvailableHeadEmployeesForEmployee(Integer employeeId, Integer companyId){
        //при создании нового сотрудника у него еще нет id. Дадим ему несуществующий id, чтобы нормально работало notEqual
        if (employeeId==null){
            employeeId=-1;
        }
        return dslContext.select(EMPLOYEE.ID, EMPLOYEE.NAME, EMPLOYEE.COMPANY, EMPLOYEE.HEAD_EMPLOYEE)
                .from(EMPLOYEE)
                .where(EMPLOYEE.ID.notEqual(employeeId))
                .and(EMPLOYEE.HEAD_EMPLOYEE.notEqual(employeeId).or(EMPLOYEE.HEAD_EMPLOYEE.isNull()))
                .and(EMPLOYEE.COMPANY.eq(companyId))
                .fetch()
                .into(org.jooq.generated.tables.pojos.Employee.class);
    }

    public void createEmployee(org.jooq.generated.tables.pojos.Employee employee){
        dslContext.insertInto(EMPLOYEE, EMPLOYEE.NAME, EMPLOYEE.COMPANY, EMPLOYEE.HEAD_EMPLOYEE)
                .values(employee.getName(), employee.getCompany(), employee.getHeadEmployee())
                .execute();
    }

    public void updateEmployee(org.jooq.generated.tables.pojos.Employee employee){
        dslContext.update(EMPLOYEE)
                .set(EMPLOYEE.NAME, employee.getName())
                .set(EMPLOYEE.COMPANY, employee.getCompany())
                .set(EMPLOYEE.HEAD_EMPLOYEE, employee.getHeadEmployee())
                .where(EMPLOYEE.ID.eq(employee.getId()))
                .execute();
    }

    public org.jooq.generated.tables.pojos.Employee getEmployeeById(Integer id){
        return dslContext.select(EMPLOYEE.ID, EMPLOYEE.NAME, EMPLOYEE.COMPANY, EMPLOYEE.HEAD_EMPLOYEE)
                .from(EMPLOYEE)
                .where(EMPLOYEE.ID.eq(id))
                .fetchOne()
                .into(org.jooq.generated.tables.pojos.Employee.class);
    }

    public Integer getSubordinatesCountForEmployee(org.jooq.generated.tables.pojos.Employee employee){
        return dslContext.select(count())
                .from(EMPLOYEE)
                .where(EMPLOYEE.HEAD_EMPLOYEE.eq(employee.getId()))
                .fetchOne()
                .into(Integer.class);
    }

    public void setEmployeesHeadToNull(){
        dslContext.update(EMPLOYEE)
                .setNull(EMPLOYEE.HEAD_EMPLOYEE)
                .where(EMPLOYEE.COMPANY.isNull())
                .execute();
    }
}