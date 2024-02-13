import React, { useState } from 'react'
import { useTasks } from '../Contaxts/TaskContaxt'
import { HiMiniCheckCircle, HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";

const TaskItem = ({task}) => {
  const {task: taskText, completed, id} = task;
  const [toggle , setToggle] = useState(false);
  const [input, setInput] = useState(taskText);

  const {taskCompleted, taskDeleted, updateTask} = useTasks();

  function completeTask() {
    if(task.completed === true) return;
    else taskCompleted(id)
  }

  function deleteTask() {
    taskDeleted(id)
  }

  function handleUpdate() {
    updateTask(input, id)
    setToggle(false)
  }

  return (
    <div className='list_container'>
      { toggle ? 
         <div className='addtask_container'>
          <input type="text" value={input} className='input' onChange={(e) => setInput(e.target.value)} />
          <button className='primary_button'
            onClick={handleUpdate}
          >
            Update
          </button>
         </div>
        :
        (<>
          <p className={`${completed === true ?  'completed' : ''}`}>{taskText}</p>
          <div className='button_container'>
              <HiMiniCheckCircle className='button_round1' onClick={completeTask}/>
              <HiOutlinePencilSquare className='button_round2' onClick={() => setToggle(!toggle)}/>
              <HiOutlineTrash className='button_round2' onClick={deleteTask} />
          </div>
        </>)
      }
    </div>
  )
}

export default TaskItem
