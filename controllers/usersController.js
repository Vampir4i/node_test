const User = require("./../models/user");

exports.loginUser = function(req, res) {
    if(!req.body) return res.sendStatus(400);

    const login = req.query.login;
    const password = req.query.password;

    User.findOne({login, password}, function(err, users){

        if(err) return console.log(err);
        res.send(users)
    });
}

exports.registerUser = function(req, res) {
    if(!req.body) return res.sendStatus(400);

    const login = req.query.login;
    const password = req.query.password;
    const email = req.query.email;

    const user = new User({login, password, email});

    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
}