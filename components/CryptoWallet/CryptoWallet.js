/*eslint-disable*/
import {React, useEffect, useState} from "react";
import swal from 'sweetalert';


// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink,Button } from "reactstrap";



function CryptoWallet({Contract, ContractAddress, abi}) {

    const [currentAccount, setCurrentAccount] = useState(null);
    
    const checkWalletIsConnected = () => { 
        const wallet = window;

        if(!wallet){
           

            swal({
                title: "Wallet not connected?",
                text: "Please install wallet to proceed!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                showCancelButton: false,      
                confirmButtonColor: "#DD6B55",
              })
        }else{
            

            swal({
                title: "Wallet extension found?",
                text: "Wallet browser extension found! You are good to go!",
                icon: "success",
                dangerMode: false,
              })
        }
    }


    useEffect(() => {
        checkWalletIsConnected();
      }, [])

    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if(!ethereum) {
            alert("Wallet is not installed");
        }

        try{
            const accounts= await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Found an account! Address is: ', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch(err){
            console.log(err)
        }
     }

  return (
   <>
   <Button onClick={connectWalletHandler}  className="btn btn-success float-right ">Connect Wallet</Button>
   </>
  );
}

export default CryptoWallet;
