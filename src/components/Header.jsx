import React from "react";
import Logo from "./Logo";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import CarouselSlider from "./CarouselSlider";
import { currentUser1 } from "./Login";
import { HiOutlineUserCircle } from "react-icons/hi";
const Header = ({ currentUser }) => {
  const [color, setColor] = useState("#00806B");
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div style={{ backgroundColor: `${color}` }}>
      <div className="container ">
        <header className="d-flex  justify-content-sm-around nav-txt-font">
          <Logo />
          <SearchBar setSelectedProduct={setSelectedProduct} />
          <Button />
          <h5
            style={{ color: "white", marginTop: "17px", marginLeft: "800px" }}
          >
            <HiOutlineUserCircle style={{ marginTop: "-1px",marginLeft:'-10px' }} size={30} />{" "}
            Hello{" "}
            {currentUser?.email.substr(0, currentUser?.email.indexOf("@"))}
          </h5>
        </header>
      </div>
    </div>
  );
};

export default Header;
