import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { MdMenu, MdExpandMore, MdModeEdit } from "react-icons/md";  
import { AiTwotoneDelete, AiOutlineProject } from "react-icons/ai"; 
import './topNav.css'
import Modal from '../Modal/modal' 
import { authenticate } from "../../store/session";
import { saveProject, deleteProject, getProject} from "../../store/project"; 

function TopNav ({show, toggle, content, project}) {  


	const history = useHistory();
    const dispatch = useDispatch();
    const didMount = useRef(false);
	const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [saveState, setSaveState] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
	const [headerStyle, setHeaderStyle] = useState("topNavDefault");  
    const toggleButtonClassName = show  
    ? "topbar-expand-sidebar-hidden"
    : "topbar-expand-sidebar";  

	useEffect(() => {if (project) {
        setProjectTitle(project.title)
        setProjectDescription(project.description)
    }}, [])

	const changeTopBarStyle = (event) => {    
		const root = document.getElementsByClassName("rootwrapper")[0];      
 
		if (root.scrollY > 0) {
     
			setHeaderStyle("topNavDefaultLong"); 
		} else {
			setHeaderStyle("topNavDefault");  
		}
	};

	const executeDelete = async(e) => {
        e.preventDefault();
        await dispatch(deleteProject(project.id));
        await dispatch(authenticate()) 
        return history.push('/home')

    }

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (didMount.current && projectTitle !== "") {
				const payload = {
					projectId: project.id,
					title: projectTitle,
					description: projectDescription,
				};

				await dispatch(saveProject(payload));
				setSaveState("All changes saved");
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
					title={`Delete the "${project.title}" project?`}
					onClose={() => setShowDeleteModal(false)}
					show={showDeleteModal}
                    height={200}
				>
					<div style={{ padding: "20px 20px" }}>
						<p>
							This will delete the project, along with any associated tasks.
						</p>
					</div>
					<div id="modal-button-container">
						<button id="modal-button-cancel" onClick={() => setShowDeleteModal(false)}>
							Cancel
						</button>
						<button id="modal-button-delete" onClick={executeDelete}>
							Delete
						</button>
					</div>
				</Modal>
 
				<div className={`openboard-topbar-project`}>
					<div className={toggleButtonClassName}>
						<div id="topbar-toggle-button-div" onClick={toggle}>
							<MdMenu size="1.5em"/>
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
									<MdModeEdit /> <span>Edit project details</span>
								</div> 
								<div
									id="top-bar-project-detail-single-option"
									onClick={() => setShowDeleteModal(true)}
								>
									<AiTwotoneDelete/><span style={{ color: "#FF0000" }}>Delete project</span> 
								</div>
							</div>
						) : null}
					</div>
				</div>


			</>
		);
	 
}

export default TopNav         