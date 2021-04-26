const express = require('express');
const router = express.Router();

const User = require('./models/user');

router.post('user/signup',(req,res,next) => {
    email = req.body.email;
    password = req.body.password;
    fullname = req.body.fullname;
    if (email && password && fullname && fullname.family && fullname.first){
        const user = new User({email:email,password:password,fullname:fullname});
        user.save((error) => {
            if (error) return res.status(500).json({
                message: 'Probláma lépett fel regisztráció közben!',
                error: error
            });
            return res.status(200).json({message: 'Sikeres regisztráció!'});
        })
    } else {
        return res.staus(400).json({message: 'Nem lett megadva minden adat!'});
    }
});

router.post('login',(req,res,next) => {

});

module.exports = router;