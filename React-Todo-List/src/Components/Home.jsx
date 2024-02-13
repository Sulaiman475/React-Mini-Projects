import React, { useState } from 'react'
import { useTasks } from '../Contaxts/TaskContaxt';

const Home = () => {

  const [name, setName] = useState("");
  const {userName} = useTasks();
  const [isError, setIsError] = useState(false);

  function handleName(e) {
    e.preventDefault();
    if(name.length < 4) {
      setIsError(true)
      return;
    };

    setIsError(false);
    userName(name);
  }

  return (
    <>
      <h2>Start by Name</h2>
      <form className='addtask_container' onSubmit={(e) => handleName(e)}>
        <input type="text" placeholder='Type new task...' 
          className='input' value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {name.length >=4 && <button className='primary_button' onClick={(e) => handleName(e)}>
          Add Task
        </button>}
      </form>
      {isError ? name.length < 4 && <p className='error'>Name must have atleast 4 characters.</p> : null}
    </>
  )
}

export default Home;
