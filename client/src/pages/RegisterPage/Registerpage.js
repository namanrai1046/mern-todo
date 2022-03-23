import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Registerpage = () => {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const setUserHandler = async (e) => {
        e.preventDefault()
        const data = await fetch("http://localhost:5000/api/v1/register", {
            method: "Post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirmpassword: confirm
            })
        })
        const response = await data.json();
        if (response.status === "ok") {
            navigate("/login")
        }
        if (response.status === "no") {
            alert(response.msg);
        }
    }

    return (
        <div className="page">
            <h1>Register</h1>
            <br />
            <br />
            <form onSubmit={setUserHandler}>
                <label>Email Address : </label>
                <br />
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                <br />
                <br />
                <label>Name : </label>
                <br />
                <input required value={name} onChange={(e) => setName(e.target.value)} type="text" />
                <br />
                <br />
                <label>Password : </label>
                <br />
                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                <br />
                <br />
                <label>Confirm Password : </label>
                <br />
                <input required value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" />
                <br />
                <br />
                <div className="btn">
                    <button type="submit">Submit</button>
                </div>
                <div className="tologin">
                    <Link to="/login">
                        <p>Already have an account ?</p>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Registerpage