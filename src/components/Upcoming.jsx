import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import './Searchbar.css'
const Upcoming = () => {
  return (
    <div>
      <Container style={{textAlign:'center', fontSize:'35px'}}>
        <Row>
          <Col style={{fontWeight:'bolder', fontStyle:'italic',marginTop:'17px'}}>Coming Soon..............</Col>
          
          {/* <Col>2</Col> */}
        </Row>
        <Row>
          <Col>
            Please check current available products.... &nbsp;:)
            <br /><br />
          </Col>

        </Row>
       
      </Container>
    </div>
  )
}

export default Upcoming