import React from "react";
import {useState} from 'react';
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import NewProject from "./NewProject";
import { MdMenuOpen } from "react-icons/md";
import { FaSquare, FaPlus } from "react-icons/fa";
import { AiOutlineRightCircle } from "react-icons/ai";
import "./SideBar.css";
import { MdHome} from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";  
import { MdOutlineChecklist } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdCases } from "react-icons/md"; 
import { AiOutlineProject } from "react-icons/ai";
import { Switch } from "react-switch"; 
import {toggleTheme} from '../../store/theme'
import { AiOutlineDollarCircle } from "react-icons/ai";
import { SiBankofamerica } from "react-icons/si"
import { GiEuropeanFlag } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../../store/session";

const SideBar = ({ show, toggle, toggledark }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user); 
	const user_projects = user.projects;
	let sidebarClass = show ? "sidebar-open" : "sidebar-closed";  
	const theme = useSelector(state => state.theme); 
	const [currentTheme, setCurrentTheme] = useState(theme); 
	const onlyprojects = []
	const inventory = []
	const workers = [] 
	const toDo = []  

	function handleToggle() {
		dispatch(toggleTheme());
		setCurrentTheme(currentTheme === 'usa' ? 'eur' : 'usa');  
	  }


	const changearray = Object.entries(user_projects)
	for (const project in changearray) {
		if (changearray[project][1].project_type === 0) {
			onlyprojects.push(changearray[project][1].project_id)
		}   
		if (changearray[project][1].project_type === 1) {
			inventory.push(changearray[project][1].project_id)
		}   
		if (changearray[project][1].project_type === 2) {
			workers.push(changearray[project][1].project_id) 
		}   
		if (changearray[project][1].project_type === 3) { 
			toDo.push(changearray[project][1].project_id)
		}   
	} 

	
		const onLogout = async (e) => {
		  await dispatch(logout());
		}; 

	return (
		<nav className={sidebarClass}> 
			 
			<div className="sidebar-header">
				<p id="sidebar-header-logo">{theme === 'usa' ? 'Navigation' : 'La Navigation'}</p> 
				<div id="sidebar-toggle-button" onClick={toggle}>  
					<MdMenuOpen size="2em" />
				</div>
			</div>
			<div className="sidebar-links-section"> 
				<NavLink to="/" exact={true} activeClassName="sidebar-active">  
					<div id="sidebar-link">
						<RiHome6Line size="1.5em" className={'sidebarlogotopleft'} /> <span id="sidebar-link-text">{theme === 'usa' ? 'Home' : 'Domicile'}</span> 
					</div>
				</NavLink>
				<NavLink to={`/projects/${toDo[0]}`} exact={true} activeClassName="sidebar-active"> 
					<div id="sidebar-link">
						<MdOutlineChecklist size="1.5em"  className={'sidebarlogotopleft'}/> <span id="sidebar-link-text">{theme === 'usa' ? 'To Do' : 'Liste'}</span> 
					</div>
				</NavLink> 
                <NavLink to={`/projects/${inventory[0]}`} exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdCases size="1.5em"  className={'sidebarlogotopleft'}/> <span id="sidebar-link-text">{theme === 'usa' ? 'Inventory' : 'Inventaire'}</span>  
					</div>
				</NavLink> 
                <NavLink to={`/projects/${workers[0]}`} exact={true} activeClassName="sidebar-active"> 
					<div id="sidebar-link">
						<AiOutlineUsergroupAdd size="1.5em"    className={'sidebarlogotopleft'} /> <span id="sidebar-link-text">{theme === 'usa' ? 'Employees' : 'Employés'}</span> 
					</div>  
				</NavLink> 
			</div>
			<div className="sidebar-projects-section">
				<div id="sidebar-projects-title">
				{theme === 'usa' ? 'My Projects' : 'Mes Projets'} <div id="add-project-button"> <NewProject location="sidebar" /></div>
				</div>
				{onlyprojects
					? onlyprojects.map((key) => (
						
							<NavLink
								activeClassName="sidebar-active"
								key={key}
								to={`/projects/${key}`}
							> 
								<div id="sidebar-project-link">
									<div id="sidebar-project-color">
										<AiOutlineRightCircle
											size="1.3em"
											color="red"
										/>
									</div>
									<div id="sidebar-project-link-title">
										{user_projects[key].project_title}
									</div>
								</div>
							</NavLink>
					  ))
					: null}
			</div>
			<div className="sidebar-links-section">
				<div activeClassName="sidebar-active"> 
					<div id="sidebar-link"   onClick={handleToggle}> 
					{theme === 'usa' ? <> <GiEuropeanFlag size="1.5em"  className={'sidebarlogotopleft'} /> <span id="sidebar-link-text">Français</span> </> : 
					<><SiBankofamerica size="1.5em"  className={'sidebarlogotopleft'} /> <span id="sidebar-link-text">English</span> </> } 
					</div>  
				</div>
				<div activeClassName="sidebar-active"> 
					<div id="sidebar-link"  onClick={onLogout}>  
						<IoLogOutOutline size="1.5em"  className={'sidebarlogotopleft'} /> <span id="sidebar-link-text">{theme === 'usa' ? 'Logout' : 'Déconnexion'}  </span> 
					</div> 
				</div>
			</div> 
		</nav>  
	);
};

export default SideBar;
