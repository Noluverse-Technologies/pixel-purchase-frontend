
import { React,useEffect,useState } from "react";
import Moment from 'moment';
// reactstrap Components
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Dropdown,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core Components
import Header from "Components/Headers/Header.js";
import {GetCurrentUserInfo} from "../../services/api/services";
import {GetUserTransactionsByMonthService} from "../../services/api/services";

function Transactions() {
  Moment.locale('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const columns=["entry", "product name", "date of Transaction", `total price($)`]
  //get current month
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()+1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalDebits, setTotalDebits] = useState(0);
 
  
  useEffect(() => {

    getUserInfo();
     
   }, []);

  function getUserInfo(){

    GetCurrentUserInfo().then(data => {

       setUserInfo(data.data[0])
       
     }).catch(err => {
       console.log("error found") 
     });
   
   }

   function getType(item){
     if(item.pixel_id){
       return `Pixel` 
     }
     if(item.license_id){
       return `License` 
     }

     if(item.is_withdrawal_amount_paid){
        return "Withdrawal";
     }

     if(item.is_reward_claimed){
        return "Reward Claimed";
     }

     if(item.nolu_plus_subscription_id){
        return "Nolu Plus Subscription";
     }
   }

   function getPrice(item){
     let totaldebits=0;
     let totalCredits=0
     
     if(item.pixel_id){
       let pprice=item.pixel_amount;
       return pprice;
     }
     if(item.license_id){
       let lprice=item.license_amount;
       
       return lprice;
     }

     if(item.is_withdrawal_amount_paid){
        let wprice=item.withdrawal_fee_amount;
        return wprice;
     }

     if(item.is_reward_claimed){
        let rprice=item.reward_claimed_amount;
        return rprice;
     }
     if(item.nolu_plus_subscription_id){

        let npprice=item.has_nolu_plus_subscription?item.has_nolu_plus_subscription.has_nolu_plus_package.price:"ERROR";
        
        return npprice ;
     }
   }

   function getItemPurchased(item){
     if(item.pixel_id){
       return item.has_pixel.name
     }
     if(item.license_id){
       return item.has_license.name
     }

     if(item.is_withdrawal_amount_paid){
        return "Withdrawal";
     }

     if(item.is_reward_claimed){
        return "Reward Claimed";
     }
     if(item.nolu_plus_subscription_id){
        return item.has_nolu_plus_subscription?item.has_nolu_plus_subscription.has_nolu_plus_package.name:"error occured";
     }
   }

   function getTransactionDate(item){
     console.log("here is item date");
     console.log(item.date);
    return Moment(item.date).format('DD MMM YYYY, h:mm a');
   }

  function GetUserTransactionsByMonth(){
 
    let transactionObj={
      user_id:userInfo?userInfo.id:null,
      month:currentMonth
    }

    GetUserTransactionsByMonthService(transactionObj).then(data => {
       console.log("all user transactions");
       console.log(data.data);
       setTableData(data.data[0])
       setTotalCredits(data.data.total_credits);
       setTotalDebits(data.data.total_debits);
       
     }).catch(err => {
       console.log("error found") 
     });
   
   }


  useEffect(() => {
    GetUserTransactionsByMonth();

  },[currentMonth,userInfo]);


  const months=[
    {name:"January",value:"1"},
    {name:"February",value:"2"},
    {name:"March",value:"3"},
    {name:"April",value:"4"},
    {name:"May",value:"5"},
    {name:"June",value:"6"},
    {name:"July",value:"7"},
    {name:"August",value:"8"},
    {name:"September",value:"9"},
    {name:"October",value:"10"},
    {name:"November",value:"11"},
    {name:"December",value:"12"}
  ]


  function getCurrentMonth(){
    let monthVal=null
       months.forEach((month) => {
      if (month.value == currentMonth) {
      monthVal= month.name;
    }
    
  });
  return monthVal;
  }
 
 


  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Transaction History</h3>
                {/* react strap dropdown month */}
                <Dropdown className="float-right" isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle  caret>{selectedItem?selectedItem.name:getCurrentMonth() }</DropdownToggle>
                    <DropdownMenu>
                      {
                        months.map((month,index)=>{
                          return(
                            <DropdownItem key={index}  onClick={()=>{
                              setCurrentMonth(month.value)
                              setSelectedItem(month)}}>{month.name}</DropdownItem>
                          )
                        })
                      }
                    </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {/* <th scope="col">Entry</th> */}
                    {
                      columns.map((column,index)=>{
                        return(
                          <th scope="col" key={index}>{column}</th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  
                   

                    {
                      tableData?tableData.map((item,index)=>{
                        return(
                          <tr>
                          <td key={"entry"+index}>{getType(item)}</td>
                          <td key={"name"+index}>{getItemPurchased(item)}</td>
                          <td key={"date"+index}>{getTransactionDate(item)}</td>
                          <td key={"price"+index}><h4 className={ getPrice(item) > 0? "ml-0 text-success":"ml-0 text-danger"}>{`${getPrice(item)}`}</h4></td>
                          
                          </tr>
                        )
                      })
                      :null
                    }

                
                </tbody>
              </Table>
              
            </Card>

            <Card className="shadow mt-4">
              <Row className="offset-2 mt-2">
                      <Col lg="4" md="4" >
                      <h3 className="text-muted">Total Credits</h3>
                      </Col>
                   
                      <Col lg="4" md="4" >
                      <h3 className="text-muted">Total Debits</h3>
                      </Col>
                    
                      <Col lg="4" md="4" >
                      Download Statistics
                      </Col>
                </Row>
              <Row className="offset-2 mt-1">
                      <Col lg="4" md="4" className="ml-4" >
                      <h3 className="text-danger">{totalCredits}</h3>
                      </Col>
                   
                      <Col lg="4" md="4" >
                      <h3 className="text-success">{totalDebits.toFixed(2)}</h3>
                      </Col>
                    
                      <Col lg="4" md="4" >

                      </Col>
                </Row>
            </Card>
          </div>
        </Row>
     
      </Container>
    </>
  );
}

Transactions.layout = Admin;

export default Transactions;
