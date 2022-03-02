import axios from "axios";

const baseUrl="http://localhost:3000/api/";



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