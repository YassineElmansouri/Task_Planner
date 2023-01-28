import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"


export default function Todo(){
    const [tasks, setTask] = useState([])
    const [todo, setTodo] = useState('')
    const [date, setDate] = useState();
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
      <div>
        <div className="jumbotron jumbotron-fluid bg-info text-white">
          <div className="container">
            <h1 className="display-4 text-center">To-Do List</h1>
            <p className="lead text-center">Keep track of all your tasks and deadlines</p>
          </div>
        </div>

        <div className="container my-5">
          <h4 className="display-6 text-center">Tasks Completed : {completed}</h4>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <form onSubmit={hundleSub}>
                <div className="form-group">
                  <label for="taskInput">Enter your task:</label>
                  <input type="text" className="form-control" id="taskInput" value={todo} onChange={(e)=>{setTodo(e.target.value)}}/>
                </div>
                <div className="form-group">
                  <label for="dateInput">Enter due date:</label>
                  <input type="date" className="form-control mb-3" id="dateInput" onChange={(e)=>{setDate(e.target.value)}}/>
                </div>
                <div className="form-group text-center">
                  <input className="btn btn-success" type="submit" value="Add Task"/>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 mx-auto">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Task DeadLine</th>
                    <th>Remove</th>
                    <th>Edit</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task,index)=>(
                    <tr key={index}>
                      <td>{task.task}</td>
                      <td>{task.date}</td>
                      <td >
                        <button className="btn btn-danger" onClick={()=>handleRemove(index)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                      <td >
                        <button className="btn btn-warning" onClick={()=>handleEdit(index)}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </td>
                      <td className="text-center">
                        <input className="form-check-input" type="checkbox" checked={task.completed} onChange={() => handleCheck(index)}
                      />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

</div>
    
    )
}