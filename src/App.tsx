import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./components/Todos"
import AddTodo from "./components/AddTodos"

const App = () => {
  return (
    <BrowserRouter>
<Routes>

<Route path='/' element={ <Todo/>}/>
<Route path='/add' element={<AddTodo/>}/>
</Routes>
    </BrowserRouter>  )
}

export default App