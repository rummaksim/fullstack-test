package ru.application.pojo.company;
import lombok.*;
import org.jooq.generated.tables.pojos.Company;


@EqualsAndHashCode(callSuper = true)
@Data
public class CompanyWithEmpCountAndHeadCmpNamePojo extends Company {
    private Integer employeesInCompanyCount;
    private String headCompanyName;

    public CompanyWithEmpCountAndHeadCmpNamePojo(Integer id,
                                                 String name,
                                                 Integer headCompany,
                                                 Integer employeesInCompanyCount,
                                                 String headCompanyName){
        super(id, name, headCompany);
        this.employeesInCompanyCount=employeesInCompanyCount;
        this.headCompanyName = headCompanyName;
    }
}
