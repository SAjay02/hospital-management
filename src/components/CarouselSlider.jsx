import React, { useState, useEffect, useRef } from "react";
import "animate.css";
import { Carousel } from "react-bootstrap";
import img1 from "../assests/caro1.png";
import img2 from "../assests/caro2.png";
import img3 from "../assests/caro3.png";
import img4 from "../assests/tablet.jpg";
import img5 from "../assests/syrup.png";
import img6 from "../assests/lozenges.png";
import { MdMedicalServices } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
const CarouselSlider = () => {
  // const [animationDone, setAnimationDone] = useState(false);

  const imgRefs = [useRef(), useRef(), useRef()];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Adjust the threshold as needed
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__lightSpeedInRight"
          );
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    imgRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []); // Run the effect only once on component mount

  let carousel = [
    {
      id: 1,
      image: img1,
    },
    {
      id: 2,
      image: img2,
    },
    {
      id: 3,
      image: img3,
    },
  ];
  return (
    <>
      <Carousel>
        {carousel.map((carousel) => {
          return (
            <Carousel.Item key={carousel.id} interval={3000}>
              <img
                className="d-block w-100"
                src={carousel.image}
                alt={carousel.id}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <br />
      <Container>
        <Row>
          <Col>
            <div ref={imgRefs[0]} className="animated-content">
              <img
                className="animate__animated animate__lightSpeedInRight home-img"
                src={img4}
                alt=""
              />
            </div>
          </Col>
          <Col className="home-content " id="tablet-content">
            Medical tablets are widely used in healthcare for the oral
            administration of medications. They serve as a convenient and
            effective dosage form for patients to take prescribed drugs. Tablets
            are commonly used for a variety of purposes, including pain
            management, antibiotic therapy, cardiovascular health, and chronic
            disease management. They offer precise dosing, ease of handling, and
            often feature coatings or formulations for controlled release.
            Patients typically follow prescribed regimens to ensure optimal
            treatment outcomes. The general usage of medical tablets plays a
            crucial role in modern medicine, providing a standardized and
            accessible method for delivering a wide range of pharmaceutical
            treatments to individuals worldwide.
          </Col>
        </Row>

        <Row>
          <Col className="home-content" id="syrup-content">
            Medical syrups are liquid pharmaceutical formulations designed for
            oral administration, providing a convenient and palatable way to
            deliver medications. Widely used in healthcare, syrups are often
            prescribed for both adults and children, offering a flexible dosage
            form. They are commonly utilized to treat various conditions such as
            coughs, colds, allergies, and gastrointestinal issues. Medical
            syrups provide accurate dosing through calibrated measuring devices,
            enhancing patient compliance. The liquid form is particularly
            suitable for individuals who have difficulty swallowing pills, such
            as pediatric patients or elderly individuals. With a diverse range
            of formulations, medical syrups contribute to effective and
            accessible medication delivery in healthcare practices globally.
          </Col>
          <Col>
            <div ref={imgRefs[1]} className="animated-content">
              <img
                className="animate__animated animate__lightSpeedInLeft home-img"
                src={img5}
                alt=""
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div ref={imgRefs[2]} className="animated-content">
              <img
                className="animate__animated animate__lightSpeedInRight home-img"
                src={img6}
                alt=""
              />
            </div>
          </Col>
          <Col className="home-content" id="lozenges-content">
            Medical lozenges, also known as throat lozenges or cough drops, are
            widely used for the symptomatic relief of various throat and
            respiratory conditions. These small, flavored, and often soothing
            tablets are designed to dissolve slowly in the mouth, allowing the
            active ingredients to be released and provide relief. Commonly
            containing ingredients like menthol, honey, or throat-numbing
            agents, lozenges are frequently used to alleviate symptoms
            associated with sore throat, cough, and mild respiratory irritation.
            They offer a convenient and portable solution for on-the-go relief
            and are often chosen for their ease of use, pleasant taste, and the
            soothing sensation they provide to the throat.
          </Col>
        </Row>
      </Container>

      <div className="container">
        <section className="hero-section">
          <div className="">
            <div>
              <h3 style={{ fontStyle: "initial" }}>
                YOUR TRUSTED MEDICAL BILLING PARTNER
              </h3>
              <p className="animate__lightSpeedInLeft">
                Efficient, Accurate, and Reliable Medical Billing Services
              </p>
            </div>
          </div>
        </section>
        <br />

        <section className="services-section">
          <div className="container" id="services-content">
            <h3>
              OUR SERVICES <MdMedicalServices />
            </h3>
            <br />
            <div className="service-card">
              <div className="service-info">
                <h5>MEDICAL CODING</h5>
                <p>
                  Accurate and compliant medical coding services for efficient
                  billing processes.
                </p>
              </div>
            </div>
            <div className="service-card">
              {/* <div className="service-icon">Icon</div> */}
              <div className="service-info">
                <h5>CLAIMS SUBMISSION</h5>
                <p>
                  Streamlined claims submission to maximize reimbursement and
                  reduce denials.
                </p>
              </div>
            </div>
            <div className="service-card">
              {/* <div className="service-icon">Icon</div> */}
              <div className="service-info">
                <h5>REVENUE CYCLE MANAGAEMENT</h5>
                <p>
                  Comprehensive revenue cycle management for optimal financial
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="why-choose-us-section">
          <div className="container" id="choose-us-content">
            <h3>
              WHY CHOOSE US <FaQuestion />
            </h3>
            <br />
            <div className="feature">
              {/* <div className="feature-icon">Icon</div> */}
              <div className="feature-info">
                <h5>ACCURACY & COMPLIANCE</h5>
                <p>
                  Our team ensures accurate coding and compliance with
                  healthcare regulations.
                </p>
              </div>
            </div>
            <div className="feature">
              {/* <div className="feature-icon">Icon</div> */}
              <div className="feature-info">
                <h5>TRANSPARENT REPORTING</h5>
                <p>
                  Get transparent and detailed reports to track the financial
                  health of your practice.
                </p>
              </div>
            </div>
            <div className="feature">
              {/* <div className="feature-icon">Icon</div> */}
              <div className="feature-info">
                <h5>CUSTOMIZED SOLUTIONS</h5>
                <p>
                  We tailor our services to meet the unique needs of your
                  medical practice.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CarouselSlider;
