package ru.application.pojo.company;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.jooq.generated.tables.pojos.Company;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CompaniesTreePojo extends Company {
    private List<CompaniesTreePojo> children;


    public CompaniesTreePojo(Integer id,
                             String name,
                             Integer headCompany
                             ) {
        super(id, name, headCompany);
        this.children = new ArrayList<>();
    }
}
