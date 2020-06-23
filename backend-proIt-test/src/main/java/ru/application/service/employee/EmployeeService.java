package ru.application.service.employee;


import org.jooq.generated.tables.pojos.Employee;
import ru.application.pojo.employee.EmployeeTreePojo;
import ru.application.pojo.employee.EmployeeWithCmpNameAndHeadNameResponseEntity;

import java.util.List;

public interface EmployeeService {

    List<EmployeeTreePojo> getEmployeesTree();

    EmployeeWithCmpNameAndHeadNameResponseEntity getEmployeesWithParams(
            String companyNameLike, String employeeNameLike, Integer page, Integer pageSize);

    void deleteEmployee(Integer id);

    List<Employee> getAvailableHeadEmployeesForEmployee(Integer employeeId, Integer companyId);

    void createEmployee(Employee employee);

    void updateEmployee (Employee employee);

    Employee getEmployeeById(Integer id);
}
