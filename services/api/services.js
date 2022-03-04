import axios from "axios";
import { baseUrl } from "../../variables/config";






//login service
export function GetCurrentUserInfo(authToken){
    
        return axios.get(baseUrl+"useinfo", { headers: {"Authorization" : `Bearer ${authToken}`} })
        .then(res=>{
            console.log("user information")
            console.log(res)
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



