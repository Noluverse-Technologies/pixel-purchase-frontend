import React, { useState,useEffect,Fragment } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
import {GetPixelPackagesService} from "../../services/api/services";
import {GetLicensePackagesService} from "../../services/api/services";
import { Dialog,Transition } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
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
} from "reactstrap";



// reactstrap components
import {
  Button,
  Media,  
  Badge,
  Progress,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table, 
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


const Pixels = () => {
  // const [copiedText, setCopiedText] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [pixelData, setPixelData]=useState([])
  const [licenseData, setLicenseData]=useState([])
  const [currentActiveLicense, setCurrentActiveLicense]=useState(0)
  const [currentActivePixel, setCurrentActivePixel]=useState(null)
  let [isOpen, setIsOpen] = useState(true)
  const [pixelPurchaseModalOpen, setPixelPurchaseModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [pixelPurchased, setPixelPurchased] = useState(false);
  const [pixelSubscriptionObj, setPixelSubscriptionObj] = useState(null);

  useEffect(() => {
    

    GetPixelPackages(); 
    GetLicensePackages();
    getUserInfo();
     
   }, []);

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
      subsctiption_type:userInfo.user_type,
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
        toast.success(`🦄 Successfully  ${currentActivePixel.name} purchased!`, {
          position: "top-right",
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

          setTimeout(() => {
            let reload=window.location.reload()
            alert(reload)
          }, 1000);


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
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Events</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <Col lg="12" md="12">
                 Events will appear here
                  </Col>
                </Row>
              </CardBody>
            </Card>
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
        </Row>

       
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="10" sm="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">My Pixels (5)</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Serial</th>
                    <th scope="col">Type</th>
                    <th scope="col">Creation Date</th>
                    <th scope="col">License Timer</th>
                    <th scope="col">Nolu rewards</th>
                    <th scope="col">USDT Rewards</th>
                    <th scope="col">Claim</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          
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
