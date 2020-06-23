import React from "react";

const CompanyAddUpdate = (props) => {
    let options = props.headCompanies.map(company=>(
        <option key={company.id} value={company.id}>{company.name}</option>
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
                        <label htmlFor="exampleFormControlInput1">Название компании:</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                               placeholder="Название компании" value={props.companyName} onChange={e=>props.onCompanyNameChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Головная компания:</label>
                        <select className="form-control" value={props.headCompanyId}
                                id="exampleFormControlSelect1" onChange={e=>props.onHeadCompanySelectChange(e)}>
                            <option key={-1} value={""}>{""}</option>
                            {options}
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

export default CompanyAddUpdate;