import React from "react";
import { useSelector } from "react-redux"; 
import { NavLink, Link } from "react-router-dom"; 
import LogoutButton from "../auth/LogoutButton";    
import { MdMenuOpen } from "react-icons/md";
import { FaSquare, FaPlus } from "react-icons/fa"; 
import { SiAsana } from "react-icons/si";   
import { MdHome} from "react-icons/md";  
import './sidebar.css' 

function Navigation ({show, toggle}) { 
    const user = useSelector((state) => state.session.user);   
    const navToggle = show ? "NavShow" : "NavClose"; 
    return (
		<nav className={navToggle}>  
			<div className="Navtop"> 
                <SiAsana className="NavtopLogo"/>  
				<div className="navToggleBtn" onClick={toggle}>
					<MdMenuOpen size="2em" />
				</div> 
			</div>
			<div className="sidebar-links-section">
				<NavLink to="/home" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdHome size="1.5em" /> <span id="sidebar-link-text">Home</span>
					</div>
				</NavLink>  
                <NavLink to="/toDo" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdHome size="1.5em" /> <span id="sidebar-link-text">To Do</span>
					</div>
				</NavLink> 
                <NavLink to="/workers" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdHome size="1.5em" /> <span id="sidebar-link-text">Employees</span>
					</div>
				</NavLink> 
                <NavLink to="/inventory" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdHome size="1.5em" /> <span id="sidebar-link-text">Inventory</span>
					</div> 
				</NavLink> 
			</div>
			<div className="sidebar-projects-section">
				<div id="sidebar-projects-title">
					My Projects
				</div> 
			</div>
			<div className="sidebar-log-out">
				<LogoutButton /> 
			</div> 
		</nav>
	);  
}

export default Navigation      