import React,{useEffect, useState} from 'react'
import { ethers } from 'ethers';
import Tile from './Tile';
import  './Balance.css'
const axios = require('axios')


function Balance() {

  const [currAddress, updateAddress] = useState('0x');
  const[balance,updatebalance]=useState([])
  const [metadata,setmetadat]=useState([])
  const [connected,setconnected] = useState(false)

//this is done using API to fetch the balance, a implementation with out API is also done at the end of the file

   const baseURL="https://eth-mainnet.g.alchemy.com/v2/iLNhqSPfsgaQBMh8rZb50EV_ADBYDGGq"
        // const address = '0xf57d762b6eCe30242c4A2a1c022ed155eD5FbA83'
        
        useEffect(()=>{
          if(connected)
          {
            req();
          }
          
          getAddress();
        })
       useEffect(() => {
        
       callmetadata();
      },[balance])


      function req(){

        const data = JSON.stringify({
            "jsonrpc": "2.0",
            "method": "alchemy_getTokenBalances",
            "headers": {
              "Content-Type": "application/json"
            },
            "params": [
              `${currAddress}`,
              "DEFAULT_TOKENS",
            ],
            "id": 42
          });
          
          const config = {
            method: 'post',
            url: baseURL,
            headers: {
              'Content-Type': 'application/json'
            },
            data : data
          };
        axios(config)
        .then(response =>{ //console.log(response['data']['result'])
        updatebalance(response['data']['result'].tokenBalances)
      })
        .catch(error => console.log('error', error));
      }

     

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      async function getAddress() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer =  provider.getSigner();
        const addr = await signer.getAddress();
        updateAddress(addr);
        setconnected(true)
      }
      function callmetadata() {
        balance.slice(0,20).map((item)=>{
           getmetadat(item.contractAddress)
      })}

      function getmetadat(tokenAddr){
        
        var data = JSON.stringify({
          "jsonrpc": "2.0",
          "method": "alchemy_getTokenMetadata",
          "params": [
            `${tokenAddr}`
          ],
          "id": 42
        });
        
        var config = {
          method: 'post',
          url: baseURL,
          headers: {
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
        let obj=JSON.stringify(response.data, null, 2)
        obj=JSON.parse(obj)
        setmetadat(oldarr=>[...oldarr, obj]);
        })
        .catch(function (error) {
          console.log(error);
        });

      
      }

     

  return (
    <div>
      {!(metadata.length>20)?(<div class="loader">Loading...</div>):(  <div>
      <h1 className="headd">Balance of top 20 ERC-20's held by you</h1>
   
      { 
    connected ?((metadata.length>8) && balance.slice(0,20).map((item,index)=>{
         return          <Tile meta={metadata[index]} bal={item.tokenBalance} />

        })):<div>Please connect your Metamask to view balance</div>
      }
      
     {/* {(metadata.length<8) && (<button onClick={req} className="btn">Get Balance</button>)} */}
    </div>)}
  
</div>
  )

}

export default Balance








    //This implementation is based on reading balance directly from the blockchain using Balanceof function on the contract but there is no data regarding Contract address of ERC-20 for all tokens




    //  async function getbal (){
    //     let tokenAddress = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0';
    //   getAddress();
        
    //   // The minimum ABI to get ERC20 Token balance
    //   let minABI = 
    //    [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
      
    //   // Get ERC20 Token contract instance
    //   let contract =  new ethers.Contract(tokenAddress, minABI, provider);    
    //   if(currAddress==='0x')
    //   {
    //     console.log("error addr")
    //   }
    //   else
    //   {
    //      const balance =await contract.balanceOf(currAddress);
    //     //  const dec=await contract.decimals();
    //     //  const bal=balance.div(10**dec);
    //     const bal=ethers.utils.formatEther(balance);

    //      console.log(bal)
    //   }
    //   getAddress();
    //   }

    //    // Call balanceOf function
    //   contract.balanceOf(currAddress, (error, balance) => {
    //     // Get decimals
    //     contract.decimals((error, decimals) => {
    //       // calculate a balance
    //       balance = balance.div(10**decimals);
    //       console.log(balance.toString());
    //     });
    //   });
      
      


