import React from "react";
import {EmployeeApi} from "../../../api/employee/api";
import EmployeesList from "./EmployeesList";

class EmployeesListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            currentPage: 1,
            pageSize: 3,
            companyNameLike: "",
            companySearchInputText: "",
            employeeNameLike: "",
            employeeSearchInputText: "",
            totalItemsCount: 0,
            errorMessage: null
        }
    }

    componentDidMount() {
        this.getEmployeesWithParams(this.state.companyNameLike, this.state.employeeNameLike,
            this.state.currentPage, this.state.pageSize);
    }

    getEmployeesWithParams = (companyNameLike, employeeNameLike, page, pageSize) => {
        EmployeeApi.getEmployeesWithParams(companyNameLike, employeeNameLike, page, pageSize)
            .then(response => {
                if (response.status === 200) {
                    this.setState({employees: response.data.employees});
                    this.setState({totalItemsCount: response.data.totalCount});
                    this.setState({errorMessage: null});
                } else {
                    this.setState({errorMessage: response.data.message});
                }
            })
            .catch(error => {
                if (error.response) {
                    this.setState({errorMessage: error.response.data.message});
                } else {
                    this.setState({errorMessage: "Something went wrong"});
                }
            });
    };

    onCompanyNameSearchInputChange = (e) =>{
        this.setState({companySearchInputText: e.target.value});
    };

    onEmployeeNameSearchInputChange = (e) =>{
        this.setState({employeeSearchInputText: e.target.value});
    };

    onClickSearch = () =>{
        this.setState({currentPage:1, companyNameLike: this.state.companySearchInputText, employeeNameLike: this.state.employeeSearchInputText},
            ()=>{
                this.getEmployeesWithParams(this.state.companyNameLike, this.state.employeeNameLike, this.state.currentPage, this.state.pageSize);
            });
    };

    onPageChange = (newCurrentPage) =>{
        this.setState({currentPage: newCurrentPage}, () =>{
            this.getEmployeesWithParams(this.state.companyNameLike, this.state.employeeNameLike, this.state.currentPage, this.state.pageSize);
        })
    };

    onClickDelete = (id) =>{
        EmployeeApi.deleteEmployee(id)
            .then(response=>{
                if (response.status === 204) {
                    this.getEmployeesWithParams(this.state.companyNameLike, this.state.employeeNameLike, this.state.currentPage, this.state.pageSize);
                }else{
                    this.setState({errorMessage: response.data.message});
                }
            })
            .catch(error=>{
                if (error.response) {
                    this.setState({errorMessage: error.response.data.message});
                } else {
                    this.setState({errorMessage: "Something went wrong"});
                }
            })
    };


    render() {
        return (
            <EmployeesList
                errorMessage={this.state.errorMessage}
                companySearchInputText={this.state.companySearchInputText}
                employeeSearchInputText={this.state.employeeSearchInputText}
                employees={this.state.employees}
                currentPage = {this.state.currentPage}
                pageSize = {this.state.pageSize}
                totalItemsCount = {this.state.totalItemsCount}

                onCompanyNameSearchInputChange={this.onCompanyNameSearchInputChange}
                onEmployeeNameSearchInputChange={this.onEmployeeNameSearchInputChange}
                onClickSearch={this.onClickSearch}
                onPageChange={this.onPageChange}
                onClickDelete={this.onClickDelete}
            />
        )
    }
}

export default EmployeesListContainer;