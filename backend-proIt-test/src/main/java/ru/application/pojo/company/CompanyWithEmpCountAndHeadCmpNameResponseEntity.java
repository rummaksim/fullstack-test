package ru.application.pojo.company;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CompanyWithEmpCountAndHeadCmpNameResponseEntity {

    private List<CompanyWithEmpCountAndHeadCmpNamePojo> companies;
    private Integer totalCount;
}
