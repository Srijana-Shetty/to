import React from 'react'
//import todo from './todo.jpg';
import './App.css';

function App() {
  const[todos,setTodos]=React.useState(()=>{       //array of all todos
    return JSON.parse(localStorage.getItem('todos')) || []         //get input from localStorage but if empty return []
  })   
  const[todo,setTodo]=React.useState("")
  const[todoEditing, setTodoEditing]=React.useState(null)
  const[editingText, setEditingText]=React.useState("")

   React.useEffect(() => {

    const json = JSON.stringify(todos)
    localStorage.setItem("todos" , json)
   },[todos])

  function handleSubmit(e){
    e.preventDefault()

    const newTodo ={
      id: new Date().getTime(),
      text: todo,
      completed:false
    }
    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

  function deleteTodo(id){
    const updatedTodos = [...todos].filter((todo)=> todo.id !== id)

    setTodos(updatedTodos)
  }

  function toggleComplete(id){
    const updatedTodos = [...todos].map((todo)=>{
      if(todo.id === id){
          todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(updatedTodos)

  }

  function editTodo(id){
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText("")
    
  }
  return (
    <div className='body'>
      <div className='App'>
        <img src={require('./todo.jpg')} height="120" width="120"  />
      </div>
      <h1 className='color'>TODO LIST APP</h1>
      <div className='Todo' >
       
<div className='colo'>
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button className='todo-btn' type="submit">Add todo</button>
      </form>
      {todos.map((todo) =>
       <div key={todo.id}>

       { todoEditing === todo.id ? (<input type="text" 
        onChange={(e) => setEditingText(e.target.value)} 
          value = {editingText}/>
) : (<div>{todo.text}</div>)}

        
<input type="checkbox"
         onChange={() => toggleComplete(todo.id) }
         checked={todo.completed}/>

        <button className='color' onClick={() => deleteTodo(todo.id)}>Delete Button</button>
        
         {todoEditing === todo.id ? ( <button onClick={() => editTodo(todo.id)}>Submit Edits</button>): 
         ( <button className='colo' onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>)}
       
        
        
        </div>)}
        </div>
        
     </div>
    </div>
    </div>
  );
}

export default App;
