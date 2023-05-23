import React from "react"
import { Route, Routes } from "react-router-dom"
import Form from "./Form"
import DisplayProduct from "./Displayproduct"

function Allroute(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Form/>}/>
                <Route path="/display" element={<DisplayProduct/>}/>
            </Routes>
        </div>
    )
}
export default Allroute