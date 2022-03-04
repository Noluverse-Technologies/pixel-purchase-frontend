import React, { useState, useEffect } from "react";
import LoginService from "../../services/api/services";


// reactstrap components
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
import Message from "../../components/CustomMessage/Message";
import { useRouter } from "next/router";

function Login() {

  const [email, setEmail] = useState(""); // <--- useState is the hook
  const [password, setPassword] = useState(""); // <--- useState is the hook
  const [message, setMessage] = useState(""); // <--- useState is the hook
  const [messageClass, setMessageClass] = useState(""); // <--- useState is the hook

  const router=useRouter();
  
  const handleSubmit= (e) => {
    e.preventDefault();

    let emailval=e.target["email"].value
    let passwordval=e.target["password"].value

    LoginService({email:emailval, password:passwordval}).then(data => {
      if (data.data.token) {
        localStorage.setItem("authToken", data.data.token);
        // window.location.href = "/";

        router.push({
          pathname: '/admin/dashboard',
          query: { id:data.data.info.id },
        })
        setMessage(data.message);
        setMessageClass("text-success font-weight-400")
      } 
    }).catch(err => {
      setMessage("check your credentials and try again");
      setMessageClass("text-danger font-weight-400");
      localStorage.removeItem("authToken");
    });

  }


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign In with</small>
            </div>
            <Form role="form" onSubmit={(e) => { handleSubmit(e)}}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    // defaultValue="email" {...(register('email'))}
                    autoComplete="new-email"
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
                    
                    // {...register("password")}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
             
              <Message message={message}></Message>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
