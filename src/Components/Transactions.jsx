import React,{useEffect, useState} from 'react'
import { ethers } from 'ethers';
import  './Transactions.css'
import cnt from '../Contract_det.json'




function Transactions() {

const[resaddr,setresaddr]=useState("");
const[amt,setamt]=useState(0);
const[sameadd,setsameadd]=useState(false);
const [currAddress, updateAddress] = useState('0x');
const[loading,setloading] = useState(false);

async function startPayment (){

console.log("aadr",resaddr);
console.log("val",amt)
if(ethers.utils.getAddress(resaddr))
{
  const provider=new ethers.providers.Web3Provider(window.ethereum);
        const signer=provider.getSigner();
const erc20_cnt = new ethers.Contract(cnt.address,cnt.abi,signer);
if(amt===0||amt===undefined)
{
  alert("enter value greater than 0");
}
else
{
const price = ethers.utils.parseUnits(amt, 'ether');
let txn=await erc20_cnt.mint(resaddr, price);
console.log("txn",txn);
setloading(true);
await txn.wait();
setloading(false);
setamt(0)
setresaddr("")
sameadd(false);
alert("HOY minted,check your wallet");

}
}
else
{
  alert("enter a valid address");
}


}


useEffect(()=>{
  getAddress()
},[])


function handlecheck(){
 setsameadd((val)=>!val)
}

useEffect(()=>{
if(sameadd){
  setresaddr(currAddress)
}
else
{
  setresaddr("")
}
},[sameadd])



async function getAddress() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const addr = await signer.getAddress();
  updateAddress(addr);
}



  return (
    <div className="Transfer">
      <h1 className="headd" >HOY token faucet</h1>
        <div className='formip'>
            <label>Enter the address <input type="text" placeholder="0x0000000000000000000000" onChange={(e)=>setresaddr(e.target.value)} value={resaddr}/><br/></label> 
           
           {/* <input type="checkbox" className='check' onChange={handlecheck}/> */}

            <label><input type="checkbox" className='check' onChange={handlecheck}/>Same as the connected wallet<br/></label>
            <label>Enter the amount of ether you want to send <input type="number" placeholder="0.00 ethers"  onChange={(e)=>setamt(e.target.value)}/><br/></label>
            {loading&&<h3>Please wait getting your hoysal tokens</h3>}
        </div>
        <button type="submit" className='sendbtn' onClick={startPayment}>Send</button>
        <div className='ethscan'><h4>Check out the verified contract here:<a target="_blank" href={`https://goerli.etherscan.io/address/${cnt.address}`} >ETHERSCAN</a></h4></div>
    </div>
  )
}

export default Transactions