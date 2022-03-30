import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { MdMenu, MdExpandMore, MdModeEdit } from "react-icons/md"; 
import './topNav.css'
function TopNav ({show, toggle, content, project}) {  

	const [headerStyle, setHeaderStyle] = useState("topNavDefault");  
    const toggleButtonClassName = show  
    ? "topbar-expand-sidebar-hidden"
    : "topbar-expand-sidebar";  

	const changeTopBarStyle = (event) => {    
		const root = document.getElementsByClassName("rootwrapper")[0];      
 
		if (root.scrollY > 0) {
     
			setHeaderStyle("topNavDefaultLong"); 
		} else {
			setHeaderStyle("topNavDefault");  
		}
	};

    	if (content === "home") {  
		return (
			<div className={`defaultTopNav ${content === "home" ? headerStyle : null}`} >
				<div className={toggleButtonClassName}>
					<div className="toggleTopNav" onClick={toggle}>
						<MdMenu size="1.5em" />
					</div>
				</div>
				<h1 className="top-bar-title">Home</h1>   
			</div>
		);
	} 

    if (content === "toDo") {  
		return (
			<div className={`defaultTopNav ${content === "toDo" ? headerStyle : null}`} >
				<div className={toggleButtonClassName}>
                <div className="toggleTopNav" onClick={toggle}>
						<MdMenu size="1.5em" />
					</div>
				</div>
				<h1 className="top-bar-title">To Do</h1>  
			</div>
		);
	} 

    if (content === "workers") {
		return (
			<div className={`defaultTopNav ${content === "workers" ? headerStyle : null}`} >
				<div className={toggleButtonClassName}>
                <div className="toggleTopNav" onClick={toggle}>
						<MdMenu size="1.5em" />
					</div>
				</div>
				<h1 className="top-bar-title"> Employees</h1>   
			</div>
		);
	} 

    if (content === "inventory") {
		return (
			<div className={`defaultTopNav ${content === "inventory" ? headerStyle : null}`} >
				<div className={toggleButtonClassName}>
                <div className="toggleTopNav" onClick={toggle}>       
						<MdMenu size="1.5em" />
					</div>
				</div>  
				<h1 className="top-bar-title"> Inventory</h1>  
			</div>
		);
	} 

    if (content === "project") {
		return (
			<div className={`defaultTopNav ${content === "project" ? headerStyle : null}`} >
				<div className={toggleButtonClassName}>
                <div className="toggleTopNav" onClick={toggle}> 
						<MdMenu size="1.5em" />
					</div>
				</div>
				<h1 className="top-bar-title"> {project.title} </h1> 
			</div>
		);
	} 
}

export default TopNav         