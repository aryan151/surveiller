import "./TopBar.css";
import { MdMenu, MdExpandMore, MdModeEdit } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import { authenticate } from "../../store/session";
import { useHistory } from "react-router";
import {FaProjectDiagram} from 'react-icons/fa'
import { saveProject, deleteProject, getProject} from "../../store/project";
import { AiOutlineProject } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";  
import { MdOutlineChecklist } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdCases } from "react-icons/md";  
const TopBar = ({ show, toggle, page, project }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const didMount = useRef(false);
	const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [saveState, setSaveState] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
	const theme = useSelector(state => state.theme); 
    useEffect(() => {if (project) {
        setProjectTitle(project.title) 
        setProjectDescription(project.description) 
    }}, [])

    const executeDelete = async(e) => {
        e.preventDefault();
        await dispatch(deleteProject(project.id)); 
        await dispatch(authenticate())
        return history.push('/')

    }

	const toggleButtonClassName = show
		? "topbar-expand-sidebar-hidden"
		: "topbar-expand-sidebar";

	const [headerStyle, setHeaderStyle] = useState("zs-topbar-home");
	const changeTopBarStyle = (event) => {
		const root = document.getElementsByClassName("zs-root-page")[0];

		if (root.scrollY > 0) {

			setHeaderStyle("zs-topbar-home-scroll");
		} else {
			setHeaderStyle("zs-topbar-home");
		}
	};


     useEffect(() => {
				const delayDebounceFn = setTimeout(async () => {
					if (didMount.current && projectTitle !== "") {
						const payload = {
                            projectId: project.id,
							title: projectTitle,
							description: projectDescription,
						};

						await dispatch(saveProject(payload));
						(theme === 'usa') ?setSaveState("All changes saved") : setSaveState('Toutes les modifications enregistrées');  
						await dispatch(authenticate());
						setTimeout(() => {
							setSaveState("");
						}, 1000);
					} else {
						didMount.current = true;
					}

				}, 500);

				return () => clearTimeout(delayDebounceFn);
			}, [projectTitle, projectDescription]);


	if (page === "home") {
		return (
			<div
				className={`zs-topbar ${page === "home" ? headerStyle : null}`}
			>
				<div className={toggleButtonClassName}> 
					<div id="topbar-toggle-button-div" onClick={toggle}>
						<MdMenu size="1.5em" />
					</div>
				</div>
				<h1 id="top-bar-title">{theme === 'usa' ? 'Home' : 'Domicile'}</h1>
			</div>
		);
	} 
	if (project.type === 1) {
		return (
			<div
				className={`zs-topbar-project`}
			>
								<div className={toggleButtonClassName}>
						<div id="topbar-toggle-button-div" onClick={toggle}>
							<MdMenu size="1.5em" />
						</div>
					</div>
					<div id="top-bar-project-icon-container">
						<div id='top-bar-project-icon'>
						<MdCases size="1.6em"/></div> 
						</div> 
					<h1 id="top-bar-title-project">{theme === 'usa' ? 'Inventory' : 'Inventaire'}</h1> 
			</div>
		);
	}

	if (project.type === 2) { 
		return (
			<div
				className={`zs-topbar-project`}
			>
								<div className={toggleButtonClassName}>
						<div id="topbar-toggle-button-div" onClick={toggle}>
							<MdMenu size="1.5em" />
						</div>
					</div>
					<div id="top-bar-project-icon-container">
						<div id='top-bar-project-icon'>
						<AiOutlineUsergroupAdd size="1.6em"/></div>
						</div> 
					<h1 id="top-bar-title-project">{theme === 'usa' ? 'Employees' : 'Employés'}</h1> 
			</div>
		);
	}

	if (project.type === 3) {
		return (
			<div
				className={`zs-topbar-project`}
			>
								<div className={toggleButtonClassName}>
						<div id="topbar-toggle-button-div" onClick={toggle}>
							<MdMenu size="1.5em" />
						</div>
					</div>
					<div id="top-bar-project-icon-container">
						<div id='top-bar-project-icon'>
						<MdOutlineChecklist size="1.6em"/></div>
						</div> 
					<h1 id="top-bar-title-project">{theme === 'usa' ? 'To Do' : 'Liste'}</h1>  
			</div>
		);
	}


	if (page === "single-project") {
		return (
			<>
				<Modal
					title="Project details"
					onClose={() => setShowProjectDetailsModal(false)}
					show={showProjectDetailsModal}
                    height={460}
				>
					<div id="modal-label">Name</div>
                    <div style={{padding:"0px 20px"}}>
					<input
						type="text"
						placeholder={project.title}
						value={projectTitle}
						onChange={(e) => setProjectTitle(e.target.value)}
					></input>
                    </div>
					<div id="modal-label">Description</div>
                    <div style={{padding:"20px 20px"}}>
					<textarea
						type="text"
						placeholder={project.description}
						value={projectDescription}
						onChange={(e) => setProjectDescription(e.target.value)}
					></textarea>
                    </div>
					<div style={{height:"50px", padding:"0px 20px"}}>{saveState}</div>
				</Modal>
				<Modal
					title={theme === 'usa' ? `Delete this project?` : 'Supprimer ce projet ?'} 
					onClose={() => setShowDeleteModal(false)}
					show={showDeleteModal}
                    height={200}
				>
					<div style={{ padding: "20px 20px" }}>  
						<p>
						{theme === 'usa' ? 'This will delete the project, along with any associated tasks.' : 'Cela supprimera le projet, ainsi que toutes les tâches associées.'}  
						</p>
					</div>
					<div id="modal-button-container">
						<button id="modal-button-cancel" onClick={() => setShowDeleteModal(false)}>
						{theme === 'usa' ? 'Cancel' : 'Annuler'} 
						</button>
						<button id="modal-button-delete" onClick={executeDelete}>
						{theme === 'usa' ? 'Delete' : 'Effacer'}  
						</button>
					</div>
				</Modal>
				<div className={`zs-topbar-project`}>
					<div className={toggleButtonClassName}>
						<div id="topbar-toggle-button-div" onClick={toggle}>
							<MdMenu size="1.5em" />
						</div>
					</div>
					<div id="top-bar-project-icon-container">
						<div id='top-bar-project-icon'>
						<AiOutlineProject size="1.6em"/></div>
						</div> 
					<h1 id="top-bar-title-project">{projectTitle}</h1>

					<div
						id={
							showProjectDetails
								? `top-bar-project-details-button-active`
								: `top-bar-project-details-button`
						}
						onClick={() => setShowProjectDetails(!showProjectDetails)}
					>
						<MdExpandMore size="1.7em" />
						{showProjectDetails ? (
							<div className="top-bar-project-details-options">
								<div
									id="top-bar-project-detail-single-option"
									onClick={() => setShowProjectDetailsModal(true)} 
								>
									<MdModeEdit /> <span>{theme === 'usa' ? 'Edit project details' : 'Modifier les détails'}</span>
								</div>  
								<div
									id="top-bar-project-detail-single-option"
									onClick={() => setShowDeleteModal(true)}
								>
									<TiDelete className='delettopdrop'/> <span style={{ color: "#FF0000" }}>{theme === 'usa' ? 'Delete project' : 'Supprimer le projet'}</span> 
								</div>
							</div>
						) : null}
					</div> 

				</div>
			</>
		);
	}

	return null;
};

export default TopBar;
