import { Route, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";   
import TopNav from "../Navigation/topNav"; 
import Home from "../Home/home"
import Inventory from "../inventory/inventory"
import Projects from "../Projects/projects"
import Employees from "../Employees/employees"
import ToDo from "../ToDo/Todo"  
import './main.css'    

function MainContent ({show, toggle, content}) {

    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);   


    useEffect(async() => {
        setLoaded(false);
        if (content === 'home') {
            //dispatch one project   
            setLoaded(true);
        }
        if (content === 'toDo') {
            //dispatch one project   
            setLoaded(true);
        }
        if (content === 'workers') {
            //dispatch one project 
            setLoaded(true);
        }
        if (content === 'inventory') {
            //dispatch one project 
            setLoaded(true);
        }
        else if(content === 'project'){
            //dispatch one project 
            setLoaded(true)
        } 
    }, [dispatch, content]) 


    if (!loaded){  
        return null;
    }
	return (
		<div
			className={`rootwrapper ${
				content === "home" ? "mainBackground" : null 
			}`}
		>
			<Route path="/home" exact={true}> 
                <TopNav show={show} toggle={toggle} content={content} title={"Home"} />  
				<Home />
			</Route>
            <Route path="/toDo" exact={true}>  
                <TopNav show={show} toggle={toggle} content={content} title={"toDo"} /> 
				<ToDo /> 
			</Route>
            <Route path="/workers" exact={true}> 
                <TopNav show={show} toggle={toggle} content={content} title={"workers"} /> 
				<Employees />
			</Route>
            <Route path="/inventory" exact={true}> 
                <TopNav show={show} toggle={toggle} content={content} title={"inventory"} /> 
				<Inventory />  
			</Route>
			<Route path="/projects/:projectId">
                <TopNav show={show} toggle={toggle} content={content}/> 
                <Projects /> 
            </Route>
		</div>
	);
}

export default MainContent    