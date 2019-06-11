const express = require('express');
const passport_setup = require('./config/passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');

let app = express();

//connect to the database;
mongoose.connect(keys.mongoURL, {useNewUrlParser: true}).then(() => console.log('connected')).catch(err => console.log(err));
//EJS
app.set('view engine', 'ejs');

//CookieSession
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    secret: 'cizawells'
}))


//initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res) => {
    console.log(req.user);
    console.log(req.session);
    res.render('home', {user: req.user});
});

//routes
app.use('/auth', require('./routes/auth-routes'));
app.use('/profile', require('./routes/profile-routes'));

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server started...");
})