// layout for this page
import Admin from "layouts/Admin.js";
// core Components
import Header from "Components/Headers/Header.js";

 /*eslint-disable*/
 import React, { useEffect,useState } from "react";
 import Moment from 'moment';
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
 // reactstrap Components
 import { Container, Row, Col} from "reactstrap";
 
 import {CreateNoluPlusSubscriptionService} from "../../services/api/services";
 import {GetCurrentUserInfo} from "../../services/api/services";
 import {GetNoluPlusPackageByIdService} from "../../services/api/services";
 import {getAllNoluPlusSubscriptionsByUser} from "../../services/api/services";
 
import swal from "sweetalert";
import { noluPlusPackageId } from "../../variables/config";
 

function NoluPlus() {

  const [userInfo, setUserInfo] = useState(null);
  const [noluPlusPackageInfo, setNoluPlusPackageInfo] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null)

  useEffect(() => {
    Moment.locale('en');
    getUserInfo()
    getNoluPlusPackageId()
    
     
   }, []);
  useEffect(() => {
 
    getNoluPlusUserSubscription();
     
   }, [userInfo]);
  

  function confirmAndPurchase(){
    swal({
      title: "You are one click away to purchase nolu plus?",
      text: "Are you sure?",
      icon: "info",
      buttons: true,
      dangerMode: false,
      showCancelButton: true,      
      confirmButtonColor: "black",
  }).then(function(result){
    if(result){
      let subscriptionObject={
        "user_id": userInfo.id,
        "has_expired": 0,
        "nolu_plus_package_id": noluPlusPackageId
      }
      CreateNoluPlusSubscription(subscriptionObject)
    }else {
      console.log("cancel clicked")
    }

  });
  }


  function CreateNoluPlusSubscription(subscriptionObject){



    CreateNoluPlusSubscriptionService(subscriptionObject).then(data => {
         
          if(data.success){
            swal({
              title: "Congrats!!",
              text: "You are now a nolu plus subscriber!",
              icon: "success",
              dangerMode: false,
            }).then(function(){
              window.location.reload()
            })
  
            setExpirationDate(data.expiration_date)
            
    

          }else{
            swal({
              title: "OOPS!!",
              text: "Purchase unsuccessful!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
              showCancelButton: false,      
              confirmButtonColor: "#DD6B55",
            })


          }
    })
  }

  function getUserInfo(){

    GetCurrentUserInfo().then(data => {
  
       setUserInfo(data.data[0])
      
     }).catch(err => {
       console.log("error found") 
     });
   
   }

  function getNoluPlusPackageId(){

    let packageId={
      "id":noluPlusPackageId
    }

    GetNoluPlusPackageByIdService(packageId).then(data => {
  
       console.log("here is the package info for noluplus");
       console.log(data.data[0]);
       setNoluPlusPackageInfo(data.data[0])
      
     }).catch(err => {
       console.log("error found") 
     });
   
   }


  function getNoluPlusUserSubscription(){

    let userId={
      "user_id":userInfo?userInfo.id:null
    }

    getAllNoluPlusSubscriptionsByUser(userId).then(data => {
  
       console.log("here is the subscription info for noluplus");
       console.log(data.data[0].expiration_date);
       setExpirationDate(data.data[0].expiration_date)
      
     }).catch(err => {
       console.log("error found") 
     });
   
   }
  
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
                    
                       <h5><i className="ni ni-check-bold text-success" /> {noluPlusPackageInfo?noluPlusPackageInfo.discount_percentage:0}% more rewards</h5>  
                       <h5><i className="ni ni-check-bold text-success" /> {noluPlusPackageInfo?noluPlusPackageInfo.discount_on_stores:0} % discounts on nolu stores</h5>
                       <h5><i className="ni ni-check-bold text-success" /> {noluPlusPackageInfo?noluPlusPackageInfo.withdrawal_fee:0}% withdrawal fee</h5>
                       <h5><i className="ni ni-check-bold text-success" /> VIP access to events</h5>
                       <h5><i className="ni ni-check-bold text-success" /> Exclusive access to gaming launch</h5>
                       <h5><i className="ni ni-check-bold text-success" /> Free entry to tournaments</h5>
                       <h5><i className="ni ni-check-bold text-success" /> Exclusive access to limited edition skins and items</h5>
                      
                  </Col>
                  <Col lg="6" md="6" >
                   
                    <Row>
                    <Col lg="10" md="10" >
                    <Card className="shadow">
<strong className="mt-2" style={{margin: "auto",fontSize:"50px"}}> ${noluPlusPackageInfo?noluPlusPackageInfo.price:0}</strong>
<Button disabled={userInfo?userInfo.is_nolu_plus?true:false:null}
                        className="btn btn-outline-warning btn-sm w-50 mb-4 mt-3"
                        style={{margin: "auto"}}
                        id="tooltip475504343"
                        type="button"
                       
                        onClick={() => {confirmAndPurchase()}}
                      >
                      {userInfo?userInfo.is_nolu_plus?"Subscribed":"Buy Now":null}
                      
                      </Button>
                      
                      
                        </Card>
                        
                        {userInfo?userInfo.is_nolu_plus?
                      
                      <small className="d-flex justify-content-center mb-1  text-primary mt-1" > Subscription valid till&nbsp;&nbsp;   <strong> {Moment(expirationDate).format("LL")}</strong></small>
                                            
                                            :"":null}
                   
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
