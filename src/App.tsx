import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./components/Todos"
import AddTodo from "./components/AddTodos"
import './App.css'

const App = () => {

  return (
    <div className="App">

    <BrowserRouter>
<Routes>

<Route path='/' element={ <Todo/>}/>
<Route path='/add' element={<AddTodo/>}/>
</Routes>
    </BrowserRouter> 
    </div>
 )
}

export default App