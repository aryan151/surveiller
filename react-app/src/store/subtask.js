const UPDATE_SUBTASK = 'pojects/UPDATE_SUBTASK';
const ADD_SUBTASK = 'projects/ADD_SUBTASK';
const REMOVE_SUBTASK = 'projects/REMOVE_SUBTASK'; 


const updateTaskAction = (subtask) => {
    return {
        type: UPDATE_SUBTASK,
        subtask
    };
};

const addTaskAction = (subtask) => {
    return {
        type: ADD_SUBTASK,
        subtask
    };
};

const deleteTaskAction = (subtask) => {
    return {
        type: REMOVE_SUBTASK,
        subtask 
    };
};

export const updateProjectTask = (subtask) => async (dispatch) => {
    let res = await fetch(`/api/projects/tasks/${subtask.id}/`, {
        method: 'PATCH',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(subtask)
    });
    if (res.ok) {
        dispatch(updateTaskAction(subtask))
    }
}

export const deleteTaskThunk = (subtask) => async (dispatch) => {
    await fetch(`/api/projects/tasks/${subtask.id}/`, {
        method: "DELETE"
    });
    dispatch(deleteTaskAction(subtask))
}

export const addTaskThunk = (subtask) => async (dispatch) => {
    const res = await fetch(`/api/projects/${subtask.taskId}/subtasks/`, {
        method: "POST",
        headers: { 
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(subtask)
    });
    const newTask = await res.json()
    dispatch(addTaskAction(newTask))
};  

const initialState = {}

function subtasksReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case UPDATE_SUBTASK:
            newState = {...state};
            return newState;
        case ADD_SUBTASK:
            newState = {...state}
            newState[action.subtask.taskId].tasks.push(action.task)
            return newState;
        case REMOVE_SUBTASK:
            newState = {...state} 
            newState[action.subtask.taskId].tasks = newState[action.subtask.taskid].tasks.filter(task => task.id !== action.task.id)
            return newState
        default:
            return state;
    }
}

export default subtasksReducer