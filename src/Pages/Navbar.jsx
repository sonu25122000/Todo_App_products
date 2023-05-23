import React from "react"
import { Link } from "react-router-dom"

function Navbar(){
    return(
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            background:"#FFEBEE",
            padding:"20px",
            color:"blue",
            fontSize:"20px"
        }}>
            <Link to="/">HOME</Link>
            <Link to="/display">DISPLAY</Link>
        </div>
    )
}
export default Navbar