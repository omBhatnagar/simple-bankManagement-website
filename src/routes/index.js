const router = require('express').Router();

// importing routes
const addUser = require('./addUser');
const getUser = require('./users');

// routes
router.use('/addUser', addUser);
router.use('/users', getUser);

router.get('/', (req, res, next) => {
    // document.write("Home Page");
    return res.status(200).send({
        message: "Yup, working!"
    });
});

module.exports = router;