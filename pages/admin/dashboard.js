import React, { useEffect,useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
import CryptoWallet from "../../Components/CryptoWallet/CryptoWallet"; 
import contract from "../../Components/Contracts/SmartContract.json";
import { useRouter } from "next/router";
// reactstrap Components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core Components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  // chartExample2,
} from "variables/charts.js";

import Header from "Components/Headers/Header.js";
import { getDashboardOverview, GetTopTransactionByUserService } from "../../services/api/services";
import { GetCurrentUserInfo } from "../../services/api/services";
import Transactions from "./transactions";
import Moment from 'moment';

const ContractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
const abi = contract.abi;

const Dashboard = (props) => {

  const router=useRouter();


  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const [totalRewardsInNolu, setTotalRewardsInNolu] = useState(0);
  const [totalRewardsInUSDT, setTotalRewardsInUSDT] = useState(0);
  const [totalPixels, setTotalPixels] = useState(0);
  const [totalMonthlyRewardsInNolu, setTotalMonthlyRewardsInNolu] = useState([])
  const [totalMonthlyRewardsInUSDT, setTotalMonthlyRewardsInUSDT] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [barChartData, setBarChartData] = useState(null)
  const [barChartMonths, setBarChartMonths] = useState(null)
  const [barChartData2, setBarChartData2] = useState(null)
  const [barChartMonths2, setBarChartMonths2] = useState(null)
  const [topTransactionByUser, setTopTransactionByUser] = useState(null)

  
  

useEffect(() => {

  // GetTopTransactionByUser();

  GetCurrentUserInfo().then(res=>{
    console.log("result of getting user data");
    console.log(res);
    console.log(res.data[0].id);
    setUserInfo(res.data[0])
    
    getDashboardOverview(res.data[0].id).then(data => {
  
      console.log("here is the user overview data");
      console.log(data);
      
        setTotalRewardsInNolu(data.totalRewardsInNolu);

        setTotalRewardsInUSDT(data.totalRewardsInUSDT);
        setTotalMonthlyRewardsInNolu(data.totalMonthlyRewardsInNolu);
        setTotalMonthlyRewardsInUSDT(data.totalMonthlyRewardsInUSDT);
        setTotalPixels(data.totalPixels)
        
     
    }).catch(err => {
      console.log("error found") 
    });
  })
  
},[])


useEffect(() => {
console.log("this is user info sfaf");
if(userInfo){
GetTopTransactionByUserService(userInfo.id).then(res=>{
      console.log("GetTopTransactionByUser")
      console.log(res.data)
      setTopTransactionByUser(res.data)
    })
  }
},[userInfo])




useEffect(() => {
  let months=[];
  let data=[];
  let months2=[];
  let data2=[];
  console.log("totalMonthlyRewardsInNolu")
  console.log(totalMonthlyRewardsInNolu)

  for(let i=0;i<totalMonthlyRewardsInNolu.length;i++){
    if(totalMonthlyRewardsInNolu[i][0]=="01"){
      months.push("Jan")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="02"){
      months.push("Feb")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="03"){
      months.push("Mar")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="04"){
      months.push("Apr")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="05"){
      months.push("May")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="06"){
      months.push("Jun")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="07"){
      months.push("Jul")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="08"){
      months.push("Aug")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="09"){
      months.push("Sep")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="10"){
      months.push("Oct")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="11"){
      months.push("Nov")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInNolu[i][0]=="12"){
      months.push("Dec")
      data.push(totalMonthlyRewardsInNolu[i][1].toFixed(2))
    }

  }
  for(let i=0;i<totalMonthlyRewardsInUSDT.length;i++){
    if(totalMonthlyRewardsInUSDT[i][0]=="01"){
      months2.push("Jan")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="02"){
      months2.push("Feb")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="03"){
      months2.push("Mar")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="04"){
      months2.push("Apr")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="05"){
      months2.push("May")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="06"){
      months2.push("Jun")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="07"){
      months2.push("Jul")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="08"){
      months2.push("Aug")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="09"){
      months2.push("Sep")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="10"){
      months2.push("Oct")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="11"){
      months2.push("Nov")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }else if(totalMonthlyRewardsInUSDT[i][0]=="12"){
      months2.push("Dec")
      data2.push(totalMonthlyRewardsInUSDT[i][1].toFixed(2))
    }

  }

  console.log("months2")
  console.log(months2)
  setBarChartData(data)
  setBarChartMonths(months)
  setBarChartMonths2(months2) 
  setBarChartData2(data2)
} ,[totalMonthlyRewardsInNolu, totalMonthlyRewardsInUSDT])

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
  console.log("item asli hai");
  console.log(item);
  if(item.pixel_id){
    return item.has_pixel?item.has_pixel.name:""
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


// Example 2 of Chart inside src/views/Index.js (Total orders - Card)
const chartExample2 = {
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value) {
              if (!(value % 10)) {
                //return '$' + value + 'k'
                return value;
              }
            },
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";
          if (data.datasets.length > 1) {
            content += label;
          }
          content += yLabel;
          return content;
        },
      },
    },
  },
  
  data: {
    labels: barChartMonths,
    datasets: [
      {
        label: "Nolu",
        data: barChartData,
        backgroundColor: "#fb6340",
        maxBarThickness: 10,
      },
      {
        label: "usdt",
        backgroundColor: "#5e72e4",
        data: barChartData2,
        maxBarThickness: 10
    },
    ],
  },
};


  const data = {
    labels: [
      'Nolu',
      'Rewards',
      'Redeemable'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [3, totalRewardsInNolu.toFixed(2), 1],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview 
                      <CryptoWallet Contract={contract} ContractAddress={ContractAddress} abi={abi}></CryptoWallet>
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                </Row>
              </CardHeader>


              <CardBody>
                {/* Chart */}
                <div className="chart">
                  {/* <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  /> */}
                  <Pie
                    data={data}
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: false,
                      },
                      tooltips: {
                        bodySpacing: 4,
                        mode: "nearest",
                        intersect: 0,
                        position: "nearest",
                        xPadding: 10,
                        yPadding: 10,
                        caretPadding: 10,
                      },
                    }}
                    ></Pie>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      <span style={{color:"red"}}>*</span> Nolu <span style={{color:"blue"}}>*</span> Usdt
                    </h6>
                    <h2 className="mb-0">Rewards Earned</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Exp code starts */}
 <Row className="mt-4">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Nolu Rewards
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalRewardsInNolu.toFixed(2)}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          USDT Rewards
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalRewardsInUSDT.toFixed(2)} USDT</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Redeemable
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">924</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Pixels
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalPixels}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              
</Row>
{/* Exp code ends */}
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Transaction History</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) =>{
                        router.push('/admin/transactions');
                        
                      } }
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {/* Transaction Table */}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Entry</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Date of Transaction</th>
                    <th scope="col">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                {
                      topTransactionByUser && topTransactionByUser.map((item,index)=>{
                        return(
                          <tr>
                          <td key={"entry"+index}>{getType(item)}</td>
                          <td key={"name"+index}>{getItemPurchased(item)}</td>
                          <td key={"date"+index}>{getTransactionDate(item)}</td>
                          <td key={"price"+index}><h4 className={ getPrice(item) > 0? "ml-0 text-success":"ml-0 text-danger"}>{`${getPrice(item)}`}</h4></td>
                          
                          </tr>
                        )
                      })
                    }
                </tbody>
              </Table>

              
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Nolu Market</h3>
                  </div>
                  {/* <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div> */}
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Price Per Nolu</th>
                    <th scope="col">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">$2.5222</th>
                    <td>$7923,077</td>
                  </tr>
                </tbody>
              </Table>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Change%</th>
                    <th scope="col">Treasury Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><i style={{ color: '#66ff00', size: '50px' }} class="fas fa-chart-line"></i> 2%</th>
                    <td>$7923,077</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Admin

export default Dashboard;
