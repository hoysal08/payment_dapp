import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Balance from './Components/Balance';
import Transactions from './Components/Transactions';
import Transfer from './Components/Transfer';
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
   <div className="content">
    <Routes basename="http://hoysal08.github.io/payment_dapp">
      <Route  path='/' element={<Transfer/>}/>

      <Route  path='/balance' element={<Balance/>} />
      
      <Route  path='/faucet' element={<Transactions/>} />
      <Route  path='/transfer' element={<Transfer/>}/>

    </Routes>

   </div>
    </div>
    </Router>
  );
}

export default App;
