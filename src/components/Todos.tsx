import  { useEffect } from 'react';
import useTodoStore from '../app/todo/todoSlice'; 
import { Link } from 'react-router-dom';
import './Todo.css'
import { Card } from 'react-bootstrap';
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const Todo = () => {
  const { loading, todos, error, fetchTodos, deleteTodo, toggleTodo } = useTodoStore(); 

  useEffect(() => {
    fetchTodos(); 
  }, []); 

  const handleDelete = (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    if (isConfirmed) {
      deleteTodo(id); 
    }
  };

  const handleToggle = (id: number, completed: boolean) => {
    toggleTodo({ id, completed }); 
  };

  return (
    <div className=''>
      {loading && <h1>Loading ...</h1>}
      {error && <h1>{error}</h1>}

      {/* {todos.length > 0 && (
        // <div className='todo container'>
        // 
        //   {todos.map((todo: TodoItem, index: number) => (
        //     <div key={todo.id} className="card container flex ">
        //       <div className="card-content ">
        //         <h3>{index+1}</h3>
        //         <h3>{todo.title}</h3>
        //         <h2 style={{ cursor: "pointer" }} onClick={() => handleToggle(todo.id, todo.completed)}>
        //           {todo.completed ? '✅' : '❌'}
        //         </h2>
        //         <button className='btn btn-warning' onClick={() => handleDelete(todo.id)}>Delete</button>
        //       </div>
        //     </div>
        //   ))}
        // </div>
      )} */}
      

    {
      todos.length > 0 &&(
        <div className='container '>
            <Link className='btn btn-dark w-100  py-2 mt-4  ' to="/add">Add</Link>
          {
            todos.map((todo: TodoItem, index: number)=>(
              <Card key={index} className='container d-flex'>
              <Card.Body className='m-2'>{todo.title}</Card.Body>
              <h2 style={{ cursor: "pointer" }} onClick={() => handleToggle(todo.id, todo.completed)}>
                 {todo.completed ? <i style={{color:" #0aeb24" }} className="fa-solid fa-xl  fa-check" ></i> :<i style={{color: "#d80e0e"}} className="fa-solid fa-xmark fa-xl"></i>}
               </h2>
               <button className='btn btn-danger' onClick={() => handleDelete(todo.id)}>Delete</button>
            </Card>
            ))
          }
        </div>
      )
    }
    </div>
  );
};

export default Todo;
