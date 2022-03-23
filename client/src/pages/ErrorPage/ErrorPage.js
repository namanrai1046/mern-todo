import React from 'react'
import { Link } from "react-router-dom"
import image from "../../images/error-404.webp"

const ErrorPage = () => {
    return (
        <div className="page">
            <img style={{
                height: "50vh",
                width: "auto"
            }} src={image} />
            <h1 className='heading'>Error 404! Page Not Found</h1>
            <br />
            <br />
            <br />
            <Link to="/login">
                Move to Login Page
            </Link>
        </div>
    )
}

export default ErrorPage