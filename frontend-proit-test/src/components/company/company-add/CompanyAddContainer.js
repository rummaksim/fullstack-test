import React from "react";
import CompanyAddUpdate from "../common/CompanyAddUpdate";
import {CompanyApi} from "../../../api/company/api";

class CompanyAddContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headCompanies: [],
            companyName: "",
            errorMessage: null,
            headCompanyId: "",
            successMessage: null,
            operation: "Создание организации",
        }
    }

    componentDidMount() {
        this.getAllCompanies();
    }

    getAllCompanies = () => {
        CompanyApi.getAllCompanies()
            .then(response => {
                if (response.status === 200) {
                    this.setState({headCompanies: response.data});
                    this.setState({errorMessage: null});
                } else {
                    this.setState({errorMessage: response.data.message});
                    this.setState({successMessage: null});
                }
            })
            .catch(error => {
                this.setState({successMessage: null});
                    if (error.response) {
                        this.setState({errorMessage: error.response.data.message});
                    } else {
                        this.setState({errorMessage: "Something went wrong"});
                    }
                }
            );
    };

    onCompanyNameChange = (e) => {
        this.setState({companyName: e.target.value})
    };

    onHeadCompanySelectChange = (e) =>{
        this.setState({headCompanyId: e.target.value});
    };

    validateInput = () => {
        return this.state.companyName.length>=1;
    };

    onSaveClick = () => {
        if (this.validateInput()){
            CompanyApi.createCompany(this.state.companyName, this.state.headCompanyId)
                .then(response=>{
                    if (response.status === 204){
                        this.setState({headCompanyId: ""});
                        this.setState({errorMessage: null});
                        this.setState({successMessage: "Компания успешно добавлена"});
                        this.setState({companyName: ""});
                        this.getAllCompanies();
                    }else{
                        this.setState({errorMessage: response.data.message});
                        this.setState({successMessage: null});
                    }
                })
                .catch(error =>{
                    if (error.response) {
                        this.setState({errorMessage: error.response.data.message});
                    } else {
                        this.setState({errorMessage: "Something went wrong"});
                    }
                });
        }
        else{
            this.setState({errorMessage: "Название компании должно содержать хотя бы 1 символ"});
        }
    };

    render() {
        return (
            <>
                <CompanyAddUpdate
                    headCompanies={this.state.headCompanies}
                    companyName={this.state.companyName}
                    errorMessage={this.state.errorMessage}
                    successMessage={this.state.successMessage}
                    headCompanyId={this.state.headCompanyId}
                    operation={this.state.operation}

                    onCompanyNameChange={this.onCompanyNameChange}
                    onHeadCompanySelectChange={this.onHeadCompanySelectChange}
                    onSaveClick={this.onSaveClick}
                />
            </>
        )
    }
}

export default CompanyAddContainer;