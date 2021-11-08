const router = require('express').Router();

const { Customers } = require('../database/models');

router.post('/', async (req, res, next) => {
    const { name, email, balance } = req.body;
    if(!name || !email || !balance) {
        return res.status(400).send({
            status: false,
            code: 400,
            message: "Fill all the fields."
        });
    }
    const user = await Customers.findAll({ where: {name } });
    if(user.length <= 0) {
        const response = await Customers.create({
            name,
            email,
            balance
        });
        return res.status(201).send({
            code: 201,
            status: true,
            data: {
              categoryId: response.name,
            },
          });
    }
    return res.send({
        status: true,
        code: 201,
        message: "User already exists.",
        user: user[0]
    });

})



module.exports = router;