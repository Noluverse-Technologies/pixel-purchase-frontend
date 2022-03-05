import React, { useEffect,useState } from "react";
import Link from "next/link";
// import { authToken } from "../../variables/config";
import {GetCurrentUserInfo} from "../../services/api/services";
import { useRouter } from "next/router";
import { rootUrl } from "../../variables/config";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

function AdminNavbar({ brandText }) {


  const router=useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [url, setRootUrl] = useState(rootUrl);
  


useEffect(() => {

 getUserInfo();
  
}, []);


function getUserInfo(){
 

 GetCurrentUserInfo().then(data => {
    
    setUserInfo(data.data[0])
    setFirstName(data.data[0].firstname)
    setLastName(data.data[0].lastname)
    
  }).catch(err => {
    console.log("error found") 
  });

}



  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link href="/admin/dashboard">
            <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {brandText}
            </a>
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  {

                    <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={`${url}images/user_profile_pic/${userInfo?.image}`}
                      />
                  </span>
                    }
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {/* get user firstname */}
                      {firstName?firstName:''} {lastName?lastName:''}
                    {/* {JSON.stringify(userInfo.firstname)} */}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/profile">
                  <DropdownItem>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => {e.preventDefault()
              if(typeof window !=='undefined') {
                localStorage.removeItem("authToken");
                window.location.href = "/";
              }
              }
              
              }>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
