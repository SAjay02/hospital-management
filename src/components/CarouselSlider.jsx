import React from 'react'
import {Carousel} from 'react-bootstrap'
import img1 from '../assests/caro1.png';
import img2 from '../assests/caro2.png';
import img3 from '../assests/caro3.png';
import { MdMedicalServices } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";
const CarouselSlider = () => {

  let carousel = [
    {
      id : 1,
      image : img1
    },
    {
      id : 2,
      image : img2
    },
    {
      id : 3,
      image : img3
    }
  ]
  return (
    <>
        <Carousel>
          {
            carousel.map(carousel =>{
              return(
                <Carousel.Item key={carousel.id} interval={3000}>
                <img
                    className='d-block w-100'
                    src={carousel.image}
                    alt={carousel.id}
                />
              </Carousel.Item>
              )
            })
          }
        </Carousel><br />
        <div className='container'>
        
      <section className="hero-section">
        <div className="container">
          <div className="hero-text">
            <h3 style={{fontStyle:'initial'}}>YOUR TRUSTED MEDICAL BILLING PARTNER</h3>
            <p>Efficient, Accurate, and Reliable Medical Billing Services</p>
          </div>
        </div>
      </section><br />

      <section className="services-section">
        <div className="container">
          <h3>OUR SERVICES <MdMedicalServices /></h3><br />
          <div className="service-card">
            <div className="service-info">
              <h5>MEDICAL CODING</h5>
              <p>Accurate and compliant medical coding services for efficient billing processes.</p>
            </div>
          </div>
          <div className="service-card">
            {/* <div className="service-icon">Icon</div> */}
            <div className="service-info">
              <h5>CLAIMS SUBMISSION</h5>
              <p>Streamlined claims submission to maximize reimbursement and reduce denials.</p>
            </div>
          </div>
          <div className="service-card">
            {/* <div className="service-icon">Icon</div> */}
            <div className="service-info">
              <h5>REVENUE CYCLE MANAGAEMENT</h5>
              <p>Comprehensive revenue cycle management for optimal financial performance.</p>
            </div>
          </div>
        </div>
      </section>
<hr />
      <section className="why-choose-us-section">
        <div className="container">
          <h3>WHY CHOOSE US <FaQuestion /></h3><br />
          <div className="feature">
            {/* <div className="feature-icon">Icon</div> */}
            <div className="feature-info">
              <h5>ACCURACY & COMPLIANCE</h5>
              <p>Our team ensures accurate coding and compliance with healthcare regulations.</p>
            </div>
          </div>
          <div className="feature">
            {/* <div className="feature-icon">Icon</div> */}
            <div className="feature-info">
              <h5>TRANSPARENT REPORTING</h5>
              <p>Get transparent and detailed reports to track the financial health of your practice.</p>
            </div>
          </div>
          <div className="feature">
            {/* <div className="feature-icon">Icon</div> */}
            <div className="feature-info">
              <h5>CUSTOMIZED SOLUTIONS</h5>
              <p>We tailor our services to meet the unique needs of your medical practice.</p>
            </div>
          </div>
        </div>
      </section>

      
    
        </div>
    </>
  )
}

export default CarouselSlider