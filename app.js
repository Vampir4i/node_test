const mongoose = require("mongoose");
const express = require("express");
const workersRouter = require("./routes/workersRoutes");
const usersRouter = require("./routes/usersRoutes");

const app = express();

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