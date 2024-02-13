import { createContext, useContext, useEffect, useReducer } from "react"

const TaskContaxt = createContext();

////////////////////////////////////   GETTING DATA FROM LOCAL STORAGE  ////////////////////////////////////////
function getData() {
    const data = localStorage.getItem('lists');

    if(data) {
        return JSON.parse(data);
    } else {
        return []
    }
}


const initialState = {
    tasks: getData().tasks ? getData().tasks : [],
    name: getData().name ? getData().name : "",
}


////////////////////////////////////   REDUCER FUNCTION  ////////////////////////////////////////
function reducer(state, action) {
    switch(action.type) {
        case 'user/name':
            return {
                ...state, name: action.payload,
            }
        case 'task/completed':
            const task = state.tasks.filter(task => task.id !== Number(action.payload));
            const taskCompleted = state.tasks.find(task => task.id === action.payload);
            return {
                ...state,
                tasks: [...task, {...taskCompleted, completed: true}]
            }
        case "task/delete":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== Number(action.payload))
            }
        case "task/new":
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        case "task/update":
            const updatedTask = state.tasks.map(task => {
                if(task.id === Number(action.payload.updateId)) {
                    task.task = action.payload.updatedTask;
                    return task
                } else {
                    return task
                }
            });
            return {
                ...state,
                tasks: updatedTask
            }
        case "tasks/clearAll":
            return {
                ...state,
                tasks: []
            }
        case 'user/deleteAccount':
            return {
                ...state, name: '', tasks: [],
            }
        default:
            return state
    }
}


const TaskProvider = ({children}) => {
    const [{tasks, name}, dispatch] = useReducer(reducer, initialState);


    ////////////////////////////////////   ACTION FUNCTIONS  ////////////////////////////////////////
    function userName(name) {
        dispatch({type: "user/name", payload: name})
    }
    function taskCompleted(id) {
        dispatch({type: "task/completed", payload: id})
    }
    function taskDeleted(id) {
        dispatch({type: "task/delete", payload: id})
    }
    function addNewTask(newTask) {
        dispatch({type: 'task/new', payload: newTask})
    }
    function updateTask(updatedTask, updateId) {
        dispatch({type: 'task/update', payload: {updatedTask, updateId}})
    }
    function deleteAll() {
        dispatch({type: 'tasks/clearAll'})
    }
    function deleteAccount() {
        dispatch({type: 'user/deleteAccount'})
    }
    
    ////////////////////////////////////   SETTING LOCAL STORAGE  ////////////////////////////////////////
    useEffect(function(){
        localStorage.setItem('lists', JSON.stringify({tasks, name}))
    }, [tasks, name])

  return (
      <TaskContaxt.Provider value={{
        tasks, name, taskCompleted, taskDeleted, addNewTask, updateTask, userName, deleteAll, deleteAccount
    }}>
        {children}
    </TaskContaxt.Provider>
  )
}

////////////////////////////////////   CUSTOM HOOK TO USE CONTEXT EASILY  ////////////////////////////////////////
function useTasks() {
    const context = useContext(TaskContaxt);
    if(context === undefined) throw new Error("CitiesContext is used outside of CitiesProvider");
    return context;
}

export {TaskProvider, useTasks};
