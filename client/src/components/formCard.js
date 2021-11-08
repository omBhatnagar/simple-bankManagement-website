import { useEffect, useState } from 'react';
import React from 'react';
import './formCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Formcard = ({ usersLMAO, donor, donorEmail }) => {

    const [doneBy, setdoneBy] = useState(donorEmail);
    const [amount, setAmount] = useState('');
    const [recepient, setRecepient] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const rnp = { doneBy: donorEmail, amount, recepient };
        // console.log(rnp);
        postData(rnp);
    }

    const postData = async (stuff) => {
        console.log(stuff);
        const hehe = await axios.post(`http://localhost:5000/api/users/transfer`, stuff);
        console.log(hehe);
        // const result = fetch(`http://localhost:5000/api/users/transfer`, {
        //   method: 'post',
        //   mode: 'no-cors',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-type': 'application/json',
        //   },
        //   body: JSON.stringify(stuff)
        // });
        // console.log(result);
    }

    return (
        <div className="form-wrap" >
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Donor Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={donorEmail} name="doneBy"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name="amount" value={amount} onChange={(e => setAmount(e.target.value))}/>
                </div>
                <select class="form-select" aria-label="Default select example" name="recepient" value={recepient} onChange={(e) => setRecepient(e.target.value)}>
                    <option selected>Select recepient</option>
                    {usersLMAO.map(userLMAO => (
                        <option value={userLMAO.email}>{userLMAO.name}</option>
                    ))}                                            
                </select>
                <div id="emailHelp" className="form-text">Our transactions are safe and secure.</div>
                <button type="submit" className="btn btn-primary">Transfer</button>
            </form>

            
            {/* <form className="transaction-form">
                <p> Donor: </p>
                <input type="text" id="donorName" name="donorName" className="input-text"></input>
                <label for="recepient">Select Recepient: </label>
                <input type="select" name="recepient" id="recepient" form="transactionForm" className="input-text"></input>
                <button type="Submit" className="btn1">Transfer</button>
            </form> */}
        </div>
    );
};

export default Formcard;