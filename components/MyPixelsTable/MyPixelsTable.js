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
    CardColumns,
    CardBody

} from "reactstrap";
// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

function MyPixelsTable({tableColums,tableData,pageNum}) {

    const [claimAllDisabled, setClaimAllDisabled] = useState(false);
    const [tablularData, setTabularData] = useState(tableData);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        Moment.locale('en');
       
    },[])

    useEffect(() => {
        console.log("state updated")
        console.log(pageNumber)
       
    },[pageNumber])

    
const returnNoData = () => {
    return (
        <>
        <p>no data</p>
        </>
    )
}
    


  return (
      
    <Row className="mt-5">
    <Col className="mb-5 mb-xl-0" xl="13" sm="12">
      <Card className="shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <div className="col">
              
              
              <h3 className="mb-0">My Pixels ({tableData?tableData.length:0})
              
              <Link href="/admin/allpixels">
                <a className="small  mb-0 ml-3 text-primary text-lowercase d-none d-lg-inline-block">
                see all
                </a>
                
            </Link>
              </h3>
          

            
            </div>
            {tableData.length > 0 &&
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
}
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

{tableData.map((td,index)=>{
    return(
        <tr>
        <td>{td.id}</td>
        <td>
        <Link href="/admin/pixels">
                <a className="h4 mb-0 ml-0  text-primary text-lowercase d-none d-lg-inline-block">
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
              disabled={td.license_purchase_date?false:true}
                color="warning"
                href="#pablo"
                onClick={(e) => {
                    e.preventDefault()
                    console.log("claim object")
                    console.log(td)

                }}
                size="sm"
              >
               Claim 
              </Button>
            </div>
        </td>
        </tr>
    );
    })}
           
          </tbody>
        </Table>
        
        {tableData.length == 0 &&
          <h2 className="d-flex mt-4 text-muted justify-content-center">
          No Pixels
        </h2>
      }
        
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
  );
}

export default MyPixelsTable;



    