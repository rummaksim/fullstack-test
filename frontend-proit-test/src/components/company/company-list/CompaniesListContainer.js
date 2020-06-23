import React from "react";
import "../../../common/styles/custom-pagination.css";
import {CompanyApi} from "../../../api/company/api";
import CompaniesList from "./CompaniesList";
import {Redirect} from "react-router-dom";



class CompaniesListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            currentPage: 1,
            pageSize: 3,
            companyNameLike: "",
            companySearchInputText: "",
            totalItemsCount: 0,
            errorMessage: null,
            showModal: false,
            modalCompanyId: "",
        }
    }

    componentDidMount() {
        this.getCompaniesWithParams(this.state.companyNameLike, this.state.currentPage, this.state.pageSize);
    }

    onPageChange = (newCurrentPage) => {
        this.setState({currentPage: newCurrentPage}, () => {
            this.getCompaniesWithParams(this.state.companyNameLike, this.state.currentPage, this.state.pageSize);
        });
    };

    onCompanyNameSearchInputChange = (e) => {
        this.setState({companySearchInputText: e.target.value})
    };

    onClickSearch = () => {
        this.setState({currentPage: 1, companyNameLike: this.state.companySearchInputText}, () => {
            this.getCompaniesWithParams(this.state.companyNameLike, this.state.currentPage, this.state.pageSize);
        });
    };

    onClickDelete = (companyId) => {
        let countEmployees = this.state.companies.filter((el)=>{return el.id===companyId})[0].employeesInCompanyCount;
        if (countEmployees===0) {
            this.deleteCompany(companyId);
        }else{
            this.setState({showModal: true});
            this.setState({modalCompanyId: companyId});
        }
    };

    deleteCompany = (companyId) =>{
        CompanyApi.deleteCompany(companyId)
            .then(response => {
                if (response.status === 204) {
                    this.getCompaniesWithParams(this.state.companyNameLike, this.state.currentPage, this.state.pageSize)
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

    onModalClose = () =>{
      this.setState({showModal: false});
    };

    onModalDisagreeClick = () =>{
        this.setState({showModal: false});
    };

    onModalAgreeClick = () =>{
        this.deleteCompany(this.state.modalCompanyId);
        this.setState({showModal: false});
    };


    getCompaniesWithParams = (companyNameLike, page, pageSize) => {
        CompanyApi.getCompaniesWithParams(companyNameLike, page, pageSize)
            .then(response => {
                if (response.status === 200) {
                    this.setState({companies: response.data.companies});
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
                }
            );
    };

    render() {
        return (
            <>
                <CompaniesList
                    companies={this.state.companies}
                    currentPage={this.state.currentPage}
                    pageSize={this.state.pageSize}
                    companySearchInputText={this.state.companySearchInputText}
                    totalItemsCount={this.state.totalItemsCount}
                    errorMessage={this.state.errorMessage}
                    showModal={this.state.showModal}

                    onPageChange={this.onPageChange}
                    onCompanyNameSearchInputChange={this.onCompanyNameSearchInputChange}
                    onClickSearch={this.onClickSearch}
                    onClickDelete={this.onClickDelete}
                    onModalClose={this.onModalClose}
                    onModalDisagreeClick={this.onModalDisagreeClick}
                    onModalAgreeClick={this.onModalAgreeClick}
                />
            </>
        )
    }
}


export default CompaniesListContainer;