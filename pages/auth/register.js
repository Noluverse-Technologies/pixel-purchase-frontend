import React, { useEffect,useState } from "react";
import {UserRegistration} from "../../services/api/services";
// import { Spinner } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// reactstrap Components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import { useRouter } from "next/router";


function Register() {
  const router=useRouter();
  const [isDisabled,setIsDisabled] = useState(true);
  const [passwordMatched,setPasswordMatched] = useState("No");
  const [pwdMatchClass,setPwdMatchClass] = useState("text-danger font-weight-700");
  const [pwd,setPwd] = useState();
  const [c_pwd,setCPwd] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const [formValue, setformValue] = useState({
    firstname: '',
    lastname: '',
    email: '',
    wallet_address: '',
    password:'',
    c_password:'',
    role:3,
    image:''
  });


  //submit functionality
  const handleSubmit = (event) => {
    event.preventDefault()

  // store the states in the form data
  const registrationFormData = new FormData();
  
  registrationFormData.append("firstname", formValue.firstname?formValue.firstname:'')
  registrationFormData.append("lastname", formValue.lastname?formValue.lastname:'')
  registrationFormData.append("wallet_address", formValue.walletAddress?formValue.walletAddress:'')
  registrationFormData.append("password", formValue.password?formValue.password:'')
  registrationFormData.append("c_password", formValue.c_password?formValue.c_password:'')
  registrationFormData.append("role", formValue.role?formValue.role:'')
  registrationFormData.append("email", formValue.email?formValue.email:'')

  if(selectedImage){
    registrationFormData.append("image", selectedImage)
  }
  // registrationFormData.append("image", selectedImage?selectedImage:'')
  

  UserRegistration(registrationFormData).then(data => {
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
      router.replace('/auth/login')
  }
  // window.location.reload()
    // setIsDisabled(true)
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



  const handleChange = (event) => {
   console.log("form value length");
   if(formValue["firstname"] && formValue["lastname"] && formValue["password"] && formValue["c_password"] ){

    if(event.target.name=="c_password"){
      //confirm password validation
 
     if(formValue["password"].length >=6){
       if(formValue["password"]===event.target.value){
         setPasswordMatched("Yes")
         setIsDisabled(false)
         setPwdMatchClass("text-success font-weight-700")
       }else{
         setPasswordMatched("No")
         setIsDisabled(true)
         setPwdMatchClass("text-danger font-weight-700")
       }
     }
    }
   }
   else{
    setIsDisabled(true);
   }
    setformValue({ ...formValue, [event.target.name]: event.target.value });
  //  setIsDisabled(false)
   
   
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="First Name" name="firstname" type="text" onChange={handleChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Last Name" name="lastname" type="text" onChange={handleChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Wallet Address" name="wallet_address" type="text" onChange={handleChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="new-email"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    name="c_password"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    {/* <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText> */}
                  </InputGroupAddon>
                  <Input
                            className="form-control-alternative"
                            id="input-img-upload"
                            placeholder="Profile Image"
                            name="profileImage"
                            type="file"
                            onChange={(event) => {
                              setIsDisabled(false)
                              
                              setSelectedImage(event.target.files[0]);
                            }}
                          />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                
                <small className="float-right mt-1">
                  password matched:{" "}
                  
                  <span className={pwdMatchClass}>{passwordMatched}</span>
                </small>
                <p><small> password must be minimum 6 charecters{" "}</small></p>
              </div>
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
              <div className="text-center">
                <Button disabled={isDisabled} className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

Register.layout = Auth;

export default Register;
