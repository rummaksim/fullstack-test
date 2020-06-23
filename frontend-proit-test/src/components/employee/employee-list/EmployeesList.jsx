import {NavLink} from "react-router-dom";
import Pagination from "react-js-pagination";
import React from "react";

const EmployeesList = (props) =>{
    return(
        <div>
            <h6>Список сотрудников</h6>
            {props.errorMessage &&
            <div className={"alert alert-danger d-inline-flex p-2"}>{props.errorMessage}</div>}
            <div>
                <div className={"d-flex justify-content-end"}>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <div className={"mx-sm-0"}>
                                <label htmlFor="companySearchName">Организация:</label>
                            </div>
                            <div className={"mx-sm-3"}>
                                <input type="text" className="form-control" id="companySearchName"
                                       placeholder="Название" value={props.companySearchInputText}
                                       onChange={e => props.onCompanyNameSearchInputChange(e)}
                                />
                            </div>
                            <div className={"mx-sm-0"}>
                                <label htmlFor="employeeSearchName">Сотрудник:</label>
                            </div>
                            <div className={"mx-sm-3"}>
                                <input type="text" className="form-control" id="employeeSearchName"
                                       placeholder="Имя" value={props.employeeSearchInputText}
                                       onChange={e => props.onEmployeeNameSearchInputChange(e)}
                                />
                            </div>

                            <button type={"button"} className="btn btn-secondary"
                                    onClick={() => props.onClickSearch()}>Поиск
                            </button>
                        </div>
                    </form>
                </div>


                <table className={"table table-striped table-bordered"}>
                    <thead>
                    <tr className={"text-center"}>
                        <th>Имя сотрудника</th>
                        <th>Организация сотрудника</th>
                        <th>Руководитель сотрудника</th>
                        <th>Число подчиненных</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.employees.map(employee =>
                            <tr className={"text-center"} key={employee.id}>
                                <td className={"align-middle"}>{employee.name}</td>
                                <td className={"align-middle"}>{employee.companyName}</td>
                                <td className={"align-middle"}>{employee.headEmployeeName}</td>
                                <td className={"align-middle"}>{employee.subordinateCount}</td>
                                <td className={"align-middle"}>
                                    <NavLink to={`/employees/update/${employee.id}`}>
                                        <button className={"btn btn-secondary"}>Изменить</button>
                                    </NavLink>
                                </td>
                                <td className={"align-middle"}>
                                    <button className={"btn btn-secondary"} onClick={() => {
                                        props.onClickDelete(employee.id)
                                    }}>Удалить
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div className={"d-flex justify-content-center"}>
                    <form className="form-inline">
                        <div className="form-group mb-2">
                            <NavLink to={"employees/create"}>
                                <button type={"button"} className="btn btn-secondary">Создать</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>

            <div className={"d-flex justify-content-center mt-5"}>
                <Pagination
                    onChange={props.onPageChange}
                    totalItemsCount={props.totalItemsCount}
                    activePage={props.currentPage}
                    pageRangeDisplayed={10}
                    itemsCountPerPage={props.pageSize}
                    itemClass="page-item custom"
                    linkClass="page-link custom"
                />
            </div>
        </div>
    )
};

export default EmployeesList;