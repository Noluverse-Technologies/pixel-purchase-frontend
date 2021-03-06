import React, { useState,useEffect } from "react";
// reactstrap Components
import { Container, Row, Col } from "reactstrap";

// core Components
import AuthNavbar from "../Components/Navbars/AuthNavbar";
import AuthFooter from "../Components/Footers/AuthFooter";




function Auth(props) {
        /**
 * if user is logged in and try to go to the auth routes then it will redirect to the dashboard
 */

if(typeof window !=="undefined"){
  
  if(window.location.href.includes('auth')){
    if(localStorage.getItem('authToken')){
      window.location.href="/login";
    }
  }
  
}
 
  // console.log(window.location.pathname);
  React.useEffect(() => {
   
    document.body.classList.add("bg-default");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  }, []);
  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead text-light">
                    Welcome to the nolu login panel
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">{props.children}</Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
}



export default Auth;
