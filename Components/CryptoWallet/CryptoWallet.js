/*eslint-disable*/
import {React, useEffect, useState} from "react";
import swal from 'sweetalert'; 


// reactstrap Components
import { Container, Row, Col, Nav, NavItem, NavLink,Button } from "reactstrap";



function CryptoWallet({Contract, ContractAddress, abi}) {

    const [currentAccount, setCurrentAccount] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    
    const checkWalletIsConnected = () => { 
        const wallet = window.ethereum;
        console.log("window object")
        console.log(window.ethereum)

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
            setIsDisabled(true);
            let walletConnected=localStorage.getItem('walletConnected'); 
        if(!walletConnected){
            swal({
                title: "Wallet extension found?",
                text: "Wallet browser extension found! You are good to go!",
                icon: "success",
                dangerMode: false,
              })
          } 
          localStorage.setItem('walletConnected', true);   
        }
    }


    useEffect(() => {
        checkWalletIsConnected();
      }, [])

    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if(!ethereum) {
            swal({
                title: "Install the wallet extension",
                text: "Please install wallet to proceed!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                showCancelButton: false,      
                confirmButtonColor: "#DD6B55",
              })
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
   {/* {typeof window.ethereum == 'undefined' &&  */}
   <Button onClick={connectWalletHandler}  className="btn btn-success float-right " >Connect Wallet</Button>
{/* } */}
   {/* {typeof window.ethereum != 'undefined' && 
   <Button onClick={connectWalletHandler} disabled={isDisabled}  className="btn btn-success float-right " >Wallet connected</Button>
} */}
   </>
  );
}

export default CryptoWallet;
