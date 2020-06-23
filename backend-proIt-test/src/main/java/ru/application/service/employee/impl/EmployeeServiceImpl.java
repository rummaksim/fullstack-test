package ru.application.service.employee.impl;

import org.jooq.generated.tables.pojos.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import ru.application.exceptions.CustomSQLException;
import ru.application.pojo.employee.EmployeeTreePojo;
import ru.application.pojo.employee.EmployeeWithCmpNameAndHeadNameResponseEntity;
import ru.application.repo.EmployeeRepository;
import ru.application.service.employee.EmployeeService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class EmployeeServiceImpl implements EmployeeService {


    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<EmployeeTreePojo> getEmployeesTree() {
        List<Employee> employees = employeeRepository.getAllEmployees();
        return getTreeFromEmployeesList(employees);
    }

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public EmployeeWithCmpNameAndHeadNameResponseEntity getEmployeesWithParams(String companyNameLike, String employeeNameLike, Integer page, Integer pageSize) {
        companyNameLike = companyNameLike.replace("_", "\\_").replace("%", "\\%");
        employeeNameLike = employeeNameLike.replace("_", "\\_").replace("%", "\\%");
        return new EmployeeWithCmpNameAndHeadNameResponseEntity(
                employeeRepository.getEmployeesWithParams(companyNameLike,employeeNameLike,page,pageSize),
                employeeRepository.getTotalCountWithParams(companyNameLike, employeeNameLike));
    }

    @Override
    public void deleteEmployee(Integer id) {
        try {
            employeeRepository.deleteEmployee(id);
        }catch (RuntimeException e){
            throw new CustomSQLException("Удаление не произошло. Сотрудник иммет подчиненных");
        }
    }

    @Override
    public List<Employee> getAvailableHeadEmployeesForEmployee(Integer employeeId, Integer companyId) {
        return employeeRepository.getAvailableHeadEmployeesForEmployee(employeeId, companyId);
    }

    @Override
    public void createEmployee(Employee employee) {
        if (employee.getName()==null || employee.getName().length()<1){
            throw new CustomSQLException("Сотрудник не создан. Проверьте правильность введенных данных");
        }
        employeeRepository.createEmployee(employee);
    }

    @Override
    public void updateEmployee(Employee employee) {
        if (employee.getName()==null || employee.getName().length()<1){
            throw new CustomSQLException("Сотрудник не изменен. Проверьте правильность введенных данных");
        }
        if (employeeRepository.getSubordinatesCountForEmployee(employee)>0 &&
                !employeeRepository.getEmployeeById(employee.getId()).getCompany().equals(employee.getCompany())){
            throw new CustomSQLException("Сотрудник не изменен. Смена компании невозможна, так как сотрудник имеет подчиненных");
        }
        try {
            employeeRepository.updateEmployee(employee);
        }catch (RuntimeException e){
            throw new CustomSQLException("Обновление не произошло. Возможно возникает транзитивная зависимость или компания сотрудника не совпадает с компанией руководителя");
        }
    }

    @Override
    public Employee getEmployeeById(Integer id) {
        return employeeRepository.getEmployeeById(id);
    }

    private List<EmployeeTreePojo> getTreeFromEmployeesList(List<Employee> employees) {
        return getTreeFromEmployeesListRecursiveExecutor(employees, null, new ArrayList<>());
    }

    /**
     * Вызывать только из getTreeFromCompaniesList
     * @param employees список всех сотрудников
     * @param curHeadId текущий руководитель
     * @param employeesTree дерево сотрудников
     * @return дерево сотрудников
     */
    private List<EmployeeTreePojo> getTreeFromEmployeesListRecursiveExecutor(List<Employee> employees, Integer curHeadId, List<EmployeeTreePojo> employeesTree) {
        for (int i = 0; i < employees.size(); i++) {
            if (Objects.equals(employees.get(i).getHeadEmployee(), curHeadId)) {
                employeesTree.add(new EmployeeTreePojo(employees.get(i).getId(),
                        employees.get(i).getName(),
                        employees.get(i).getCompany(),
                        employees.get(i).getHeadEmployee()));
                Integer newHeadId = employees.get(i).getId();
                getTreeFromEmployeesListRecursiveExecutor(employees, newHeadId, employeesTree.get(employeesTree.size() - 1).getChildren());
            }
        }
        return employeesTree;
    }
}
