import React, { useState,useEffect,Fragment } from "react";
import {GetPixelPackagesService} from "../../services/api/services";
import {GetLicensePackagesService} from "../../services/api/services";
import { ToastContainer, toast } from 'react-toastify';
import Events from "../../Components/Events/Events";
import 'react-toastify/dist/ReactToastify.css';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

import MyPixelsTable from "../../Components/MyPixelsTable/MyPixelsTable";

// reactstrap components
import {
  Button,
  Modal, 
  ModalBody, 
  ModalFooter
} from "reactstrap";  
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";
import {GetCurrentUserInfo} from "../../services/api/services";
import {CreateUserSubscriptionService} from "../../services/api/services";
import {purchaseLicenseService} from "../../services/api/services";
import {GetUserSubscriptionsByIdService} from "../../services/api/services";
import {GetEventsService} from "../../services/api/services";


const Pixels = () => {
 
  const [pixelData, setPixelData]=useState([])
  const [licenseData, setLicenseData]=useState([])
  const [currentActiveLicense, setCurrentActiveLicense]=useState(0)
  const [currentActivePixel, setCurrentActivePixel]=useState(null)
  const [pixelPurchaseModalOpen, setPixelPurchaseModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [pixelPurchased, setPixelPurchased] = useState(false);
  const [pixelSubscriptionObj, setPixelSubscriptionObj] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    

    GetPixelPackages(); 
    GetLicensePackages();
    getUserInfo();
    
    getUserSubscriptionsById(userInfo?userInfo:[])
    getEvents();
     
   }, []);

  

  useEffect(() => {
 
    getUserSubscriptionsById(userInfo?userInfo:[])
     
   }, [userInfo]);

   function getUserInfo(){

    GetCurrentUserInfo().then(data => {
  
       setUserInfo(data.data[0])
      
     }).catch(err => {
       console.log("error found") 
     });
   
   }
   //get pixel packages
   function GetPixelPackages(){
 
     GetPixelPackagesService().then(data => {
        console.log("get pixel packages data")
        console.log(data.data.length)
   
        setPixelData(data.data)
        
      }).catch(err => {
        console.log("error found") 
      });
    
    }

   //get events data
   function getEvents(){
 
    GetEventsService().then(data => {
        console.log("getting event data")
        console.log(data.data)
   
        setEventsData(data.data)
        
      }).catch(err => {
        console.log("error found") 
      });
    
    }

   //get license packages
   function GetLicensePackages(){
 
     GetLicensePackagesService().then(data => {
        console.log("get license packages data")
        console.log(data.data)
   
        setLicenseData(data.data)
        
      }).catch(err => {
        console.log("error found") 
      });
    
    }
   

    function chosePixel(p){
      
      setPixelPurchaseModal(!pixelPurchaseModalOpen)
      setCurrentActivePixel(p)
      setCurrentActiveLicense(p.license_id);

    }

  function closePixelConfirmModal(e){
    console.log(e.target.value)
    setPixelPurchaseModal(!pixelPurchaseModalOpen)
    
  }

  function confirmPurchasePixel(){

    setPixelPurchaseModal(!pixelPurchaseModalOpen)
    
    
    let subscriptionObj={
      pixel_id:currentActivePixel.id,
      user_id:userInfo.id,
      subscription_type:userInfo.user_type,
      withdrawal_amount_is_paid:"0",
      pixel_purchase_date:new Date(),
    }
    
    CreateUserSubscription(subscriptionObj)

  }

  function CreateUserSubscription(subscriptionObject){

    CreateUserSubscriptionService(subscriptionObject).then(data => {
          console.log("setPixelSubscriptionObj")
          console.log(data)
          if(data.success){
            toast.success(`🦄 Successfully  ${currentActivePixel.name} purchased!`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              getUserSubscriptionsById(userInfo)
    window.scrollTo({ top: 800, behavior: "smooth" });
    setPixelPurchased(true)
    setPixelSubscriptionObj(data)

          }else{
            toast.error('🦄 Purchase unsuccessful', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });

    window.scrollTo({ top: 600, behavior: "smooth" });

          }
    })
  }
  

  function confirmLicensePurchase(l){
    if (confirm("Confirm Purchase License!") == true) {
      if(pixelPurchased==true){
        console.log("expiration date");
        console.log(l.duration_in_days);
        let today = new Date();
        let expirationDate = new Date();
            expirationDate.setDate(today.getDate()+ parseInt(l.duration_in_days));
            let licensePurchaseObj={
              id:pixelSubscriptionObj?pixelSubscriptionObj.data.id:null,
              license_id:l.id,
              license_purchase_date:new Date(),
              license_duration:l.duration_in_days,
              license_expiration_date:expirationDate,
              withdrawal_amount_is_paid:0,
              has_expired:0,
              nolu_reward_amount:0,
              usdt_reward_amount:0,
            }
  
       purchaseLicense(licensePurchaseObj);
     
      }else{
        toast.error(`🦄 You Must Purchase ${currentActivePixel.name} Pixel first`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    } else {
      toast.error('🦄 Purchase unsuccessful', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    
  }

   function purchaseLicense(licensePurchaseObj){
     
    purchaseLicenseService(licensePurchaseObj).then(data => {
      console.log("trying to create license subscription");
      console.log(data);
      
      
      if(data.success){
        setPixelPurchased(false)
        toast.success(`🦄 Successfully  License purchased!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

          // setTimeout(() => {
          //   window.location.reload()
           
          // }, 6000);


      }else{
        toast.error('🦄 Purchase unsuccessful', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

window.scrollTo({ top: 600, behavior: "smooth" });

      }
})
   }


   function getUserSubscriptionsById(userInfo){
    GetUserSubscriptionsByIdService(userInfo,pageNum).then(data => {
     
      setUserSubscriptions(data?data.data.data:[])
    })
   }
   

  
   const setPaginationValue = (index) => { // the callback. Use a better name
    console.log("index");
    console.log(index);
    setPageNum(index+1);
    getUserSubscriptionsById(userInfo)
  };
  return (
    <>
      <Header />
{/* Modal Starts */}
      <Modal toggle={() => setPixelPurchaseModal(!pixelPurchaseModalOpen)} isOpen={pixelPurchaseModalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
           Confirm Purchase Pixel
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setPixelPurchaseModal(!pixelPurchaseModalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>Confirm Purchase <strong>{currentActivePixel?currentActivePixel.name:''}</strong> ?
        <p><strong>${currentActivePixel?currentActivePixel.price:''}</strong> will be duducted from your account.</p>
        
        {/* wallet input text box starts */}
        <Form role="form" onSubmit={(e) => { handleSubmit(e)}}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Wallet Address"
                    type="text"
                    name="wallet_address"
                    
                  
                  />
                </InputGroup>
              </FormGroup>
              
            </Form>
        {/* wallet input text box ends*/}




        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={(e) => { 
              closePixelConfirmModal(e)
              }}
          >
            Close
          </Button>
          <Button color="success" type="button" onClick={(e) => { 
            console.log("here is e");
            console.log(e);
              confirmPurchasePixel(e)
              }}>
            Confirm Purchase 
          </Button>
        </ModalFooter>
      </Modal>
{/* Modal Ends */}


      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
      
          <div className="col-12 col-md-8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Pixels</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples ">
                  <Col lg="6" md="6" >
                    
                      <p>These special algorithm monitors and facilitate activiey in the <strong>Noluverse</strong></p>
                      <p>Owners receive rewards in $Nolu and $usdt for shared participation in the <strong>Noluverse</strong> backend</p>
                  </Col>
                  <Col lg="6" md="6" >
                   
                    <Row>
                       {/* The below column is going to be repeated */}
                       {pixelData.map(function(d, idx){
                         return (
                    <Col lg="6" md="6" >
                      <Button
                        className="btn-icon-clipboard pointer:none"
                        data-clipboard-text="air-baloon"
                        id="tooltip475504343"
                        type="button"
                        key={d.id}
                        onClick={() => {chosePixel(d)}}
                      >
                        <div>
                          <i className="ni ni-app " />
                         
                        </div>
                        <div>
                          {/* <i className="ni ni-badge" /> */}
                          <h5 className="mt-2">{d.name}</h5>
                        </div>
                        <div>
                          {/* <i className="ni ni-badge" /> */}
                          <h2>${d.price}</h2>
                        </div>
                      </Button>
                    
                    <UncontrolledTooltip
                      delay={0}
                      trigger="hover focus"
                      target="tooltip475504343"
                    >
                      {"Click to purchase this package"}
                    </UncontrolledTooltip> 
                      </Col>
                       )})} 
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-md-4">
          <Events eventData={eventsData?eventsData:[]}></Events>
          </div>
          
        </Row>


        {/* Licenses */}
        <Row className="mt-2">
          <div className="col-12 col-md-8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Nolu Licenses</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <Col lg="6" md="6" >
                    
                      <p>These special algorithm monitors and facilitate activiey in the <strong>Noluverse</strong></p>
                      <p>Owners receive rewards in $Nolu and $usdt for shared participation in the <strong>Noluverse</strong> backend</p>
                  </Col>
                  <Col lg="6" md="6" >
                    <Row id="licenses">
                    {/* The below column is going to be repeated */}
                    
                    {licenseData.map(function(l, idx){
                      return (
                    <Col lg="6" md="6" >
                      <button 
                        disabled={currentActiveLicense === l.id ? false : true}
                        className="btn btn-success licenseButton btn-icon-clipboard pointer:none"
                        data-clipboard-text="air-baloon"
                        id="tooltip475504346"
                        type="button"
                        
                        
                        onClick={() => {
confirmLicensePurchase(l)
                        }}
                      >
                        <div>
                          <i className="ni ni-badge text-center" />
                         
                        </div>
                       
                        <div>
                          {/* <i className="ni ni-badge" /> */}
                         
                          <h6 className="mt-2">extra rewards every day</h6>
                        </div>
                        <div>
                          {/* <i className="ni ni-badge" /> */}
                          <h2>${l.price}</h2>
                        </div>
                      </button>
                    
                    <UncontrolledTooltip
                      delay={0}
                      trigger="hover focus"
                      target="tooltip475504346"
                    >
                      {"Click to purchase this License"}
                    </UncontrolledTooltip>
                      </Col>
                    )})} 
                    </Row>          
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
          {/* <th scope="col">Type</th>  */}
          <MyPixelsTable tableColums={['Serial','Pixel','Creation Date','License Timer','Nolu rewards','USDT Rewards']}  tableData={userSubscriptions?userSubscriptions:[]} pageNum={setPaginationValue} />
        </Row>

      
        <ToastContainer
                      position="top-right"
                      autoClose={500}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      />
                      {/* Same as */}
                      <ToastContainer />
      </Container>
    </>
  );
};

Pixels.layout = Admin;

export default Pixels;
