import React from "react"
import "./homepage.css"

const Homepage = ({setLoginUser,user}) => {
    return (
        <div className="homepage">
            <h1>Hello,  {user.email}</h1>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}

export default Homepage