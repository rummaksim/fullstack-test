import React from "react";
import EmployeeAddUpdate from "../common/EmployeeAddUpdate";
import {CompanyApi} from "../../../api/company/api";
import {EmployeeApi} from "../../../api/employee/api";

class EmployeeAddContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            headEmployees: [],
            employeeName: "",
            errorMessage: null,
            headEmployeeId: "",
            companyId: "",
            successMessage: null,
            operation: "Создание сотрудника",
            employeeId: ""
        }
    }

    componentDidMount() {
        this.getCompanies();
    }

    onEmployeeNameChange = (e) => {
        this.setState({employeeName: e.target.value});
    };

    onCompanySelectChange = (e) => {
        this.setState({companyId: e.target.value, headEmployeeId: ""} , ()=>this.getAvailableHeadEmployees(
            this.state.companyId, this.state.employeeId
        ));
    };

    onHeadEmployeeSelectChange = (e) => {
      this.setState({headEmployeeId:e.target.value});
    };

    getAvailableHeadEmployees = (companyId, employeeId) =>{
        EmployeeApi.getAvailableHeadEmployees(companyId, employeeId)
            .then(response=>{
                if (response.status === 200) {
                    this.setState({headEmployees: response.data});
                    this.setState({errorMessage: null})
                }else {
                    this.setState({errorMessage: response.data.message})
                }
            }).catch(error => {
            if (error.response) {
                this.setState({errorMessage: error.response.data.message});
            } else {
                this.setState({errorMessage: "Something went wrong"});
            }
        })
    };
    validateInput = () => {
        return this.state.employeeName.length>=1;
    };

    onSaveClick = () => {
        if (this.validateInput()){
            EmployeeApi.createEmployee(this.state.employeeName, this.state.companyId, this.state.headEmployeeId)
                .then(response=>{
                    if (response.status===204){
                        this.setState({employeeName: ""});
                        this.setState({companyId: ""});
                        this.setState({headEmployeeId: ""});
                        this.setState({errorMessage: null});
                        this.setState({successMessage: "Сотрудник успешно создан!"});
                    }else{
                        this.setState({errorMessage: response.data.message});
                        this.setState({successMessage: null});
                    }
                })
                .catch(error=>{
                    if (error.response) {
                        this.setState({errorMessage: error.response.data.message});
                    } else {
                        this.setState({errorMessage: "Something went wrong"});
                    }
                })
        }else{
            this.setState({errorMessage: "Имя сотрудника должно содержать хотя бы 1 символ"});
        }
    };

    getCompanies = () => {
        CompanyApi.getAllCompanies()
            .then(response => {
                if (response.status === 200) {
                    this.setState({companies: response.data});
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
            })
    };

    render() {
        return (
            <EmployeeAddUpdate
                companies={this.state.companies}
                headEmployees={this.state.headEmployees}
                employeeName={this.state.employeeName}
                errorMessage={this.state.errorMessage}
                headEmployeeId={this.state.headEmployeeId}
                companyId={this.state.companyId}
                successMessage={this.state.successMessage}
                operation={this.state.operation}

                onEmployeeNameChange={this.onEmployeeNameChange}
                onCompanySelectChange={this.onCompanySelectChange}
                onHeadEmployeeSelectChange={this.onHeadEmployeeSelectChange}
                onSaveClick={this.onSaveClick}
            />
        )
    }
}

export default EmployeeAddContainer;