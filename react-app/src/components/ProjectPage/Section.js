import "./Section.css";
import TaskList from "./TaskList"
import Task from "./Task";
import { FaPlus, FaEllipsisH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProject, addTask } from "../../store/project";
import { useTaskDetail } from "../../context/TaskDetailContext";
import { Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
const Section = ({section, tasks, projectId, projecttype}) => {
    const dispatch = useDispatch();
	const theme = useSelector(state => state.theme); 
    const {setShowTaskDetail, setCurrentTask} = useTaskDetail();
    const [newTask, setNewTask] = useState(false);
    const addTaskEnd = async(e) => {
        const newTask = await dispatch(addTask(section.id,'end'));
        await dispatch(getProject(projectId));  
        setCurrentTask(newTask)
        setShowTaskDetail(true)
        setTimeout(() => {
            e.target.scrollIntoView({ behavior: "smooth" });
        }, 200)
    }
	return (
		<div className="board-section">
			<div className="board-section-title"> 
				{section.title === 'Backlog' && theme === 'usa' ?<h3>Backlog</h3>  : null } 
				{section.title === 'Backlog' && theme === 'eur' ?<h3>L' arriéré</h3>   : null }  
				{section.title === 'Open' && theme === 'usa' ?<h3>Open</h3>  : null } 
				{section.title === 'Open' && theme === 'eur' ?<h3>Ouvrir</h3>   : null }    
				{section.title === 'In Progress' && theme === 'usa' ?<h3>In Progress</h3>  : null } 
				{section.title === 'In Progress' && theme === 'eur' ?<h3>En cours</h3>   : null }    
				{section.title === 'Complete' && theme === 'usa' ?<h3>Complete</h3>  : null }  
				{section.title === 'Complete' && theme === 'eur' ?<h3>Compléter</h3>   : null }      
				{section.title === 'Canceled' && theme === 'usa' ?<h3>Canceled</h3>  : null }  
				{section.title === 'Canceled' && theme === 'eur' ?<h3>Annulé</h3>   : null }  
				{section.title === 'On Shelf' && theme === 'usa' ?<h3>On Shelf</h3>  : null }  
				{section.title === 'On Shelf' && theme === 'eur' ?<h3>Sur étagère</h3>   : null }  
				{section.title === 'In Transit' && theme === 'usa' ?<h3>In Transit</h3>  : null }  
				{section.title === 'In Transit' && theme === 'eur' ?<h3>En Transit</h3>   : null }  
				{section.title === 'Production' && theme === 'usa' ?<h3>Production</h3>  : null }   
				{section.title === 'Production' && theme === 'eur' ?<h3>La Fabrication</h3>   : null }  
				{section.title === 'Broken' && theme === 'usa' ?<h3>Broken</h3>  : null }  
				{section.title === 'Broken' && theme === 'eur' ?<h3>Cassé</h3>   : null }      
				{section.title === 'Available' && theme === 'usa' ?<h3>Available</h3>  : null }  
				{section.title === 'Available' && theme === 'eur' ?<h3>Utilisable</h3>   : null }   
				{section.title === 'UnActive' && theme === 'usa' ?<h3>UnActive</h3>  : null }  
				{section.title === 'UnActive' && theme === 'eur' ?<h3>Inactif</h3>   : null }   
				{section.title === 'Trainees' && theme === 'usa' ?<h3>Trainees</h3>  : null }  
				{section.title === 'Trainees' && theme === 'eur' ?<h3>Stagiaires</h3>   : null }   
				{section.title === 'Applicants' && theme === 'usa' ?<h3>Applicants</h3>  : null }  
				{section.title === 'Applicants' && theme === 'eur' ?<h3>Candidats</h3>   : null } 
				{section.title === 'Recently assigned' && theme === 'usa' ?<h3>Recently Assigned</h3>  : null }  
				{section.title === 'Recently assigned' && theme === 'eur' ?<h3>Récemment Affecté</h3>   : null }  
				{section.title === 'Do today' && theme === 'usa' ?<h3>Do Today</h3>  : null }   
				{section.title === 'Do today' && theme === 'eur' ?<h3>Faire Aujourd'hui</h3>   : null }  
				{section.title === 'Do next week' && theme === 'usa' ?<h3>Do next Week</h3>  : null }  
				{section.title === 'Do next week' && theme === 'eur' ?<h3>A faire la semaine prochaine</h3>   : null }  
				{section.title === 'Do later' && theme === 'usa' ?<h3>Do Later</h3>  : null }   
				{section.title === 'Do later' && theme === 'eur' ?<h3>Faire plus Tard</h3>   : null }  

				{/* <h3>{section.title === 'Open' && theme === 'usa' ? 'Open' : `Ouvrir`}</h3>   */} 
			</div>
			<Droppable droppableId={section.id.toString()}>
				{(provided) => (
					<TaskList innerRef={provided.innerRef} provided={provided}>  
						{Object.keys(tasks).map((key, index) => (
							<Task key={tasks[key].id} task={tasks[key]} index={index} projectId={projectId} projecttype={projecttype}/>
						))}   
						{provided.placeholder}
					{(projecttype === 0 ? 	<div onClick={(addTaskEnd)} id="section-add-task-button-lower">{theme === 'usa' ? ' + Add a Task' : ' + Ajouter une Tâche'}</div> : null)}
					{(projecttype === 1 ? 	<div onClick={(addTaskEnd)} id="section-add-task-button-lower">{theme === 'usa' ? ' + Add an Item' : ' + Ajouter un Article'}</div> : null)}
					{(projecttype === 2 ? 	<div onClick={(addTaskEnd)} id="section-add-task-button-lower">{theme === 'usa' ? ' + Add an Employee' : ' + Ajouter un Employé'}</div> : null)}  
					{(projecttype === 3 ? 	<div onClick={(addTaskEnd)} id="section-add-task-button-lower">{theme === 'usa' ? ' + Add a Task' : '+ Ajouter une tâche'}</div> : null)}
					</TaskList>
				)}
			</Droppable>
		</div>
	);
};

export default Section;
