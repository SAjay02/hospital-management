import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="  "/>
        <Navbar.Collapse id="responsive-navbar-nav" className="">
          <Nav className=" justify-content-between " style={{ marginLeft:"auto"}}>
              <Nav.Link as={Link} to='/home'>HOME</Nav.Link>
           
            <Nav.Link as={Link} to='/about'>ABOUT US</Nav.Link>
            <NavDropdown title=" VIEW PRODUCTS" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to='/recent' href="#action/3.1">Recent</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/current' href="#action/3.2">
                Current
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/upcoming' href="#action/3.3">Upcoming</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#features">ADD PRODUCTS</Nav.Link>
            <Nav.Link href="#pricing">BILLING</Nav.Link>
            <Nav.Link href="#pricing">CONTACT US</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    
    <div>
      
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/recent' element={<Recent/>}/>
        <Route path='/current' element={<Current/>}/>
        <Route path='/upcoming' element={<Upcoming/>}/>

      </Routes>

    </div>

    </div>
    </BrowserRouter>

    </div>
  )
}

export default NavigationBar