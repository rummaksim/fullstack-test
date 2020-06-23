import React from "react";
import {CompanyApi} from "../../../api/company/api";
import RecursiveTreeView from "../../common/RecursiveTreeView";

class CompaniesTreeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            errorMessage: null,
            pageHeader: "Дерево организаций",
        }
    }

    getCompaniesTree = () => {
        CompanyApi.getCompaniesTree()
            .then(response => {
                if (response.status === 200) {
                    this.setState({data: response.data});
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


    componentDidMount() {
        this.getCompaniesTree();
    }

    render() {
        return (
            <>
                <RecursiveTreeView
                    data={this.state.data}
                    errorMessage={this.state.errorMessage}
                    pageHeader={this.state.pageHeader}
                />
            </>
        );
    }
}

export default CompaniesTreeContainer;