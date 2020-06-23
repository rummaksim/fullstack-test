import React from 'react';
import './App.css';
import NavBar from "./components/navbar/NavBar";
import {Route, Switch} from "react-router-dom";
import CompaniesListContainer from "./components/company/company-list/CompaniesListContainer";
import CompanyAddContainer from "./components/company/company-add/CompanyAddContainer";
import CompanyUpdateContainer from "./components/company/company-update/CompanyUpdateContainer";
import CompaniesTreeContainer from "./components/company/company-tree/CompaniesTreeContainer";
import EmployeesTreeContainer from "./components/employee/employee-tree/EmployeesTreeContainer";
import EmployeesListContainer from "./components/employee/employee-list/EmployeesListContainer";
import EmployeeAddContainer from "./components/employee/employee-add/EmployeeAddContainer";
import EmployeeUpdateContainer from "./components/employee/employee-update/EmployeeUpdateContainer";
import HelloComponent from "./components/hello/HelloComponent";
import PageNotFound from "./components/not-found/PageNotFound";


function App() {
    return (
        <div className={"app container"}>
            <NavBar/>
            <Switch>
                <Route exact path={"/"} render={()=><HelloComponent/>}/>
                <Route path={"/companies/create"} render={()=><CompanyAddContainer/>}/>
                <Route path={"/companies/update/:id?"} render={()=><CompanyUpdateContainer/>}/>
                <Route path={"/companies/tree"} render={()=><CompaniesTreeContainer/>}/>
                <Route path={"/companies"} render={() => <CompaniesListContainer/>}/>
                <Route path={"/employees/tree"} render={() => <EmployeesTreeContainer/>}/>
                <Route path={"/employees/create"} render={()=><EmployeeAddContainer/>}/>
                <Route path={"/employees/update/:id?"} render={()=><EmployeeUpdateContainer/>}/>
                <Route path={"/employees"} render={() => <EmployeesListContainer/>}/>
                <Route render={()=><PageNotFound/>}/>
            </Switch>
        </div>
    );
}

export default App;
