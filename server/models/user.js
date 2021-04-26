const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    name: {
        family:{type: String, required: true},
        first: {type: String, required: true}
    },
    password: {type: String, required: true},
    accesLevel: {type: String, default: 'user'}
}, {collection: 'users'});

userSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,function(err, salt) {
            if(err){
                console.log('Hiba történt salt generálása közben')
                return next(error);
            }
            bcrypt.hash(user.password,salt, function(error,hash){
                if(error) {
                    console.log('hiba a hasheles soran');
                    return next(error);
                }
                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    }
});