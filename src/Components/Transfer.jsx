import React,{useEffect, useState} from 'react'
import style from "./Transfer.css"
import { ethers } from 'ethers';



function Transfer() {


const[resaddr,setresaddr]=useState("0x");
const[amt,setamt]=useState(0);
const [currAddress, updateAddress] = useState('0x');
const [txs, setTxs] = useState([]);


async function getAddress() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer =  provider.getSigner();
 
  const addr = await signer.getAddress();
  updateAddress(addr);
}

useEffect(()=>{
 getAddress(); 
})

const startPayment = async () => {
  switchtogoerli();
  try {

    if (!window.ethereum)
      alert("No crypto wallet found. Please install it.");
    if(amt<=0)
      alert("enter valid amount of ethers");
    if(resaddr=='0x')
      alert("please enter valid address");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    ethers.utils.getAddress(resaddr);

    const tx = await signer.sendTransaction({
      to: resaddr,
      value: ethers.utils.parseEther(amt)
    });

    console.log( amt, resaddr );
    console.log(tx);
    setTxs(oldtx=>[...oldtx,tx])
    setamt(0)
    setresaddr('0x')
  } 
  catch (err) {
    console.log(err);
  }
};

async function switchtogoerli (){
    
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if(chainId !== '0x5')
        {
          alert('Incorrect network! Switch your metamask network');
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
         })
        } 
}


  return (
    <div className="Transfer">
      <h1 className="headd">Transfer ETH</h1>
        <div className='formip'>
            <label>Enter the recipent address</label> 
            <input type="text" placeholder="0x0000000000000000000000" onChange={(e)=>setresaddr(e.target.value)}/><br/>
            <label>Enter the amount of ether you want to send </label>
            <input type="number" placeholder="0.00eth"  onChange={(e)=>setamt(e.target.value)}/>
        </div>
        <button type="submit" className='sendbtn' onClick={startPayment}>Send</button>
        {
          txs && 
          <div className="txndiv">
            <h2>Recent transactions</h2>
            {
              (txs.length===0)?(<div>None</div>):(

                txs.map(tn=>{
                   return <div className='txntile'>
                    <h3>From:{tn.from.substring(0,15)+'...'}</h3>
                    <h3>to:{tn.to.substring(0,15)+'...'}</h3>
                    <h3>value:{ethers.utils.formatEther(tn.value._hex)}</h3>
                  <h4>view on etherscan:<a target="_blank"  href={`https://goerli.etherscan.io/tx/${tn.hash}`}>Etherscan</a></h4>  
                   </div>
                })
               )
            }
          
          </div>
        }
    </div>
  )
}

export default Transfer

/*
accessList: null
blockHash: null
blockNumber: null
chainId: 0
confirmations: 0
creates: null
data: "0x"
from: "0x73FF456F43Beb9Be727C5cb998Ed00B40cE55d1E"
gasLimit: BigNumber {_hex: '0x5208', _isBigNumber: true}
gasPrice: BigNumber {_hex: '0x6988fe1f', _isBigNumber: true}
hash: "0xb1eda128c1e60a6f96f8e390221d1928332f9fd5c4cc03f88f1a7baff8ce3b17"
maxFeePerGas: BigNumber {_hex: '0x6988fe1f', _isBigNumber: true}
maxPriorityFeePerGas: BigNumber {_hex: '0x6988fe14', _isBigNumber: true}
nonce: 0
r: "0x7c35f808aea53de6ef91db9f88a01d34cf293c139a7a8186ed3954fba7e6f0a5"
s: "0x0572c974b3d759544572a1c970c8c4fb82adab2ebf818c97f02ab4864c2d701b"
to: "0x68be6B45425152c971F26764E67124480C066adf"
transactionIndex: null
type: 2
v: 1
value: BigNumber {_hex: '0x038d7ea4c68000', _isBigNumber: true}
*/