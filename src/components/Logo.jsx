import React from 'react'
import {Image} from "react-bootstrap"
import logo from '../assests/Logo.png'
import { useState } from 'react'
const Logo = () => {
    const [color1,setColor1]=useState("#07b5e6");
  return (
    <div className="d-flex ">
         {/* <Image style={{maxWidth:"10%",maxHeight:"auto"}} className="img-fluid rounded-5" src={logo} rounded/> */}
         <h3 style={{color:`${color1}`}} className="mt mt-md-3">Health</h3>
         <h3 style={{color:"white "}} className="mt   mt-md-3">Care</h3>
    </div>
  )
}

export default Logo