const LOAD_PROJECT = "project/LOAD_PROJECT"; 

const loadProject = (project) => ({ 
	type: LOAD_PROJECT,
	payload: project, 
});    

 

export const getProject = (projectId) => async (dispatch) => {
	const response = await fetch(`/api/projects/${projectId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadProject(data)); 
		return data;
	} else {
		return response;
	}
};

export const saveProject = (payload) => async (dispatch) => {
	const response = await fetch(`/api/projects/edit`, {
        method:"POST",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(payload)
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadProject(data));
		return data;
	} else {
		return response;
	}
};

export const deleteProject = (projectId) => async (dispatch) => {

	const response = await fetch(`/api/projects/${projectId}/delete`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return response;
	} 
};


const initialState = { project: " " }; 
  
export default function reducer (state = initialState, action) {
	switch (action.type) {
		case LOAD_PROJECT:
			return action.payload; 
		default:
			return state;
	}
}