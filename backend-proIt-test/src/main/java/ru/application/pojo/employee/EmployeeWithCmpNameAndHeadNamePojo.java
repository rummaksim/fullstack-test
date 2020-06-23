package ru.application.pojo.employee;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.jooq.generated.tables.pojos.Employee;

@EqualsAndHashCode(callSuper = true)
@Data
public class EmployeeWithCmpNameAndHeadNamePojo extends Employee {
    private String companyName;
    private String headEmployeeName;
    private Integer subordinateCount;

    public EmployeeWithCmpNameAndHeadNamePojo(Integer id, String name, Integer company,
                                              Integer headEmployee,
                                              String companyName,
                                              String headEmployeeName,
                                              Integer subordinateCount){
        super(id, name, company, headEmployee);
        this.companyName = companyName;
        this.headEmployeeName = headEmployeeName;
        this.subordinateCount = subordinateCount;
    }
}
