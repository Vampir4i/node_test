const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const workersRouter = require("./routes/workersRoutes");
const usersRouter = require("./routes/usersRoutes");
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

// app.use(allowCrossDomain);

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));
app.use('/api/workers', workersRouter);
app.use('/api/', usersRouter);

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(8080, function(){
        console.log("Сервер ожидает подключения...");
    });
});

process.on("SIGINT", () => {
    mongoose.disconnect();
    process.exit();
});