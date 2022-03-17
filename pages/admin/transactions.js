
import { React,useEffect,useState } from "react";
import Moment from 'moment';
// reactstrap components
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
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";
import {GetCurrentUserInfo} from "../../services/api/services";
import {GetUserTransactionsByMonthService} from "../../services/api/services";

function Tables() {
  Moment.locale('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const columns=["entry", "product name", "date of purchase", "total price"]
  //get current month
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()+1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [tableData, setTableData] = useState([]);
 
  
  useEffect(() => {

    getUserInfo();
     
   }, []);

  function getUserInfo(){

    GetCurrentUserInfo().then(data => {
       console.log("into user information from transaction");
       console.log(data);
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
   }

   function getPrice(item){
     
     if(item.pixel_id){
       let pprice=item.pixel_price;
       return pprice;
     }
     if(item.license_id){
       let lprice=item.license_price;
       return lprice;
     }

     if(item.is_withdrawal_amount_paid){
        let wprice=item.withdrawal_amount;
        return wprice;
     }

     if(item.is_reward_claimed){
        let rprice=item.reward_amount;
        return rprice;
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
   }

   function getTransactionDate(item){
    return Moment(item.date).format('d MMM, h:mm a');
   }

  function GetUserTransactionsByMonth(){

    let transactionObj={
      user_id:1,
      month:currentMonth,
    }

    GetUserTransactionsByMonthService(transactionObj).then(data => {
       console.log("all user transactions");
       console.log(data.data);
       setTableData(data.data)
       
     }).catch(err => {
       console.log("error found") 
     });
   
   }


  useEffect(() => {
    console.log("currentMonth change triggered");
    console.log(currentMonth);
    GetUserTransactionsByMonth();

  },[currentMonth]);


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
                  
                    {/* <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/bootstrap.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Pixel
                          </span>
                        </Media>
                      </Media>
                    </th> */}

                    {
                      tableData?tableData.map((item,index)=>{
                        return(
                          <tr>
                          <td key={"entry"+index}>{getType(item)}</td>
                          <td key={"name"+index}>{getItemPurchased(item)}</td>
                          <td key={"date"+index}>{getTransactionDate(item)}</td>
                          <td key={"price"+index}>{"hello"}</td>
                          
                          </tr>
                        )
                      })
                      :null
                    }
                   
                
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
     
      </Container>
    </>
  );
}

Tables.layout = Admin;

export default Tables;
