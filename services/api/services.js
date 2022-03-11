import axios from "axios";
import { baseUrl } from "../../variables/config";

//user registration
export function UserRegistration(userInfo){
    return axios.post(baseUrl+"register",userInfo)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        console.log(err);
    })
}


//login service
export default function LoginService(creds){
    return axios.post(baseUrl+"login",creds)
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        console.log(err);
    })
}


//get logged in user information service
export function GetCurrentUserInfo(){
    let authToken=localStorage.getItem("authToken");
        return  axios.get(baseUrl+"useinfo", { headers: {"Authorization" : `Bearer ${authToken}`} })
        .then(res=>{
            console.log("user information")
            console.log(res)
            return res.data;
    
        })
        .catch(err=>{
            console.log(err);
        })
}


//get logged in user information service
export function UpdateUserInfo(updateObj){

    console.log("udpate object");
    let authToken=localStorage.getItem("authToken");
    return axios({
        method: "post",
        url: baseUrl+"user/edit",
        data: updateObj,
        headers: {
            "Authorization" : `Bearer ${authToken}`,
            "Content-type": "multipart/form-data"
        }
      }).then(res=>{
            console.log("user information response" )
            console.log(res)
            return res.data;
    
        })
        .catch(err=>{
            console.log("returns an error");
            console.log(err);
        })
}


//get the list of pixel packages
export function GetPixelPackagesService(){
    let authToken=localStorage.getItem("authToken");
    return  axios.get(baseUrl+"pixel/package/view", { headers: {"Authorization" : `Bearer ${authToken}`} })
    .then(res=>{
        console.log("here is pixel data")
        console.log(res.data.data[0])
        return res.data;
    })
    .catch(err=>{
        console.log(err);
    })
}

//get the list of license packages
export function GetLicensePackagesService(){
    let authToken=localStorage.getItem("authToken");
    return  axios.get(baseUrl+"license/package/view", { headers: {"Authorization" : `Bearer ${authToken}`} })
    .then(res=>{
        console.log("here is license data")
        console.log(res.data.data[0])
        return res.data;
    })
    .catch(err=>{
        console.log(err);
    })
}


//create user subscription
export function CreateUserSubscriptionService(subscriptionObj){
    let authToken=localStorage.getItem("authToken");
    return axios({
        method: "post",
        url: baseUrl+"subscribe/create",
        data: subscriptionObj,
        headers: {
            "Authorization" : `Bearer ${authToken}`,
            "Content-type": "application/json"
        }
      })
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        console.log(err);
    })
}
export function purchaseLicenseService(licenseObject){
    let authToken=localStorage.getItem("authToken");
    return axios({
        method: "post",
        url: baseUrl+"subscribe/edit",
        data: licenseObject,
        headers: {
            "Authorization" : `Bearer ${authToken}`,
            "Content-type": "application/json"
        }
      })
    .then(res=>{
        return res.data;
    })
    .catch(err=>{
        console.log(err);
    })
}


export function GetUserSubscriptionByIdService(user_id,pageNum){
    let authToken=localStorage.getItem("authToken");
    return  axios.get(baseUrl+"subscribe/view/"+user_id+"?page="+pageNum, { headers: {"Authorization" : `Bearer ${authToken}`} })
    .then(res=>{
        console.log("here is user subscription data")
        console.log(res.data.data[0])
        return res.data;
    })
    .catch(err=>{
        console.log(err);
    })
}
