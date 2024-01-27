import React from "react";
import { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "./Logo.css";
const Logo = () => {
  const [color1, setColor1] = useState("#07b5e6");
  return (
    <div className="d-flex head_cont">
      {/* <Image style={{maxWidth:"10%",maxHeight:"auto"}} className="img-fluid rounded-5" src={logo} rounded/> */}
      <MDBIcon
        style={{ color: "whitesmoke" }}
        icon="gem"
        size="xl"
        className="icon me-1"
      />
      <h3 style={{ color: `${color1}` }} className="mt mt-md-3 ">
        Health
      </h3>
      <h3 style={{ color: "white " }} className="mt   mt-md-3">
        Care
      </h3>
    </div>
  );
};

export default Logo;
