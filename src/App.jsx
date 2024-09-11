import { useState, useEffect } from 'react'
import './App.css'
 
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    console.log(todoString);

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }


  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }
  const handleEdit = (e, id) => {

    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    setTodos(newTodos);
    saveToLS();


  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    setTodos(newTodos);
    saveToLS();

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    console.log(todos);
    saveToLS();

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS();
  }

  const handleCheckbox = (e) => {
    console.log(e.target.name);
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLS();


  }

  return (
    <>
       
      <div className="container  ">
        <div className="addTodo  ">
           
          <div className="flex space-x-3">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder='add todo...'
            />
            <button
              onClick={handleAdd}
              className="addBtn"
            >
              Add +
            </button>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-3 text-pink-800">Your Todos</h2>
        <div className="todos space-y-3">
          {todos.length === 0 && <div className="text-pink-700">No Todos to display</div>}
  
          {todos.map((item) => (
            <div
              className="todo flex items-center justify-between p-3 bg-white rounded-lg shadow-md"
              key={item.id}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  name={item.id}
                  checked={item.isCompleted}
                  className="form-checkbox h-4 w-4 text-pink-600"
                />
                <div className={`${item.isCompleted ? "line-through text-gray-500" : "text-gray-800"} flex-1`}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex space-x-2">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-black text-white px-2 py-1 rounded-lg text-sm hover:bg-gray-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-black text-white px-2 py-1 rounded-lg text-sm hover:bg-gray-800 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
  
}

export default App


 