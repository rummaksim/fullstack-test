import React from "react";

const EmployeeAddUpdate = (props) => {

    let optionsCompany = props.companies.map(company=>(
        <option key={company.id} value={company.id}>{company.name}</option>
    ));
    let optionsHeadEmployee = props.headEmployees.map(employee=>(
        <option key={employee.id} value={employee.id}>{employee.name}</option>
    ));

    return (
        <div>
            <h1>
                {props.operation}
            </h1>
            {(props.successMessage && !props.errorMessage) &&
            <div className={"alert alert-success d-inline-flex p-2"}>{props.successMessage}</div>}
            {props.errorMessage &&
            <div className={"alert alert-danger d-inline-flex p-2"}>{props.errorMessage}</div>}
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Имя сотрудника:</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Имя сотрудника" value={props.employeeName} onChange={e=>props.onEmployeeNameChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Компания сотрудника:</label>
                        <select className="form-control" value={props.companyId}
                                id="exampleFormControlSelect1" onChange={e=>props.onCompanySelectChange(e)}>
                            <option key={-1} value={""}>{""}</option>
                            {optionsCompany}
                        </select>
                        <label htmlFor="exampleFormControlSelect2">Руководитель сотрудника:</label>
                        <select className="form-control" value={props.headEmployeeId}
                                id="exampleFormControlSelect2" onChange={e=>props.onHeadEmployeeSelectChange(e)}>
                            <option key={-1} value={""}>{""}</option>
                            {optionsHeadEmployee}
                        </select>
                    </div>
                </form>
            </div>
            <div className={"d-flex justify-content-center"}>
                <form className="form-inline">
                    <div className="form-group mb-4 mt-4">
                        <button type={"button"} className="btn btn-secondary" onClick={props.onSaveClick}>Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default EmployeeAddUpdate;