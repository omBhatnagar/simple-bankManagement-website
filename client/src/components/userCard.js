import React from 'react';
import style from './userCard.module.css';
import { Link } from 'react-router-dom';

const Usercard = ({ name, email, balance }) => {
    return (
        <div className={style.customer}>
            <h1 className={style.name}>{name}</h1>
            <hr />
            <div className="container">
                <h4 className={style.email}>E-mail: {email}</h4>
                <p className={style.balance}>Balance: {balance}</p>
            </div>
            <Link to={`/customer/${email}`} className={style.btn}>
                <button>View Customer</button>
            </Link>
        </div>
    );
};

export default Usercard;