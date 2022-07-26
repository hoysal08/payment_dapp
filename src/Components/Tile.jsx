import React from 'react'
import styles from './Tile.css'

function Tile({meta,bal}) {
    const prop={
        "jsonrpc": "2.0",
        "id": 1,
        "result": {
          "logo": "https://static.alchemyapi.io/images/assets/1104.png",
          "symbol": "REP",
          "decimals": 18,
          "name": "Augur"
        }
      }
    //   meta=JSON.parse(meta)
     
  return (
    <div styles={{BackgroundColor:"white"}}>
        <div className="tile-rw">
        <img  className='logo' src={meta?.result.logo}></img>

        <h2>{meta?.result.name}</h2>
        <h3>{bal/Math.pow(10,meta?.result.decimals)}</h3>
        <h4>{meta?.result.symbol}</h4>
        </div>
        {/* <div className="tile-rw">
            <img  className='logo' src={prop.result.logo}></img>
        <h2>{prop.result.name}</h2>
        <h3>{1000}</h3>
        <h4>{prop.result.symbol}</h4>
        </div> */}
    </div>
  )
}

export default Tile