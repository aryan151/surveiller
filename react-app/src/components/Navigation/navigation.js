import React from "react";
import { useSelector } from "react-redux"; 
import { NavLink, Link } from "react-router-dom"; 
import LogoutButton from "../auth/LogoutButton";    

function Navigation ({show, toggle}) { 
    const user = useSelector((state) => state.session.user);   
    return (
        <div>
            <p> Sidebar {user.id}</p> 
        </div>
    )
}

export default Navigation      