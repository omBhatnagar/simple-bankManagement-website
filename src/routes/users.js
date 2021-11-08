const router = require('express').Router();
const jwt = require('jsonwebtoken');

const passport = require('../utils/passport');
const { Customers, Transactions } = require('../database/models');

router.get('/', async (req, res, next) => {
    try {
        const { email } = req.query;
        let customers;
        let token;
        if(email) {
            customers = await Customers.findAll({ where: {email}});
            token = await jwt.sign({
                email: customers[0].email
            },
            process.env.JWT_SECRET
            );
            return res.status(200).send({
                name: customers[0].name,
                email: customers[0].email,
                balance: customers[0].balance
            })
        }
        else { customers = await Customers.findAll(); }
        return res.status(200).send({
            customers
            // token
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/selectRecepient/:email', async (req, res, next) => {
    const { email }= req.params;

    return res.status(200).send({
        email
    });
});

router.post('/transfer', async (req, res, next) => {
    const { doneBy, recepient, amount } = req.body;
    
    if(!doneBy || !recepient || !amount) {
        console.log('empty dat');
        console.log(req.body);
        return res.status(400).send({
            message: "Fill all the fields."
        });
    }

    if(doneBy == recepient){
        return res.status(400).send({
            message: "Donor and recepient cannot be the same!"
        });
    }

    const donorGuy = await Customers.findAll({ where: { email: doneBy } });
    const recepientGuy = await Customers.findAll({ where: { email: recepient } });

    let amt = parseFloat(amount);
    let donorAmt = parseFloat(donorGuy[0].balance);
    let recAmt = parseFloat(recepientGuy[0].balance);

    if(amt > donorAmt){
        console.log('insf funds');
        return res.status(400).send({
            message: "Insufficient funds!"
        });
    }
    donorAmt -= amt;
    recAmt += amt;
    const resp = await Transactions.create({
        doneBy,
        recepient,
        amount
    });

    const updateDonor = await Customers.update({
        balance: donorAmt
    }, { where: { email: doneBy } });

    const updateRecepient = await Customers.update({
        balance: recAmt
    }, { where: { email: recepient } });

    console.log(donorAmt);
    console.log(recAmt);

    return res.status(200).send({
        status: true,
        code: 200,
        transaction: resp
    });
});

module.exports = router;