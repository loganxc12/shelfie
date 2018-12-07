import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
    
    return (
        <div className="header">
            <h1>SHELFIE</h1>
            <div className="nav-links-container">
                <NavLink className="nav-link" to="/">Dashboard</NavLink>
                <NavLink className="nav-link" to="/add">Add Inventory</NavLink>
            </div>
        </div>
    )
}