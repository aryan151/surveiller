import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Splash from './components/splash/splash' 
import Navigation from './components/Navigation/navigation';    
import MainContent from "./components/Maincontent/main";
function App() { 
  const sessionUser = useSelector((state) => state.session.user); 
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false); 
  const [showSidebar, setShowSidebar] = useState(); 

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
		localStorage.setItem('sidebar', !showSidebar)
	}





	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			if (!localStorage.getItem("sidebar")) {
				localStorage.setItem("sidebar", true);
				setShowSidebar(true);
			} else {
				if (localStorage.getItem("sidebar") === 'false'){
					setShowSidebar(false);
				} else {
					setShowSidebar(true);
				}
			}

				setLoaded(true);


		})();
	}, [dispatch]);
 

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>				
        <Route path="/" exact={true}>
          <NavBar />
          <Splash/> 
				</Route>
        <Route path='/login' exact={true}>  
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>  
          <SignUpForm />
        </Route>  

				<ProtectedRoute path="/home" exact={true}>    
					<div className="asanawrapper">
						<Navigation show={showSidebar} toggle={toggleSidebar} /> 
						<MainContent show={showSidebar} toggle={toggleSidebar} content="home" />       
					</div>
				</ProtectedRoute>
				<ProtectedRoute path="/toDo" exact={true}> 
					<div className="asanawrapper">
						<Navigation show={showSidebar} toggle={toggleSidebar} /> 
						<MainContent show={showSidebar} toggle={toggleSidebar} content="toDo" />     
					</div>
				</ProtectedRoute>
				<ProtectedRoute path="/workers" exact={true}>
					<div className="asanawrapper">
						<Navigation show={showSidebar} toggle={toggleSidebar} /> 
						<MainContent show={showSidebar} toggle={toggleSidebar} content="workers" />  
					</div>
				</ProtectedRoute>
        <ProtectedRoute path="/inventory" exact={true}>
					<div className="asanawrapper">
						<Navigation show={showSidebar} toggle={toggleSidebar} /> 
						<MainContent show={showSidebar} toggle={toggleSidebar} content="inventory" /> 
					</div>
				</ProtectedRoute>
        <ProtectedRoute path="/projects/:projectId" exact={true}>   
					<div className="asanawrapper">
						<Navigation show={showSidebar} toggle={toggleSidebar} /> 
						<MainContent show={showSidebar} toggle={toggleSidebar} content="project" />   
					</div>
				</ProtectedRoute>   


        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
