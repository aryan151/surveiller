import "./Task.css";
import Container from "./Container";
import {BsCheckCircle, BsFillCheckCircleFill} from 'react-icons/bs'
import { useTaskDetail } from "../../context/TaskDetailContext";
import { Draggable } from "react-beautiful-dnd";
import { toggleCompleteTask, getProject} from "../../store/project";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState , useEffect} from "react";
const Task = ({task, index, projectId, projecttype}) => {
    const dispatch = useDispatch();
    const taskRef = useRef();
    const [active, setActive] = useState(false);
	const theme = useSelector(state => state.theme); 
    const {setShowTaskDetail, currentTask, setCurrentTask} = useTaskDetail();
	const [prio, setPrio] = useState(task.priority)

	

        useEffect(() => {
            if(currentTask.id === task.id){
                return setActive(true)
            }
            return setActive(false)
        },[currentTask])
        useEffect(() => {
            if (currentTask.id === task.id && currentTask.section_id !== task.section_id){
                setCurrentTask(task);
            }
            if (currentTask.id === task.id && currentTask.completed !== task.completed){
                setCurrentTask(task);
            }
        }, [task])
    const openTaskDetails = (e) => {
        e.stopPropagation();
        setShowTaskDetail(true);
        setCurrentTask(task);
        setTimeout(() => {
            e.target.scrollIntoView({behavior:'smooth'});

        }, 200)

    }

    const toggleCompleted = async(e) => {
        e.stopPropagation();
        e.preventDefault()
        const res = await dispatch(toggleCompleteTask(task.id))
        if (res){
            await dispatch(getProject(projectId))
        }
    }  

	return (
		<Draggable draggableId={task.id.toString()} index={index}>
			{(provided, snapshot) => (
				<Container>
					<div
						onClick={openTaskDetails}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={`${active ? "task-card-active" : "task-card"} ${
							snapshot.isDragging ? "task-dragging" : "task-drag-null"
						} ${task.completed ? "task-completed" : null}`}
					>
						<div style={{height:"100%"}}ref={taskRef}>
							<div className="task-card-title">
								<div
									id={`${task.completed ? "task-card-check-mark-completed" : "task-card-check-mark"}`}
									onClick={toggleCompleted}
								>
									{task.completed ? (
										<BsFillCheckCircleFill />
									) : (
										<BsCheckCircle />
									)}
								</div>
								<h3>{task.title}</h3>
							</div>
							<div className="task-card-indicators">
								{task.priority !== "null" ? (
									<div
										className="task-card-indicator" 
										id={`priority-${task.priority}`}
									>
										{(projecttype === 0  || projecttype === 3) && task.priority === 'Low' ? <>{theme === 'usa' ? 'Low' : 'Faible'} </> : null }
										{(projecttype === 0  || projecttype === 3) && task.priority === 'Medium' ? <>{theme === 'usa' ? 'Medium' : 'Moyen'} </> : null }
										{(projecttype === 0  || projecttype === 3) && task.priority === 'High' ? <>{theme === 'usa' ? 'High' : 'Important'} </> : null }
										{(projecttype === 1) && task.priority === 'Low' ? <>{theme === 'usa' ? 'Livestock' : 'Bétail'} </> : null }
										{(projecttype === 1) && task.priority === 'Medium' ? <>{theme === 'usa' ? 'Packaged' : 'Emballé'} </> : null }
										{(projecttype === 1) && task.priority === 'High' ? <>{theme === 'usa' ? 'Cold storage' : 'Chambre froide'} </> : null }
										{(projecttype === 2) && task.priority === 'Low' ? <>{theme === 'usa' ? 'Very good' : 'très bien'} </> : null }
										{(projecttype === 2) && task.priority === 'Medium' ? <>{theme === 'usa' ? 'Ok' : 'bien'} </> : null }
										{(projecttype === 2) && task.priority === 'High' ? <>{theme === 'usa' ? 'Needs Help' : `A besoin d'aide`} </> : null }
									</div> 
								) : null}
								{task.status !== "null" ? (
									<div className={`task-card-indicator status-${task.status}`}>   

										{(projecttype === 0  || projecttype === 3) && task.status === 'On Track' ? <>{theme === 'usa' ? 'On Track' : 'Sur la bonne voie'} </> : null }
										{(projecttype === 0  || projecttype === 3) && task.status === 'At Risk' ? <>{theme === 'usa' ? 'At Risk' : 'à risque'} </> : null }
										{(projecttype === 0  || projecttype === 3) && task.status === 'Off Track' ? <>{theme === 'usa' ? 'Off Track' : 'Hors route'} </> : null }
										{(projecttype === 1) && task.priority === 'Low' ? <>{theme === 'usa' ? 'Low' : 'limité'} </> : null }
										{(projecttype === 1) && task.priority === 'Medium' ? <>{theme === 'usa' ? 'Normal' : 'Normal'} </> : null }
										{(projecttype === 1) && task.priority === 'High' ? <>{theme === 'usa' ? 'Excess' : `l' excès`} </> : null }
										{(projecttype === 2) && task.priority === 'Low' ? <>{theme === 'usa' ? 'Full Time' : 'à plein temps'} </> : null }
										{(projecttype === 2) && task.priority === 'Medium' ? <>{theme === 'usa' ? 'Part Time' : 'à temps partiel'} </> : null }
										{(projecttype === 2) && task.priority === 'High' ? <>{theme === 'usa' ? 'Contract' : 'Contracter'} </> : null }
									
									</div>
								) : null} 
							</div>
						</div>
					</div>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
