import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {

  const [userName, setUserName] = useState("")
  const [todo, setTodo] = useState("");
  const [query, setQuery] = useState()
  const navigate = useNavigate()

  const userId = localStorage.getItem("userId")

  if (!userId) {
    navigate("/")
  }

  const setTodoHandler = async (e) => {
    e.preventDefault()
    const data = await fetch("http://localhost:5000/api/v1/todo", {
      method: "Post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        todo: todo,
        id: localStorage.getItem("userId")
      })
    })

    const response = await data.json()
    setQuery(todo)
    setTodo(" ")
  }

  const [showtodo, setShowTodo] = useState([])

  useEffect(() => {
    const start = async () => {
      const data = await fetch("http://localhost:5000/api/v1/todo", {
        headers: {
          "x-access-token": localStorage.getItem("userId")
        }
      })
      const response = await data.json()
      setUserName(response.msg.name)
      setShowTodo([...response.msg.todo])
    }
    start()
  }, [query])

  const logOutHandler = () => {
    localStorage.clear()
    navigate("/login")
  }

  const updateTodo = (index) => {
    localStorage.setItem("updatedTodoId", index)
    navigate(`/todos/${localStorage.getItem("userId")}/update`)
  }

  const deleteTodoHandler = async (index) => {
    const data = await fetch("http://localhost:5000/api/v1/delete", {
      method: "Delete",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        id: localStorage.getItem("userId"),
        taskId: index
      })
    })

    const response = await data.json();
    setQuery(Math.random())
  }

  return (
    <div className="page">
      <p className='heading'>Hey ,<span style={{
        color: "red"
      }}> {userName}</span></p>
      <p className='heading'>what are your plans for today</p>
      <br />
      <br />
      <form onSubmit={setTodoHandler}>
        <label>Enter To Do</label>
        <br />
        <br />
        <input required maxLength="50" type="text" value={todo} placeholder="max length is 50 characters" onChange={(e) => setTodo(e.target.value)} />
        <br />
        <br />
        <div className="btn">
          <button type="submit">Submit</button>
        </div>
      </form>
      <br />
      <div>
        <p style={{
          textAlign: "center",
          textDecoration: "underline"
        }} className='heading' >To Do's</p>
        <div className='underline'></div>
        <br />
        {showtodo.map((singleTodo, index) => (
          <div className='todo-list' key={index}>
            <span>{singleTodo}</span>&nbsp;&nbsp;&nbsp;
            <div>
              <button className='update' onClick={() => updateTodo(index)}>Update</button>&nbsp;
              <button className='delete' onClick={() => deleteTodoHandler(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <br />
      <button onClick={logOutHandler}>Logout</button>
      <br />
    </div>
  )
}

export default TodoPage