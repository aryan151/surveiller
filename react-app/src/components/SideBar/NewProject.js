import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { authenticate } from "../../store/session";
import { BiAddToQueue } from "react-icons/bi";
import Modal from "../Modal";
import { createProject } from "../../store/project";
const NewProject = ({ location }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const theme = useSelector(state => state.theme);  
	const [showNewProjectModal, setShowNewProjectModal] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const submitProject = async (e) => {
		e.preventDefault();
		const payload = {
			projectTitle: title,
			projectDescription: description,
		};
		const res = await dispatch(createProject(payload));
		if (res) {
			setShowNewProjectModal(false);
			await dispatch(authenticate());
			return history.push(`/projects/${res.id}`);
		}
	};
	return (
		<>
			<Modal
				title={theme === 'usa' ? "Create new project" : 'Créer un nouveau projet'}  
				onClose={() => setShowNewProjectModal(false)}
				show={showNewProjectModal}
			> 
				<div id="modal-label">{theme === 'usa' ? 'Project Title' : 'Titre du projet'}</div>
				<form onSubmit={submitProject}> 
					<div style={{ padding: "0px 20px" }}>
						<input
							type="text"
							required
							placeholder={theme === 'usa' ? "Enter your new project title..." : 'Entrez votre nouveau titre de projet...'}
							value={title} 
							onChange={(e) => setTitle(e.target.value)}
						></input>
					</div>
					<div id="modal-label">{theme === 'usa' ? 'Project Description' : 'Description du projet'}</div>
					<div style={{ padding: "0px 20px" }}> 
						<textarea
							type="text" 
							placeholder={theme === 'usa' ? "Give more details about this project..." : 'Donnez plus de détails sur ce projet...							'}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div id="modal-button-container">
						<button id="modal-button" type="submit"> 
						{theme === 'usa' ? 'Create' : 'Créer'}
						</button>
					</div>
				</form>
			</Modal>
			{location === "sidebar" ? (
				<div
					id="sidebar-add-new-project-button"
					onClick={() => setShowNewProjectModal(true)}
				>
					<FaPlus />
				</div>
			) : (
				<div
					className="homepage-add-new-project"
					id="project-item"
					onClick={() => setShowNewProjectModal(true)}
				>
					<div id="top-bar-project-icon-container">
						<div id="top-bar-project-icon">
							<BiAddToQueue size="1.6em" />
						</div>
					</div>
					<h2>{theme === 'usa' ? 'Add a new project' : 'Ajouter un nouveau projet'}</h2>
				</div>
			)}  
		</>
	);
};

export default NewProject;
