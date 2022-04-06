import { updateProjectTask, deleteTaskThunk } from "../../../store/subtask";
import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import {CgRemoveR} from 'react-icons/cg'

function SubTask({subtask, calculateCompletion}){
    const dispatch = useDispatch();

    const [completed, setCompleted] = useState(subtask.completed);
    const [isHovered, setIsHovered] = useState(false)

    const toggleCompletion = async () => {
        subtask.completed = !completed
        await setCompleted(!completed)
        await dispatch(updateProjectTask(subtask))
        calculateCompletion()
    };

    const deleteTask = async (e) => {
        e.stopPropagation()
        await dispatch(deleteTaskThunk({taskId: subtask.taskId, id: subtask.id}))
        calculateCompletion()
    };

    return (
        <div className='task-container' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className='task-wrapper'>
                <div className={completed ? 'task-completed' : 'task-uncomplete'} onClick={toggleCompletion} >
                    <p><span>{completed ? '✓ ' : ''}</span>{subtask.description}</p>
                </div>
                    {!completed && (
                        <CgRemoveR className={isHovered ? 'task-delete task-delete-hovered' : 'task-delete'} onClick={deleteTask}/> 
                    )}
            </div>
        </div>
    );
};

export default SubTask;