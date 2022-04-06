import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Priorities from "../Priorities";
import { useHistory } from "react-router";
import {IoIosAddCircle} from "react-icons/io"
import { saveNotepad, getNotepad } from "../../store/session";
import { MdLock } from "react-icons/md";
import NewProject from "../SideBar/NewProject";
import { AiOutlineProject } from "react-icons/ai"; 
import { BiAddToQueue } from "react-icons/bi";
const HomePage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.session.user);
	const theme = useSelector(state => state.theme); 
	const projects = user.projects;
	const [content, setContent] = useState("");
	const didMount = useRef(false);
	const [saveState, setSaveState] = useState("");


	const onlyprojects = [] 
	const changearray = Object.entries(projects)
	for (const project in changearray) {
		if (changearray[project][1].project_type === 0) {
			onlyprojects.push(changearray[project][1].project_id)
		}   
	} 


	const currentDate = new Date();
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const FRmonths = [
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Aout",
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre",
	];
	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const FRweekDays = [
		"Dimanche",
		"Lundi",
		"Mardi",
		"Mercredi",
		"Jeudi",
		"Vendredi",
		"Samedi",
	];
	const currentDay = weekDays[currentDate.getDay()];
	const currentMonth = months[currentDate.getMonth()];
	const currentDayFR = FRweekDays[currentDate.getDay()];  
	const currentMonthFR = FRmonths[currentDate.getMonth()];
	const currentNumberDay = currentDate.getDate();

	const updateContent = (e) => {
		(theme === 'usa') ?setSaveState("Saving...") : setSaveState(`l' enregistrement`);
		setContent(e.target.value);
	};
	useEffect(async () => {
		const newNotepad = await dispatch(getNotepad());
		setContent(newNotepad.content);
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (didMount.current) {
				const payload = {
					userId: user.id,
					notepad: content, 
				};


				await dispatch(saveNotepad(payload));
				(theme === 'usa') ?setSaveState("All changes saved") : setSaveState('Toutes les modifications enregistrées'); 
				setTimeout(() => {
					setSaveState("");
				}, 1000);
			} else {
				didMount.current = true;
			}
		}, 1000); 
		return () => clearTimeout(delayDebounceFn);
	}, [content]);
	return (
		<div className="homepage-main"> 
			<div className="homepage-content"> 
				<h5 id="homepage-date">{theme === 'usa' ? currentDay : currentDayFR}, {theme === 'usa' ? currentMonth : currentMonthFR} {currentNumberDay} </h5>
				<h2 id="homepage-greeting">{theme === 'usa' ? 'Welcome,' : 'Bienvenue, '} {user.fullname}</h2>
				<div className="homepage-content-widgets">
					<div className="homepage-content-widgets-sort">
						<Priorities />
						<div className="homepage-widget-half">
							<div className="homepage-widget-content">
							<h2 id="homepage-notepad-widget-title">{theme === 'usa' ? 'Projects' : 'Projets'}</h2> 
								<div id="homepage-user-projects">

										<NewProject />

									{onlyprojects
										? onlyprojects.map((key) => (
												<div
													key={key}
													id="project-item"
													onClick={() =>
														history.push(
															`/projects/${key}`
														)
													}
												>
													<div id="top-bar-project-icon-container">
														<div id="top-bar-project-icon">
															<AiOutlineProject size="1.6em" /> 
														</div>
													</div>
													<h2>{projects[key].project_title}</h2>
												</div>
										  ))
										: null}
								</div>
								
							</div>
						</div>
						<div className="homepage-widget-full">
							<div className="homepage-widget-content">
							<h2 id="homepage-notepad-widget-title">
							{theme === 'usa' ? 'Private Notepad' : 'Bloc-notes Privé'}
									<MdLock color="#6D6E6F" />
								</h2>
								<div className="homepage-notepad-widget-content">
									<textarea
										placeholder={theme === 'usa' ? "Jot down a quick note or add a link to an important resource." : 'Notez une note rapide ou ajoutez un lien vers une ressource importante.'}
										required
										value={content}
										onChange={updateContent}
									></textarea>
								</div>
								<div className="homepage-notepad-widget-status">
									{saveState}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
