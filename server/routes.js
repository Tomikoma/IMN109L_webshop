const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('./models/user');

router.post('/user/signup',(req,res,next) => {
    email = req.body.email;
    password = req.body.password;
    fullname = req.body.fullname;
    if (email && password && fullname && fullname.family && fullname.first){
        const user = new User({email:email,password:password,name:fullname});
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

router.post('/user/login',(req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email, password) {
        passport.authenticate('local',function(error, user) {
            if(error) {
                console.log(error);
                return res.status(500).json({message: 'Probléma történt bejelentkezés közben!', error: error});
            }
            req.login(user, function(err) {
                if(error) return res.status(500).json({message: 'Probléma történt bejelentkezés közben!', error: err});
                return res.status(200).json({message:'Bejelentkezes sikeres'});
            })
        })(req, res);
    } else {
        return res.status(400).send('Hibas keres, username es password kell');
    }
});

router.post('/user/logout', (req,res,next) => {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).json({message: 'Kijelentkezes sikeres'});
    } else {
        return res.status(403).json({message: 'Nem is volt bejelentkezve'});
    }
});

module.exports = router;