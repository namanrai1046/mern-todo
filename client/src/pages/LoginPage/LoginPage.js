import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const checkUserHandler = async (e) => {
        e.preventDefault()
        const data = await fetch("http://localhost:5000/api/v1/login", {
            method: "Post",
            headers: {
                "Content-type": "application/json"
            },
            // It will convert object in JSON(because of CORS policy)
            body: JSON.stringify({
                email,
                password
            })
        })

        const response = await data.json()

        const userid = response.id

        if (response.status === "ok") {
            // Setting UserId in Local Storage so that other components can use it
            localStorage.setItem("userId", userid)
            navigate(`/todos/${userid}`)
        }
        else {
            alert("Invalid email address or password")
        }
    }

    return (
        <div className="page">
            <h1>Login</h1>
            <br />
            <br />
            <form onSubmit={checkUserHandler}>
                <label>Email : </label>
                <br />
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                <br />
                <br />
                <label>Password : </label>
                <br />
                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                <br />
                <br />
                <br />
                <div className="btn">
                    <button type="submit">Submit</button>
                </div>
            </form>
            <br />
            <div className="toregister">
                <Link to="/">
                    <p>Don't have an Account</p>
                </Link>
            </div>

        </div>
    )
}

export default LoginPage