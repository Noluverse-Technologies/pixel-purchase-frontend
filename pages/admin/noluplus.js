// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";

 /*eslint-disable*/
 import React, { useEffect,useState } from "react";

 import { 
     Card,
     CardHeader,
     CardBody,
     CardFooter,
     Pagination,
     PaginationItem,
     PaginationLink,
     Button,
     Table,
     UncontrolledTooltip,
     FormGroup,
     Form
 } from "reactstrap";
 // reactstrap components
 import { Container, Row, Col} from "reactstrap";
 import {GetAllUserSubscriptionsByUser} from "../../services/api/services";
 import {GetCurrentUserInfo} from "../../services/api/services";

function NoluPlus() {

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
              
    <Row className="mt-5 offset-1">
    <Col xl="8">
    <Card className="shadow">
    <CardHeader className="bg-transparent">
                <h1 className="mb-0 text-primary">Nolu +</h1>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples ">
                  <Col lg="6" md="6" >
                    
                       <h5><i className="ni ni-check-bold text-success" /> 10% more rewards</h5>
                       <h5><i className="ni ni-check-bold text-success" /> 15% discounts on nolu stores</h5>
                       <h5><i className="ni ni-check-bold text-success" /> 3% withdrawal fee</h5>
                       <h5><i className="ni ni-check-bold text-success" /> VIP access to events</h5>
                       <h5><i className="ni ni-check-bold text-success" /> Exclusive access to gaming launch</h5>
                       <h5><i className="ni ni-check-bold text-success" /> Free entry to tournaments</h5>
                       <h5><i className="ni ni-check-bold text-success" /> Exclusive access to limited edition skins and items</h5>
                      
                  </Col>
                  <Col lg="6" md="6" >
                   
                    <Row>
                    <Col lg="10" md="10" >
                    <Card className="shadow">
<strong className="mt-2" style={{margin: "auto",fontSize:"50px"}}> $39</strong>
<Button
                        className="btn btn-outline-warning btn-sm w-50 mb-5 mt-3"
                        style={{margin: "auto"}}
                        id="tooltip475504343"
                        type="button"
                       
                        onClick={() => {chosePixel(d)}}
                      >
                      Buy Now
                      </Button>
                        </Card>
                     
                    
                   
                      </Col>
                      
                    </Row>
                  </Col>
                </Row>
              </CardBody>
    </Card>
    </Col>
  </Row>
      </Container>
    </>
  );
}

NoluPlus.layout = Admin;

export default NoluPlus;
