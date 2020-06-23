package ru.application.pojo.employee;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class EmployeeWithCmpNameAndHeadNameResponseEntity {
    List<EmployeeWithCmpNameAndHeadNamePojo> employees;
    Integer totalCount;
}
