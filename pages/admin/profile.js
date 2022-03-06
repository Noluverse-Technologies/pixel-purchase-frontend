import React, { useEffect,useState } from "react";
// import { Spinner } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import {GetCurrentUserInfo} from "../../services/api/services";
import {UpdateUserInfo} from "../../services/api/services";
import { useRouter } from "next/router";
import { rootUrl } from "../../variables/config";





function Profile() {

  const notify = () => toast("Wow so easy!");

  const router=useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [url, setRootUrl] = useState(rootUrl);
  const [isClicked, setIsClicked] = useState(false);
  const [changePasswordType, setChangePasswordType] = useState("password");
  const [showHidePassword, setShowHidePassword] = useState("fa fa-eye");

  const [formValue, setformValue] = React.useState({
    firstname: '',
    lastname: '',
    wallet_address: '',
    image:'',
    password:''
  });


  useEffect(() => {

    getUserInfo();
     
   }, []);


function getUserInfo(){

  GetCurrentUserInfo().then(data => {
     console.log("data.data[0]")
     console.log(data.data[0].wallet_address)

     setUserInfo(data.data[0])
     setFirstName(data.data[0].firstname)
     setLastName(data.data[0].lastname)
     setWalletAddress(data.data[0].wallet_address)
     setProfileImage(data.data[0].image)
     setProfileImage(data.data[0].image);
     
     
   }).catch(err => {
     console.log("error found") 
   });
 
 }



const handleSubmit = (event) => {
  setIsClicked(true)
  event.preventDefault()

  // store the states in the form data
  const profileFormData = new FormData();
  profileFormData.append("id", userInfo.id)
  profileFormData.append("firstname", formValue.firstname?formValue.firstname:'')
  profileFormData.append("lastname", formValue.lastname?formValue.lastname:'')
  profileFormData.append("wallet_address", formValue.walletAddress?formValue.walletAddress:'')
  profileFormData.append("password", formValue.password?formValue.password:'')
  if(selectedImage){
    profileFormData.append("image", selectedImage)
  }
  // profileFormData.append("image", selectedImage?selectedImage:'')
  

  UpdateUserInfo(profileFormData).then(data => {
  if(!data){
    toast.error('🦄 Could not update', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }else{
    toast.success('🦄 Successfully Updated!', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  window.location.reload()
    setIsDisabled(true)
  }).catch(err => {
    
    toast.error('🦄 Could not update', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  });
  }

  const showHidePwd = () => {
    if (changePasswordType === "password") {
      setChangePasswordType("text");
      setShowHidePassword("fa fa-eye-slash");
    } else {
      setChangePasswordType("password");
      setShowHidePassword("fa fa-eye");
    }
  };

  const handleChange = (event) => {
    setIsDisabled(false)
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }


  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={`${url}images/user_profile_pic/${profileImage?profileImage:''}`}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {/* <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button> */}
                  {/* <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    changess
                  </Button> */}
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                {/* <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row> */}
                <div className="text-center mt-7">
                  <h3>
                    {firstName} {lastName}
                    {/* <span className="font-weight-light">, 27</span> */}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  {/* <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div> */}
                  <div>
                    <i className="ni education_hat mr-2" />
                    User Subscription Type
                  </div>
                  <hr className="my-4" />
                  <p>
                    Full Name: {firstName?firstName:''} {lastName?lastName:''} 
                  </p>
                  <p>
                    Role: {userInfo?.has_role[0].name}
                  </p>
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              {/* <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                      
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader> */}
              <CardBody>
                <Form onSubmit={handleSubmit}>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      disabled={isDisabled}
                      size="sm"
                      type="submit"
                      style={{marginBottom: "0.7rem"}}
                      
                    >
                      Save 
                   
                    </Button>
                    {/* { isClicked == true && */}
                      
                    {/* } */}

                  {/* <Spinner 
                      color="white"
                      style={{ width: "2rem", height: "2rem", borderWidth: ".3rem", backgroundColor:"#323261" }}
                    /> */}
                    
                  </Col>
                </Row>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            User Role
                          </label>
                          <Input
                          disabled={true}
                            className="form-control-alternative"
                            defaultValue={userInfo?.has_role[0].name}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            disabled={true}
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={userInfo?.email}
                            placeholder="jessse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo?userInfo.firstname:''}
                            id="input-first-name"
                            placeholder="First name"
                            name="firstname"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo?userInfo.lastname:''}
                            id="input-last-name"
                            placeholder="Last name"
                            name="lastname"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                      <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Update Profile Image
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo?userInfo.image:''}
                            id="input-img-upload"
                            placeholder="Profile Image"
                            name="profileImage"
                            type="file"
                            onChange={(event) => {
                              setIsDisabled(false)
                              
                              setSelectedImage(event.target.files[0]);
                            }}
                          />
                        </FormGroup>
                        </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Wallet information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Wallet Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo?userInfo.wallet_address:''}
                            id="input-address"
                            placeholder="Wallet Address"
                            name="walletAddress"
                            onChange={handleChange}
                            type="text"
                            
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="10">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Change Password <small>Minimum 6 charecters</small>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            type={changePasswordType}
                            
                          />
                          
                        </FormGroup>
                        
                      </Col>
                      <Col md="2">
                      <button type="button" className="btn btn-pwd-view shadow-none"><i className={showHidePassword} onClick={showHidePwd}></i></button>
                        
                      </Col>
                    </Row>
                  </div>
                  {/* <hr className="my-4" /> */}
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">My Pixels</h6> */}
                  <div className="pl-lg-4">
                    
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
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
                  
                    {/* <FormGroup>
                    
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="This user has no pixels"
                        type="textarea"
                      />
                    </FormGroup> */}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Profile.layout = Admin;

export default Profile;
