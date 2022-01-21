import { Route, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react"; 
import TopNav from "../Navigation/topNav"; 
import Home from "../Home/home"
import Projects from "../Projects/projects"
import Employees from "../Employees/employees"
import ToDo from "../ToDo/Todo"
import './main.css'  

function MainContent () {
    return (
        <div>
            <p> Main</p>
        </div>
    )
}

export default MainContent    