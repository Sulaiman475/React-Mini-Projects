import React, { useState } from 'react'
import { useTasks } from '../Contaxts/TaskContaxt';

const AddTask = () => {
  const [value, setValue] = useState("");

  const {addNewTask} = useTasks();

  function updateTask(e) {
    e.preventDefault();

    if(value === "") return;

    const newTask = {
      task: value,
      completed: false,
      id: new Date().getTime(),
    }
    addNewTask(newTask);
    setValue('')
  }


  return (
    <form className='addtask_container'>
      <input type="text" placeholder='Type new task...' 
        className='input' value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button className='primary_button' onClick={(e) => updateTask(e)}>
        Add Task
      </button>
    </form>
  )
}

export default AddTask
