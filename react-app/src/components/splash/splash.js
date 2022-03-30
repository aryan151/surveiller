import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";  
import { useHistory } from "react-router-dom";
import './splash.css'
import firstimg from './sp1.jpeg'
import secimg from './sp2.jpeg'    


function Splash () {  
    const history = useHistory();
	const dispatch = useDispatch();


	const [headerStyle, setHeaderStyle] = useState("splash-header-container");

	const changeHeaderStyle = (event) => {
		if (window.scrollY > 3) {
			setHeaderStyle("splash-header-container-scroll");
		} else {
			setHeaderStyle("splash-header-container");
		}
	};


	useEffect(() => {
		window.addEventListener("scroll", changeHeaderStyle);
		return () => {
			window.removeEventListener("scroll", changeHeaderStyle);
		};
	}, []);

	const loginDemo = async () => {
		await dispatch(sessionActions.login("demo@aa.io", "password"));
        history.push('/home')
	};

	return (
		<div class="splash-main">
			<div class="splash-background-container">
				<div class={headerStyle}>
					<header class="splash-header">
						<div className="splash-header-logo">
							<p>Z.S</p>
						</div>
						
						<div class="splash-action-links">
							<p id="splash-log-in" onClick={() => history.push("/login")}>
								Log In
							</p>
							<p id="splash-log-in" onClick={loginDemo}>
								Demo
							</p>
							<button
								id="splash-sign-up-top"
								onClick={() => history.push("/sign-up")}
							>
								Get Started
							</button>
						</div>
					</header>
				</div>
				<div class="splash-section-1">
					<div class="splash-section-1-column-1">
						<h1>Work on big ideas, without the busywork.</h1>
						<h4 style={{ maxWidth: 420 }}>
							From small projects to company wide tracking, ZS 
							<i> organizes work</i> so teams know what to do, why it matters, 
							and how to get it done. 
						</h4>
						<div style={{ display: "flex" }}>
							<button
								id="splash-sign-up-bottom"
								onClick={() => history.push("/sign-up")}
							>
								Get Started
							</button>
							<button id="splash-demo-bottom" onClick={loginDemo}>
								Demo
							</button>
						</div>
					</div>
					<div class="splash-section-1-column-2">
						<div class="splash-scenes">
							<div id="splash-scene-one">
								<img src={firstimg} width="100%"  />
							</div>
							<div id="splash-scene-two">
								<img src={secimg} width="100%"  />
							</div> 
						</div>
						<span id="splash-floating-span-1">
							<i
								className="far fa-check-circle"
								style={{ paddingRight: 10, color: "#f06a6a" }}
							></i>{" "}
							Track Inventory
						</span>
						<span id="splash-floating-span-2">
							<i
								className="far fa-check-circle"
								style={{ paddingRight: 10, color: "#f06a6a" }}
							></i>{" "}
							Manage Small Projects
						</span>
					</div>
				</div>
			</div> 
		</div>
	);
};


export default Splash  