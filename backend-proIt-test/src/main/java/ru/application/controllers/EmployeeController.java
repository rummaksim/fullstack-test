package ru.application.controllers;

import org.jooq.generated.tables.pojos.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.application.pojo.employee.EmployeeTreePojo;
import ru.application.pojo.employee.EmployeeWithCmpNameAndHeadNameResponseEntity;
import ru.application.service.employee.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;


    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees/tree")
    public ResponseEntity<List<EmployeeTreePojo>> getEmployeesTree(){
        return new ResponseEntity<>(employeeService.getEmployeesTree(), HttpStatus.OK);
    }

    @GetMapping("/employees")
    public ResponseEntity<EmployeeWithCmpNameAndHeadNameResponseEntity> getEmployeesWithParams(
            @RequestParam Integer page,
            @RequestParam Integer pageSize,
            @RequestParam String companyNameLike,
            @RequestParam String employeeNameLike
    ){
        return new ResponseEntity<>(employeeService.getEmployeesWithParams(companyNameLike, employeeNameLike,page,pageSize),HttpStatus.OK);

    }

    @DeleteMapping("/employees")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(
            @RequestParam Integer id
    ){
        employeeService.deleteEmployee(id);
    }

    @GetMapping("/employees/available-head-employees")
    public ResponseEntity<List<Employee>> getAvailableHeadEmployeesForEmployee(
            @RequestParam Integer employeeId,
            @RequestParam Integer companyId
    ){
        return new ResponseEntity<>(employeeService.getAvailableHeadEmployeesForEmployee(employeeId, companyId), HttpStatus.OK) ;
    }

    @PostMapping("/employees/create-employee")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createEmployee(@RequestBody Employee employee){
        employeeService.createEmployee(employee);
    }

    @PutMapping("/employees/update-employee")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateEmployee(@RequestBody Employee employee){
        employeeService.updateEmployee(employee);
    }

    @GetMapping("/employees/employee")
    public ResponseEntity<Employee> getEmployeeById(@RequestParam Integer id){
        return new ResponseEntity<>(employeeService.getEmployeeById(id), HttpStatus.OK);
    }
}
