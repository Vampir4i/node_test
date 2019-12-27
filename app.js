const mongoose = require("mongoose");
const express = require("express");

const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const workerScheme = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    info: {
        phone: {
            type: String,
            default: 'Not available',
            //match: '^\\+\\d{2}\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$'
        },
        email: {
            type: String,
            default: 'Not available',
            //match: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
        }
    },
    data: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }
}, {versionKey: false});

const loginSchema = new Schema({
    login: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        //match: '/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/'
    },
    email: {
        type: String,
        default: 'Not available',
        //match: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
    }
}, {versionKey: false});

const Worker = mongoose.model("Worker", workerScheme);
const Login = mongoose.model('Login', loginSchema);

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(8080, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.get("/api/users", function(req, res){

    Worker.find({}, function(err, users){

        if(err) return console.log(err);
        res.send(users)
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const age = req.body.age;
    // const gender = req.body.gender;
    // const info = req.body.info;
    // const data = req.body.data;
    // const salary = req.body.salary;
    // const position = req.body.position;

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
});

app.delete("/api/users/:id", function(req, res){

    const id = req.params.id;

    Worker.findByIdAndDelete(id, function(err, user){

        if(err) return console.log(err);
        res.send(user);
    });
});

app.put("/api/users", jsonParser, function(req, res){

    // if(!req.body) return res.sendStatus(400);
    // const id = req.body.id;
    // const userName = req.body.name;
    // const userAge = req.body.age;
    // const newUser = {age: userAge, name: userName};

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
});

app.post("/api/login", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const age = req.body.age;
    // const gender = req.body.gender;
    // const info = req.body.info;
    // const data = req.body.data;
    // const salary = req.body.salary;
    // const position = req.body.position;

    const login = req.query.login;
    const password = req.query.password;

    Login.findOne({login, password}, function(err, users){

        if(err) return console.log(err);
        res.send(users)
    });
});

app.post("/api/register", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const login = req.query.login;
    const password = req.query.password;
    const email = req.query.email;

    const l = new Login({login, password, email});

    l.save(function(err){
        if(err) return console.log(err);
        res.send(l);
    });
});

process.on("SIGINT", () => {
    mongoose.disconnect();
    process.exit();
});