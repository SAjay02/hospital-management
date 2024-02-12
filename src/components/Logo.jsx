import React from "react";
import { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "./Logo.css";
import logo1 from "../assests/flier-high-resolution-logo.png";
import logo2 from "../assests/flier-high-resolution-logo (1).png";
const Logo = () => {
  const [color1, setColor1] = useState("#07b5e6");
  return (
    <div className="d-flex head_cont">
      {/* <Image style={{maxWidth:"10%",maxHeight:"auto"}} className="img-fluid rounded-5" src={logo} rounded/> */}
      {/* <MDBIcon
        // style={{ color: "whitesmoke" }}
        icon={logo1}
        // size="xl"
        // className="icon me-1"
      /> */}
      <img
        className="header-logo"
        src={logo2}
        style={{
          width: "40px",
          height: "40px",
          marginTop: "15px",
          marginRight: "5px",
          paddingBottom:'5px'
        }}
        alt="Logo"
      />
      <h3 style={{ color: 'white', fontFamily:'cursive' }} className="mt mt-md-3 header-name">
        Flier
      </h3>
      {/* <h3 style={{ color: "white " }} className="mt   mt-md-3">
        Care
      </h3> */}
    </div>
  );
};

export default Logo;
