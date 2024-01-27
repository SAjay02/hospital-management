import React, { useState, useEffect, useCallback } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import {
  Route,
  Routes,
  Link,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import Recent from "./Recent";
import Current from "./Current";
import Upcoming from "./Upcoming";
import About from "./About";
import Contact from "./Contact";
import { ScrollSpy } from "bootstrap";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import AddProducts from "./AddProducts";
import Billing from "./Billing";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import "../pages/HomePage.css";
const NavigationBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const footerRef = useRef(null);

  const handleLogout = async () => {
    await onLogout();
    // Redirect to the login page after successful logout
    navigate("/");
  };
  const scrollToFooter = useCallback(() => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div>
      <>
        <Navbar
          expand="lg"
          bg="light"
          variant="light"
          className="bg-body-tertiary nav-txt-font "
        >
          <Container fluid>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                className="justify-content-between"
                style={{ marginLeft: "auto" }}
                defaultActiveKey="/home"
              >
                <Nav.Link
                  as={Link}
                  to="/"
                  className="nav-element-hover nav-txt-color"
                >
                  HOME
                </Nav.Link>
                <Nav.Link
                  as={ScrollLink}
                  smooth={true}
                  duration={100}
                  to="about"
                  className="nav-element-hover"
                >
                  ABOUT US
                </Nav.Link>
                <NavDropdown
                  title="VIEW PRODUCTS"
                  id="collasible-nav-dropdown"
                  className="nav-element-hover "
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/recent"
                    className="nav-frop-animation"
                  >
                    Recent
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/current"
                    className="nav-frop-animation"
                  >
                    Current
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/upcoming"
                    className="nav-frop-animation"
                  >
                    Upcoming
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  to="/addproducts"
                  className="nav-element-hover"
                >
                  ADD PRODUCTS
                </Nav.Link>
                <Nav.Link as={Link} to="/billing" className="nav-element-hover">
                  BILLING
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/contact"className="nav-element-hover ">CONTACT US</Nav.Link> */}
                <Nav.Link
                  className="nav-element-hover"
                  style={{ fontWeight: "bolder" }}
                  onClick={handleLogout}
                >
                  LOG
                  <RiLogoutCircleLine className="logout-logo" />
                  UT{" "}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/about"
            element={<About scrollToFooter={scrollToFooter} />}
          />

          <Route path="/recent" element={<Recent />} />
          <Route path="/current" element={<Current />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </div>
    </div>
  );
};

export default NavigationBar;
