import register from './images/register1.jpg';
import './App.css';
import Customer from './components/customerPage';
import Usercard from './components/userCard'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return(
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/customer/:email' exact component={Customer} />
      </Switch>
    </Router>
  )  
}

const Home = () => {
  const [users, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    const cust = await fetch('http://localhost:5000/api/users');
    const data = await cust.json();
    setCustomers(data.customers);
    console.log(data.customers);
  }

  return (
    <div className="App">
      <div className="header">
        <img src={register} className="App-logo" alt="logo" />
          <div className="header-grid">
            <div className=""><h1 className="grid-text">Bank Management</h1></div>
          </div>
      </div>
      {/* <div className="about-content">
        <h2>Make Transactions.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatibus iste possimus beatae ipsa voluptate veritatis aut debitis obcaecati alias assumenda, iure quaerat expedita ut fuga, sapiente eveniet inventore eum.</p>
      </div> */}
      <div className="customer-wrap">
        <h2 className="customer-heading">Our Customers</h2>
        <hr className="hr-main"/>
        <div className="customer">
          {users.map(user => (
            <Usercard key={user.email} name={user.name} email={user.email} balance={user.balance}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
