import axios from "axios";
import { baseUrl } from "../../variables/config";







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

