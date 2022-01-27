import {React, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom"; 
import LogoutButton from "../auth/LogoutButton";    
import { MdMenuOpen } from "react-icons/md";
import { FaSquare, FaPlus } from "react-icons/fa"; 
import { SiAsana } from "react-icons/si";   
import { RiHome6Line } from "react-icons/ri";
import { MdOutlineChecklist } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdCases } from "react-icons/md";
import {toggleTheme} from "../../store/theme"
import { RiMoonFill } from "react-icons/ri";
import {FiSun} from "react-icons/fi";


import './sidebar.css' 

function Navigation ({show, toggle}) { 
	const dispatch = useDispatch(); 
    const user = useSelector((state) => state.session.user);   
	const theme = useSelector(state => state.theme); 
    const navToggle = show ? "NavShow" : "NavClose"; 

	const [currentTheme, setCurrentTheme] = useState(theme);

	function toggleLang() {
		dispatch(toggleTheme());
		setCurrentTheme(currentTheme === 'fre' ? 'eng' : 'fre');   
	}

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
						<RiHome6Line size="1.5em" /> <span id="sidebar-link-text">{theme === 'eng' ? 'Home' : 'Domicile'}</span>  
					</div>
				</NavLink>  
                <NavLink to="/toDo" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdOutlineChecklist size="1.5em" /> <span id="sidebar-link-text">{theme === 'eng' ? 'To Do' : 'Liste'}</span> 
					</div>
				</NavLink> 
                <NavLink to="/workers" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<AiOutlineUsergroupAdd size="1.5em" /> <span id="sidebar-link-text">{theme === 'eng' ? 'Employees' : 'Des Employés'}</span> 
					</div>
				</NavLink> 
                <NavLink to="/inventory" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdCases size="1.5em" /> <span id="sidebar-link-text">{theme === 'eng' ? 'Inventory' : 'Inventaire'}</span>
					</div>  
				</NavLink> 
			</div>
			<div className="sidebar-projects-section">
				<div id="sidebar-projects-title">
				{theme === 'eng' ? "All Projects" : "Tous Les Projets"} 
				</div> 
			</div>
			<div className="toggle-theme-button" onClick={toggleLang}> 
                  {theme === 'fre' ? <RiMoonFill className='dark-toggle'/> : <FiSun className='light-toggle'/>} 
				  {theme}
                </div>
			<div className="sidebar-log-out">  
				<LogoutButton /> 
			</div> 
		</nav>
	);  
}

export default Navigation      