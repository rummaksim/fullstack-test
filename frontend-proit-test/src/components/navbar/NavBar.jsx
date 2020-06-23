import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./navbar.module.css";

const NavBar = () => {
    return (
        <div className={styles.navCustomStyle}>
            <ul className={`nav justify-content-center`}>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" exact strict to="/companies" activeClassName={styles.active}>Список организаций</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" exact strict to="/companies/tree" activeClassName={styles.active}>Дерево организаций</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" exact strict to="/employees" activeClassName={styles.active}>Список сотрудников</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark" exact strict to="/employees/tree" activeClassName={styles.active}>Дерево сотрудников</NavLink>
                </li>
            </ul>
        </div>
    )
};

export default NavBar;