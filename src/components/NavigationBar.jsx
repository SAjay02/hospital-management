import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo1 from '../assests/MenuBar.png';
import { Image } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="  "/>
        <Navbar.Collapse id="responsive-navbar-nav" className="">
          <Nav className=" justify-content-between " style={{ marginLeft:"auto"}}>
            <Nav.Link href="#features">HOME</Nav.Link>
            <Nav.Link href="#pricing">ABOUT US</Nav.Link>
            <NavDropdown title=" VIEW PRODUCTS" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Recent</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Current
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Upcoming</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#features">ADD PRODUCTS</Nav.Link>
            <Nav.Link href="#pricing">BILLING</Nav.Link>
            <Nav.Link href="#pricing">CONTACT US</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}

export default NavigationBar