import React, { useState } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Footer = () => {
  const [showContactCard, setShowContactCard] = useState(false);

  const toggleContactCard = () => {
    setShowContactCard(!showContactCard);
  };

  return (
    <div id="about">
      <MDBFooter
        style={{ background: "#00806B" }}
        className="text-center text-lg-start text-muted"
      >
        <section
          style={{ color: "white" }}
          className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        >
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a
              target="_blank"
              href="https://www.facebook.com"
              className="me-4 text-reset"
            >
              <MDBIcon fab size={"xl"} icon="facebook-f" />
            </a>
            {/* <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a> */}
            {/* <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a> */}
            <a
              target="_blank"
              href="https://www.instagram.com"
              className="me-4 text-reset"
            >
              <MDBIcon fab size={"xl"} icon="instagram" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/Ajay Ajay"
              className="me-4 text-reset"
            >
              <MDBIcon fab size={"xl"} icon="linkedin" />
            </a>
            <a
              target="_blank"
              href="https://www.github.com/SAjay02"
              className="me-4 text-reset"
            >
              <MDBIcon fab size={"xl"} icon="github" />
            </a>
          </div>
        </section>

        <section style={{ color: "white" }} className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  FLier
                </h6>
                <p>
                "Connecting communities. Health for all. Your wellness, our priority."


                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#tablet-content" className="text-reset">
                    Tablets
                  </a>
                </p>
                <p>
                  <a href="#syrup-content" className="text-reset">
                    Syrup
                  </a>
                </p>
                <p>
                  <a href="#lozenges-content" className="text-reset">
                    Lozenges
                  </a>
                </p>
               
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a
                  target="_blank"
                    href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                    className="text-reset"
                 
                  >
                   
                    Contact Us
                  </a>
                </p>
                <p>
                  <a href="#services-content" className="text-reset">
                    Services
                  </a>
                </p>
                <p>
                  <a target="_blank"
                  href="
                  https://www.google.com/maps/place/Karpagam+College+of+Engineering/@10.8800864,77.0179684,17.17z/data=!4m6!3m5!1s0x3ba84ffc9b3ea755:0xda7508a90583d22f!8m2!3d10.8801009!4d77.0223684!16s%2Fm%2F03m6r9n?entry=ttu" className="text-reset">
                    Locate Us
                  </a>
                </p>
                <p>
                  <a href="#choose-us-content" className="text-reset">
                    FAQ
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Coimbatore, Tamilnadu.
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright :
          <a className="text-reset fw-bold" href="/">
            &nbsp;flier.com
          </a>
        </div>
      </MDBFooter>
      {/* Contact Card */}
      {showContactCard && (
        <>
          <div
            className="modal fade"
            id="modalContactForm"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">
                    Write to us
                  </h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body mx-3">
                  <div class="md-form mb-5">
                    <i class="fas fa-user prefix grey-text"></i>
                    <input
                      type="text"
                      id="form34"
                      class="form-control validate"
                    />
                    <label data-error="wrong" data-success="right" for="form34">
                      Your name
                    </label>
                  </div>

                  <div class="md-form mb-5">
                    <i class="fas fa-envelope prefix grey-text"></i>
                    <input
                      type="email"
                      id="form29"
                      class="form-control validate"
                    />
                    <label data-error="wrong" data-success="right" for="form29">
                      Your email
                    </label>
                  </div>

                  <div class="md-form mb-5">
                    <i class="fas fa-tag prefix grey-text"></i>
                    <input
                      type="text"
                      id="form32"
                      class="form-control validate"
                    />
                    <label data-error="wrong" data-success="right" for="form32">
                      Subject
                    </label>
                  </div>

                  <div class="md-form">
                    <i class="fas fa-pencil prefix grey-text"></i>
                    <textarea
                      type="text"
                      id="form8"
                      class="md-textarea form-control"
                      rows="4"
                    ></textarea>
                    <label data-error="wrong" data-success="right" for="form8">
                      Your message
                    </label>
                  </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                  <button class="btn btn-unique">
                    Send <i class="fas fa-paper-plane-o ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;

const ContactUs = () => {
  return (
    <>
      <div
        className="modal fade"
        id="modalContactForm"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Write to us</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-5">
                <i class="fas fa-user prefix grey-text"></i>
                <input type="text" id="form34" class="form-control validate" />
                <label data-error="wrong" data-success="right" for="form34">
                  Your name
                </label>
              </div>

              <div class="md-form mb-5">
                <i class="fas fa-envelope prefix grey-text"></i>
                <input type="email" id="form29" class="form-control validate" />
                <label data-error="wrong" data-success="right" for="form29">
                  Your email
                </label>
              </div>

              <div class="md-form mb-5">
                <i class="fas fa-tag prefix grey-text"></i>
                <input type="text" id="form32" class="form-control validate" />
                <label data-error="wrong" data-success="right" for="form32">
                  Subject
                </label>
              </div>

              <div class="md-form">
                <i class="fas fa-pencil prefix grey-text"></i>
                <textarea
                  type="text"
                  id="form8"
                  class="md-textarea form-control"
                  rows="4"
                ></textarea>
                <label data-error="wrong" data-success="right" for="form8">
                  Your message
                </label>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-unique">
                Send <i class="fas fa-paper-plane-o ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
