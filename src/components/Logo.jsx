import React from 'react'
import {Image} from "react-bootstrap"
import logo from '../assests/Logo.png'
import { useState } from 'react'
const Logo = () => {
    const [color1,setColor1]=useState("#07b5e6");
  return (
    <div className="d-flex mt-2 mb-2">
         <Image style={{maxWidth:"10%",maxHeight:"auto"}} className="img-fluid rounded-5" src={logo} rounded/>
         <h3 style={{color:`${color1}`}} className="  mt-2 mt-md-4">Health</h3>
         <h3 style={{color:"white "}} className=" mt-2 mt-md-4">Care</h3>
    </div>
  )
}

export default Logo