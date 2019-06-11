const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// const keys = require('./keys');
const User = require('../models/User');


passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: "236560683223-9kqj15f1oa3gv32v0essreerpbbedgp4.apps.googleusercontent.com",
    clientSecret: 'lq85S8poj8Zk7s4J5p_nZMtE' 
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id}).then(currentUser => {
        if(currentUser){
            console.log("user exists in our database");
            done(null, currentUser);
        }else{
            newUser = new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then(user => {
                console.log("user saved...");
                done(null, user)
            })
        }
    }).catch(err => console.log(err));
}
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

module.exports = passport;