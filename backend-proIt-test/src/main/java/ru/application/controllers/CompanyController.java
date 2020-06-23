package ru.application.controllers;

import org.jooq.generated.tables.pojos.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.application.pojo.company.CompaniesTreePojo;
import ru.application.pojo.company.CompanyWithEmpCountAndHeadCmpNameResponseEntity;
import ru.application.service.company.CompanyService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping ("api/v1")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/companies")
    public ResponseEntity<CompanyWithEmpCountAndHeadCmpNameResponseEntity> getCompaniesWithParams(
            @RequestParam Integer page,
            @RequestParam Integer pageSize,
            @RequestParam String companyNameLike
    ){
        return new ResponseEntity<>(
                companyService.findAllCompaniesWithParams(companyNameLike, page, pageSize),
                HttpStatus.OK);
    }


    @DeleteMapping("/companies")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompany(
            @RequestParam Integer id
    ){
        companyService.deleteCompany(id);
    }

    @PostMapping("/companies/create-company")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void createCompany(@RequestBody Company company){
        companyService.createCompany(company);
    }

    @PutMapping("/companies/update-company")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCompany(@RequestBody Company company){
        companyService.updateCompany(company);
    }

    @GetMapping("/companies/all")
    public ResponseEntity<List<Company>> getAllCompanies(){
        return new ResponseEntity<>(
                companyService.getAllCompanies(),
                HttpStatus.OK
        );
    }

    @GetMapping("/companies/tree")
    public ResponseEntity<List<CompaniesTreePojo>> getCompaniesTree(){
        return new ResponseEntity<>(companyService.getCompaniesTree(), HttpStatus.OK);
    }

    @GetMapping("/companies/available-head-companies")
    public ResponseEntity<List<Company>> getAvailableHeadCompaniesForCompany(
            @RequestParam Integer id
    ){
        return new ResponseEntity<>(companyService.getAvailableHeadCompaniesForCompany(id), HttpStatus.OK);
    }

    @GetMapping("/companies/company")
    public ResponseEntity<Company> getCompanyById(
            @RequestParam Integer id
    ){
        return new ResponseEntity<>(companyService.getCompanyById(id), HttpStatus.OK);
    }

}
