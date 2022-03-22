const GET_ALLPROJECTS = "project/GET_ALLPROJECTS" 

const allProjects = (projects) => ({
    type: GET_ALLPROJECTS,
    projects 
})
 
export const getAllProjects = () => async (dispatch) => {  
	const response = await fetch(`/api/projects/all`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
console.log(response.json())
	if (response.ok) {
		const data = await response.json();
		dispatch(allProjects(data)); 
		return data;
	} else {
		return response;
	}
};
   

const initialState = { projects: " " }; 
  
export default function reducer (state = initialState, action) {
    let newState; 
	switch (action.type) {
        case GET_ALLPROJECTS:
            newState = {...state};
            newState.projects = action.projects 
            return newState;
		default:
			return state;
	}
} 