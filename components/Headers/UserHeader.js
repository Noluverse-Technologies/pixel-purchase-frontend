import React, { useEffect,useState } from "react";
import {GetCurrentUserInfo} from "../../services/api/services";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { useRouter } from "next/router";




function UserHeader() {

  const router=useRouter();
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo(){

    GetCurrentUserInfo().then(data => {
  
  console.log("data from user header")
  console.log(data.data[0])
       setUserInfo(data.data[0])
      
     }).catch(err => {
       console.log("error found") 
     });
   
   }
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          // backgroundImage:
          //   "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {userInfo?.firstname}</h1>
              <p className="text-white mt-0 mb-5">
                Welcome to nolu user profile. You can view and update your profile information here.
              </p>
              {/* <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserHeader;
