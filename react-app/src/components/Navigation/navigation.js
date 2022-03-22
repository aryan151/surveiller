import React from "react";
import { useEffect } from 'react'; 
import { useSelector, useDispatch } from "react-redux"; 
import { NavLink, Link } from "react-router-dom"; 
import LogoutButton from "../auth/LogoutButton";    
import { MdMenuOpen } from "react-icons/md";
import { FaSquare, FaPlus } from "react-icons/fa"; 
import { SiAsana } from "react-icons/si";   
import { RiHome6Line } from "react-icons/ri";  
import { MdOutlineChecklist } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdCases } from "react-icons/md"; 
import { getAllProjects } from "../../store/sidebar";  

import './sidebar.css' 

function Navigation ({show, toggle}) { 
	const dispatch = useDispatch() 

    const user = useSelector((state) => state?.session?.user);   
    const navToggle = show ? "NavShow" : "NavClose"; 

    useEffect(() => {
        dispatch(getAllProjects) 
    }, [dispatch])

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
						<RiHome6Line size="1.5em" /> <span id="sidebar-link-text">Home</span>  
					</div>
				</NavLink>  
                <NavLink to="/toDo" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdOutlineChecklist size="1.5em" /> <span id="sidebar-link-text">To Do</span> 
					</div>
				</NavLink> 
                <NavLink to="/workers" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<AiOutlineUsergroupAdd size="1.5em" /> <span id="sidebar-link-text">Employees</span> 
					</div>
				</NavLink> 
                <NavLink to="/inventory" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdCases size="1.5em" /> <span id="sidebar-link-text">Inventory</span>
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