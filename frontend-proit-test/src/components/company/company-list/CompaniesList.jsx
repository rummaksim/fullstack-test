import React from "react";
import Pagination from "react-js-pagination";
import "../../../common/styles/custom-pagination.css";
import {NavLink} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";



const CompaniesList = (props) => {
    return (
        <div>
            <h6>Список организаций</h6>
            {props.errorMessage &&
            <div className={"alert alert-danger d-inline-flex p-2"}>{props.errorMessage}</div>}

            <Dialog
                open={props.showModal}
                onClose={props.onModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Попытаться удалить организацию?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        В организации есть сотрудники. В случае её удаления, сотрудники не будут принадлежать ни одной организации.
                        Продолжить удаление?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onModalDisagreeClick} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={props.onModalAgreeClick} color="primary" autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

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
                            <button type={"button"} className="btn btn-secondary"
                                    onClick={() => props.onClickSearch()}>Поиск
                            </button>
                        </div>
                    </form>
                </div>


                <table className={"table table-striped table-bordered"}>
                    <thead>
                    <tr className={"text-center"}>
                        <th>Название организации</th>
                        <th>Головная организация</th>
                        <th>Число сотрудников</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.companies.map(company =>
                            <tr className={"text-center"} key={company.id}>
                                <td className={"align-middle"}>{company.name}</td>
                                <td className={"align-middle"}>{company.headCompanyName}</td>
                                <td className={"align-middle"}>{company.employeesInCompanyCount}</td>
                                <td className={"align-middle"}>
                                    <NavLink to={`/companies/update/${company.id}`}>
                                        <button className={"btn btn-secondary"}>Изменить</button>
                                    </NavLink>
                                </td>
                                <td className={"align-middle"}>
                                    <button className={"btn btn-secondary"} onClick={() => {
                                        props.onClickDelete(company.id)
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
                            <NavLink to={"companies/create"}>
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

export default CompaniesList;