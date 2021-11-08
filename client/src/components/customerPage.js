import { useEffect, useState } from 'react';
import './customerPage.css';
import register from '../images/bank1.jpg'
import Usercard from './userCard';
import Formcard from './formCard';
import style from './userCard.module.css';

function Customer({ match }) {

  const [customer, setCustomer] = useState({});
  const [usersLMAO, setUsersLMAO] = useState([]);

  useEffect(() => {
      getCustomers();
      getCustomer();
    }, []);

  const getCustomers = async () => {
      const gks = await fetch('http://localhost:5000/api/users');
      const rnp = await gks.json();
      setUsersLMAO(rnp.customers);
      console.log(rnp.customers);
    }

  const getCustomer = async () => {
    const cust = await fetch(`http://localhost:5000/api/users/?email=${match.params.email}`);
    const data = await cust.json();
    setCustomer(data);
    console.log(data);
  }

  return (
    <div className="main">
        <div className="header1">
            <img src={register} className="header-image" alt="logo" />
            <div className="header-text">
                <h1>View Customer</h1>
            </div>
        </div>
        <div className="customer-wrap">
        <h2 className="customer-heading">Make Transactions</h2>
        <hr className="hr-main"/>
        <div className="customer">
            {/* <Usercard key={customer.email} name={customer.name} email={customer.email} balance={customer.balance}/> */}
            <div className={style.customerlmao}>
              <h1 className={style.name}>{customer.name}</h1>
              <hr />
              <div className="container">
                  <h4 className={style.email}>E-mail: {customer.email}</h4>
                  <p className={style.balance}>Balance: {customer.balance}</p>
              </div>
            </div>
            <Formcard usersLMAO={ usersLMAO } donor={customer.name} donorEmail={customer.email}/>          
        </div>
      </div>
    </div>
  );
}

export default Customer;
