const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// register user

router.post("/register", async (req, res) => {
    try {
        // generate password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // save user 
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(500).json(err);
    }
});

// login

router.post("/login", async (req, res) => {
    try {
        // find user
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("Wrong username or password!");

        // validate user
        const validate = await bcrypt.compare(req.body.password, user.password);
        !validate && res.status(400).json("Wrong username or password!");

        // send response
        res.status(200).json({_id: user._id, username: user.username});
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;