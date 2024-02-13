import AddTask from './Components/AddTask';
import { useTasks } from './Contaxts/TaskContaxt';
import TaskItem from './Components/TaskItem';
import Home from './Components/Home';

const Main = () => {
  const {tasks, name, deleteAccount, deleteAll} = useTasks();

  function handleDeleteAccount() {
      deleteAccount()
  }
  function handleClearAll() {
      deleteAll();
  }


  return (
    <div className='main_container'>
        {name ?
          <>
            <div className='addtask_container margin_utility'>
                <h1>Today's Tasks, {name}</h1>
                <button className='tertiary_button' onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>

            <AddTask />

            <ul className='list_div'>
                {
                  tasks.map( (task) => <TaskItem task={task} key={task.id}/>)
                }
            </ul>

            { tasks.length > 0 && <button className='secondary_button' onClick={handleClearAll}>
              Clear All
            </button> }
          </> :
          <Home /> 
        }
    </div>
  )
}

export default Main
