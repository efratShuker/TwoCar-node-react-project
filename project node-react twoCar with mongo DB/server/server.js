const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const data = require("./app/data")
const db = require('./app/models')

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended:true, parameterLimit:50000}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


db.User.find({}).then(res => {
  if (res.length == 0) {
    db.User.insertMany(data.users).then(
      res =>
        console.log("Users inserted successfully")
    ).catch(
      err => console.log(err.message)
    )
  }
})

db.Car.find({}).then(res => {
  if (res.length == 0) {
    db.Car.insertMany(data.cars).then(
      res =>
        console.log("Cars inserted successfully")
    ).catch(
      err => console.log(err.message)
    )
  }
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/car.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

