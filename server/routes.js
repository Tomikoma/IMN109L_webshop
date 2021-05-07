const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('./models/user');
const Product = require('./models/product');
const product = require('./models/product');

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
                return res.status(500).json({message: error});
            }
            req.login(user, function(err) {
                if(error) return res.status(500).json({message: 'Probléma történt bejelentkezés közben!', error: err});
                return res.status(200).json({message:'Bejelentkezes sikeres', email: user.email});
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

router.get('/user/info/', (req,res,next) => {
    if(req.isAuthenticated()){
        const user = {email: req.user.email, fullName: {familyName: req.user.name.family, firstName: req.user.name.first}, accesLevel: req.user.accesLevel}
        return res.status(200).json(user)
    } else {
        return res.status(403).json({message: 'Nincs bejelentkezve'});
    }
})

router.route('/product').post((req,res,next) => {
    if(req.isAuthenticated()){
        if (req.user.accesLevel === 'admin'){
            const name = req.body.name;
            const price = req.body.price;
            const guarantee = req.body.guarantee;
            const imgUrl = req.body.imgUrl;
            const productType = req.body.productType;
            let product;
            if (name && price && productType){
                prod = {name,price,productType}
                if(imgUrl) prod.imgUrl = imgUrl
                if(guarantee) prod.guarantee = guarantee
                const product = new Product(prod);
                product.save(error => {
                    if (error){
                        if (error.code == 11000) return res.status(400).json({message: 'Ilyen nevű termék már található az adatbázisban!'})
                        return res.status(500).json({message: 'Hiba történt a termék hozzáadása során!'})  
                    } 
                    res.status(200).json({message: 'A termékek sikeresen hozzáadva', product});
                    
                })
                
            } else {
                res.status(400).json({message: 'A name, price és productType megadása kötelező!'}); 
            }
        } else {
            res.status(401).json({message: 'Csak admin adhat új terméket az adatbázishoz!'}); 
        }
    } else {
        return res.status(403).json({message: 'Nincs bejelentkezve'});
    }
}).put((req,res,next) => {
    if(req.isAuthenticated()){
        if (req.user.accesLevel === 'admin'){
            const name = req.body.name;
            const price = req.body.price;
            const guarantee = req.body.guarantee;
            const imgUrl = req.body.imgUrl;
            const productType = req.body.productType;
            if (name){
                if (price || guarantee || imgUrl || productType){
                    Product.findOne({name: name}, (err,product) => {
                        if(err) return res.status(500).json({message: 'Hiba történt a termék lekérdezése közben!', error: err});
                        if(!product) return res.status(400).json({message: 'Nem létezik ilyen nevú termék az adatbázisban!'})
                        if (price) product.price = price;
                        if (guarantee) product.guarantee = guarantee;
                        if (imgUrl) product.imgUrl = imgUrl;
                        if (productType) product.productType = productType
                        product.save(error => {
                            if (error) return res.status(500).json({message: 'Hiba történt a termék adatainak módosítása közben!', error: error});
                            return res.status(200).json({message: 'A termék sikeresen módosítva lett!', product: product});
                        })
                    })
                } else {
                    res.status(400).json({message: 'Price, guarantee, imgUrl vagy productType megadása szükséges a módosításhoz!'}); 
                }                
            } else {
                res.status(400).json({message: 'A name megadása kötelező a módosításhoz!'}); 
            }
        } else {
            res.status(401).json({message: 'Csak admin adhat új terméket az adatbázishoz!'}); 
        }
    } else {
        return res.status(403).json({message: 'Nincs bejelentkezve'});
    }
}).get((req,res,next) => {
    if(req.isAuthenticated()){
        Product.find({}, (error, products) => {
            if (error) res.status(500).json({message: 'Hiba történt a termékek lekérdezése közben!', error: error});
            return res.status(200).json(products);
        });
    } else {
        return res.status(403).json({message: 'Nincs bejelentkezve'});
    }
});

router.route('/product/:name').get((req,res,next) =>{
    if(req.isAuthenticated()){
        Product.findOne({name:req.params.name}, (err, product) => {
            if (err) return res.status(500).json({message: 'Probéma lépett fel a termék lekérdezése közben!', error: err});
            if (!product) return res.status(400).json({message: 'Ilyen nevű termék nem létezik!'});
            return res.status(200).json(product);
        })
    } else {
        return res.status(403).json({message: 'Nincs bejelentkezve'});
    }
}).delete((req,res,next) => {
    if(req.isAuthenticated()){
        if (req.user.accesLevel === 'admin'){
            Product.findOne({name: req.params.name}, (err, product) => {
                if (err) return res.status(500).json({message: 'Probéma lépett fel a termék törlése közben!', error: err});
                if (!product) return res.status(400).json({message: 'Ilyen nevű termék nem létezik!'});
                product.remove(error => {
                    if (error) return res.status(500).json({message: 'Probéma lépett fel a termék törlése közben!', error: error});
                    return res.status(200).json({message: 'A termék törlése került!'})
                })
            })
        } else {
            res.status(401).json({message: 'Csak admin törölhet terméket az adatbázisból!'}); 
        }
    } else {
        return res.status(403).json({message: 'Nincs bejelentkezve'});
    }
});

module.exports = router;