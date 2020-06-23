package ru.application.pojo.employee;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.jooq.generated.tables.pojos.Employee;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class EmployeeTreePojo extends Employee {

    private List<EmployeeTreePojo> children;

    public EmployeeTreePojo(Integer id,
                             String name,
                             Integer company,
                             Integer headCompany
    ) {
        super(id, name, company, headCompany);
        this.children = new ArrayList<>();
    }

}
