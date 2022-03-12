// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";

 /*eslint-disable*/
 import React, { useEffect,useState } from "react";
 import Moment from 'moment';
 import Link from "next/dist/client/link";
 import { 
     Card,
     CardHeader,
     CardFooter,
     Pagination,
     PaginationItem,
     PaginationLink,
     Button,
     Table,
     FormGroup,
     Form
 } from "reactstrap";
 // reactstrap components
 import { Container, Row, Col} from "reactstrap";
 import {GetAllUserSubscriptionsByUser} from "../../services/api/services";
 import {GetCurrentUserInfo} from "../../services/api/services";

function AllPixels() {

    const [userInfo, setUserInfo] = useState([]);
    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const [tableColums, setTableColums] = useState(['Serial','Pixel','Creation Date','License Timer','Nolu rewards','USDT Rewards','Claim Reward']);


    useEffect(() => {
        getUserInfo();
        
    } ,[])

    // useEffect(() => {
    // console.log("calue of user info iss")
    // console.log(userInfo?userInfo:null)
    // getAllUserSubscriptionsById(userInfo?userInfo.id:null);

    // } ,[userInfo])




    function getUserInfo(){

        GetCurrentUserInfo().then(data => {
            setUserInfo(data.data[0])  
            getAllUserSubscriptionsById(data.data[0]);
          
         }).catch(err => {
           console.log("error found") 
         });
       
       }



    function getAllUserSubscriptionsById(userInfo){
        GetAllUserSubscriptionsByUser(userInfo).then(data => {
          console.log("getUserSubscriptionsById")
          console.log(data)
          setUserSubscriptions(data.data)
        })
       }

       const claimReward = (licenseAvailable) => {

            if(licenseAvailable){
                return false;
            }else
            {
                return true;
            }
       }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
              
    <Row className="mt-5">
    <Col className="mb-5 mb-xl-0" xl="12" sm="12">
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              
              
              <h3 className="mb-0">My Pixels ({userSubscriptions?userSubscriptions.length:0})
              
              
              </h3>
          

            
            </div>
            <div className="col text-right">
              <Button
              
                color="warning"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
               Claim All
              </Button>
            </div>
          </Row>
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {tableColums.map((cl)=>{
                  return(
                <th scope="col">{cl}</th>
                  );

              })}
            </tr>
          </thead>
          <tbody>
          {/* 'Serial','Creation Date','License Timer','Nolu rewards','USDT Rewards','Claim' */}

{userSubscriptions?userSubscriptions.map((td,index)=>{
    return(
        <tr>
        <td>{td.id}</td>
        <td>
        <Link href="/admin/pixels">
                <a className="h4 mb-0 ml-0 text-primary text-lowercase d-none d-lg-inline-block">
                {td["has_pixel"].short_name}
                </a>
                
            </Link>
       </td>
        <td>{Moment(td.pixel_purchase_date).format('d MMM Y')}</td>
        <td>{td.license_purchase_date?Moment(td.license_purchase_date).format('d MMM Y'):"N/A"}</td>
        <td>{td.license_purchase_date?td.nolu_reward_amount:"N/A"}</td>
        <td>{td.license_purchase_date?td.usdt_reward_amount:"N/A"}</td>
        <td>
        <div className="col text-right">
              <Button
              disabled={claimReward(td.license_purchase_date)}
                color="warning"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
               Claim 
              </Button>
            </div>
        </td>
        </tr>
    );
    }):''}
           
          </tbody>
        </Table>
        <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {/* <PaginationItem className={pageNumber>1?"":"disabled"}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {e.preventDefault()
                            setPageNumber(pageNumber-1)
                            pageNum(pageNumber)
                        }}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem> */}
                   
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {e.preventDefault()
                            setPageNumber(pageNumber+1)
                            pageNum(pageNumber)
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
      </Card>
    </Col>
    
  </Row>
      </Container>
    </>
  );
}

AllPixels.layout = Admin;

export default AllPixels;
