import React,{useState,useEffect} from 'react'
import  "./Navbar.css"
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';


function Navbar() {
    const [currAddress, updateAddress] = useState('0x');
    const [connected, toggleConnect] = useState(false);

    const location = useLocation();

    async function getAddress() {
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
       
        const addr = await signer.getAddress();
        updateAddress(addr);
      }

    async function connectWebsite() {

        /*
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if(chainId !== '0x5')
        {
          //alert('Incorrect network! Switch your metamask network');
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
         })
        } */

        await window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(() => {
            //updateButton();
            getAddress();
            window.location.replace(location.pathname)
          });
    }

 

      useEffect(() => {
    
        let val = window.ethereum.isConnected();
        if(val)
        {
          getAddress();
          toggleConnect(val);
         //updateButton();
        }
    
        window.ethereum.on('accountsChanged', function(accounts){
          window.location.replace(location.pathname)
        })
      });
      // console.log(currAddress)

  return (
    <div className="navbar">
         <div className='navbarlnk'>
            <h2><Link to="/transfer" className='tagss' >Transfer crypto</Link></h2>
            <h2><Link to="/balance" className='tagss'>Check balance</Link></h2>
            <h2><Link to="/faucet" className='tagss'>Faucet</Link></h2>
         </div>
        <div className='wallet-btn'>
       <button className="wlt-btn" onClick={connectWebsite}> {connected? "Connected":"Connect Wallet"}</button><br></br>
          {currAddress !== "0x" ? "Connected to":"Not Connected"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
        </div>
    </div>
  )
}

export default Navbar