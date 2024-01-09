import "./index.css";
import { useEffect } from "react";
import { useState } from "react";
function App() {
  const [todo, setTodo] = useState([]);
  const [ans, setAns] = useState("");
  useEffect(() => {
    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, []);
  const fetchData = () => {
    fetch("http://localhost:1907/todos", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTodo(data));
  };
  const handleChange = (e) => {
    setAns(e.target.value);
  };
  const handleTodo = () => {
    fetch("http://localhost:1907/todos", {
      method: "POST",
      body: ans,
    })
      .then((response) => response.json())
      .then((data) => setTodo(data));
    setAns("");
  };
  const handleDelete = (i) => {
    fetch(`http://localhost:1907/todos/${i}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setTodo(data));
  };
  return (
    <>
      <h1>All todos</h1>
      <label htmlFor="todo">Add Todos: </label>
      <input type="text" value={ans} onChange={handleChange}></input>
      <button onClick={() => handleTodo()}>Add</button>
      <ol>
        {todo?.map((item, index) => {
          return (
            <>
              <li key={index}>
                <h4>{item}</h4>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            </>
          );
        })}
      </ol>
    </>
  );
}

export default App;
