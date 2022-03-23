import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const UpdateTodo = () => {

    const navigate = useNavigate()
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [taskId, setTaskID] = useState(localStorage.getItem("updatedTodoId"))
    const [singleTask, setsingleTask] = useState("")

    if (!userId) {
        navigate("/")
    }

    useEffect(() => {
        const getSingleTask = async () => {
            const data = await fetch("http://localhost:5000/api/v1/update", {
                headers: {
                    "x-access-token": [userId, taskId],
                }
            })
            const response = await data.json()
            setsingleTask(response.msg)
        }
        getSingleTask()
    }, [])

    const updateTaskHandler = async (e) => {
        e.preventDefault()
        const data = await fetch("http://localhost:5000/api/v1/update", {
            method: "Put",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: userId,
                updateTask: singleTask,
                taskId: taskId
            })
        })
        const response = await data.json()
        setsingleTask("")
        localStorage.removeItem("updatedTodoId")
        navigate(`/todos/${userId}`)
    }


    return (
        <div className="page">
            <h1>Update Task</h1>
            <br />
            <form onSubmit={updateTaskHandler}>
                <label>Enter Task : </label>
                <br />
                <br />
                <input required maxLength="50" placeholder="max length is 50 characters" onChange={(e) => setsingleTask(e.target.value)} value={singleTask} type="text" />
                <br />
                <br />
                <div className='btn'>
                    <button>Update</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateTodo;