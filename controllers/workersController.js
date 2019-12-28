const Worker = require("./../models/worker");

exports.getWorkers = function (req, res) {
    Worker.find({}, function(err, users){

        if(err) return console.log(err);
        res.send(users)
    });
}

exports.addWorker = function(req, res){
    if(!req.body) return res.sendStatus(400);

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const age = req.query.age;
    const gender = req.query.gender;
    const info = req.query.info;
    const data = req.query.data;
    const salary = req.query.salary;
    const position = req.query.position;

    const worker = new Worker({firstName, lastName, age, gender, info, data, salary, position});

    worker.save(function(err){
        if(err) return console.log(err);
        res.send(worker);
    });
}

exports.updateWorker = function(req, res){
    if(!req.query) return res.sendStatus(400);

    const id = req.query.id;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const age = req.query.age;
    const gender = req.query.gender;
    const info = req.query.info;
    const data = req.query.data;
    const salary = req.query.salary;
    const position = req.query.position;

    const newUser = {firstName, lastName, age, gender, info, data, salary, position};

    Worker.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
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