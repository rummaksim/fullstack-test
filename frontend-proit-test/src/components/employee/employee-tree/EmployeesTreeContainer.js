import React from "react";
import {EmployeeApi} from "../../../api/employee/api";
import RecursiveTreeView from "../../common/RecursiveTreeView";

class EmployeesTreeContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            errorMessage: null,
            pageHeader: "Дерево сотрудников",
        }
    }

    componentDidMount() {
        this.getEmployeesTree();

    }

    getEmployeesTree = () => {
        EmployeeApi.getEmployeesTree()
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

    render() {
        return (
            <>
                <RecursiveTreeView
                    data={this.state.data}
                    errorMessage={this.state.errorMessage}
                    pageHeader={this.state.pageHeader}
                />
            </>
        )
    }
}

export default EmployeesTreeContainer;