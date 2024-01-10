import React, { useState, useEffect } from 'react'
import {
  MDBScrollspy,
  MDBScrollspyLink,
  MDBScrollspySubList
} from 'mdb-react-ui-kit';
import {Card, Container, Row, Col, Modal, Button} from 'react-bootstrap'
// const teamMembers = [
//   {
//     name: 'Ajay',
//     role: 'Founder & CEO',
//     // bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     description: 'Ajay is the visionary leader behind our company, bringing years of experience and expertise.',
//   },
//   {
//     name: 'Sangeeth',
//     role: 'Lead Developer',
//     // bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     description: 'Sangeeth leads our development team, ensuring the successful execution of projects with his technical prowess.',
//   },
//   // Add more team members as needed
// ];

const About = ({scrollToFooter}) => {

  useEffect(() => {
    // Invoke the callback to scroll to the footer
    scrollToFooter();
  }, [scrollToFooter]);


  return (
    // <Container className="about-us-container">
    //   <h1 className="text-center mb-4">About Us</h1>
    //   <Row>
    //     {teamMembers.map((member, index) => (
    //       <Col key={index} md={4} className="mb-4">
    //         <Card className="about-us-card">
    //           <Card.Body>
    //             <Card.Title>{member.name}</Card.Title>
    //             <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
    //             <Card.Text>{member.bio}</Card.Text>
    //             <Card.Text className="font-italic">{member.description}</Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     ))}
    //   </Row>
    // </Container>
    <>
    
      
    </>

  );
}

export default About