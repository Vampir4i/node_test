const Worker = require("./../models/worker");

exports.getWorkers = function (req, res) {
    Worker.find({}, function(err, users){

        if(err) return console.log(err);
        res.send(users)
    });
}

exports.addWorker = function(req, res){
    if(!req.body) return res.sendStatus(400);
    console.log(req);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = +req.body.age;
    const gender = req.body.gender;
    const info = req.body.info;
    const data = req.body.data;
    const salary = +req.body.salary;
    const position = req.body.position;

    const worker = new Worker({firstName, lastName, age, gender, info, data, salary, position});

    worker.save(function(err){
        if(err) return console.log(err);
        res.send(worker);
    });
}

exports.updateWorker = function(req, res){
    if(!req.query) return res.sendStatus(400);

    const _id = req.body._id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = +req.body.age;
    const gender = req.body.gender;
    const info = req.body.info;
    const data = req.body.data;
    const salary = +req.body.salary;
    const position = req.body.position;

    const newUser = {firstName, lastName, age, gender, info, data, salary, position};

    Worker.findOneAndUpdate({_id: _id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err);
        res.send(user);
    });
}

exports.deleteWorker = function(req, res){
    const id = req.params.id;

    Worker.findByIdAndDelete(id, function(err, user){

        if(err) return console.log(err);
        res.send(user);
    });
}