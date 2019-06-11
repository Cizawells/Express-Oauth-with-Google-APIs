const router = require('express').Router();

function checkAuth(req,res,next){
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
}

    router.get('/',checkAuth, (req,res) => {
    console.log(req.user);
    res.render('profile', {user: req.user});
})

module.exports = router;