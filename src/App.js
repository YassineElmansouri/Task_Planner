import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Todo(){
    const [tasks, setTask] = useState([])
    const [todo, setTodo] = useState('')
    const [date, setDate] = useState(new Date());
    const [completed, setCompletedTasks] = useState(0)

    //this method will check if there is a local storage with the name tasks and take the elements and add them to the task variable
    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) {
        setTask(storedTasks);
        //change the number of the tasks comleted
        setCompletedTasks(storedTasks.filter((task) => task.completed).length);
      }
    }, []);


    //this will add the tasks to a local storage
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      //change the number of the tasks comleted
      setCompletedTasks(tasks.filter((task) => task.completed).length);
    }, [tasks]);

    //this method will add the tasks on submit
    const hundleSub = (e) =>{
      e.preventDefault()
      if(todo.trim() !== ""){
        setTask([...tasks, {task:todo, date:date.toLocaleString(), completed:false}])
      setTodo('')
      }
      
    }

    //this method will remove a task
    const handleRemove = (index) =>{
      let newtask = [...tasks]
      newtask.splice(index, 1)
      setTask(newtask)
    }

    //this method allows you to edit a task
    const handleEdit = (index) =>{
      setTodo(tasks[index].task)
      handleRemove(index)
    }

    //this method allows you to check if a checkbox is cheked or not and change the completed element
    const handleCheck = (index) =>{
      let newtask = [...tasks]
      newtask[index].completed = !newtask[index].completed
      setTask(newtask)
    }

    return (
        <div className="jumbotron-center">
          <div className="page-header text-center">
            <h1 class="text-primary">To-Do List</h1>
            <h3 class="text-success">Task completed : {completed}</h3>
          </div>
            
            <form className="form-inline" onSubmit={hundleSub}>
                <label className="sr-only" for="inlineFormInput">enter you task : </label>
                <input className="form-control mb-2 mr-sm-2" type="text" value={todo} onChange={(e)=>{setTodo(e.target.value)}}/>
                <input class="btn btn-outline-primary btn-rounded" type="submit" value="Add"/>
            </form>
            <table class="table text-center table-hover">
              <thead class="thead-dark">
                <tr>
                  <th>Task Name</th>
                  <th>Task Date</th>
                  <th>Remove Task</th>
                  <th>Edit Task</th>
                  <th>Task Completed</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task,index)=>(
                  <tr key={index}>
                    <td>{task.task}</td>
                    <td>{task.date}</td>
                    <td><center><button class="btn btn-outline-danger" onClick={()=>handleRemove(index)}>Remove</button></center></td>
                    <td><center><button class="btn btn-outline-info " onClick={()=>handleEdit(index)}>Edit</button></center></td>
                    <td><center><input class="form-check-input"  type="checkbox" checked={task.completed} onChange={() => handleCheck(index)}
              /></center></td>
                  </tr>
                  ))}
              </tbody>
            </table>
        </div>
    )
}