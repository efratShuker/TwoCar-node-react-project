const db = require("../models");
const Car = db.Car;


//create new car
exports.create = (req, res) => {
    //validate properties are not empty

    if (!req.body.carType || !req.body.carPrice || !req.body.carHand || !req.body.carYear || !req.body.carOwnPhone || !req.body.carOwnEmail || !req.body.carOwnAddress || !req.body.carSeats || !req.body.carColor) {
        return res.status(400).send({
            message: "car content must be full"
        });
    }

   
    //create the oreder Schema
    const car = new Car({
        carType: req.body.carType,
        carPrice: req.body.carPrice,
        carHand: req.body.carHand,
        carYear: req.body.carYear,
        carOwnPhone: req.body.carOwnPhone,
        carOwnId: req.body.carOwnId,
        carOwnEmail: req.body.carOwnEmail,
        carOwnAddress: req.body.carOwnAddress,
        carSeats: req.body.carSeats,
        carColor: req.body.carColor,
        date: req.body.date,
        image: req.body.image
    });

    //save the Schema into db
    car.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while creating the car."
            });
        });
};


//return the whole cars in db
exports.findAll = (req, res) => {
    Car.find()
        .then(cars => {
            res.send(cars);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while retrieving car."
            });
        });
};

//return car details by id
exports.findOne = (req, res) => {
    Car.findById(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "הרכב לא נמצא"
                });
            }
            res.send(note);

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "הרכב לא נמצא"
                });
            }
            return res.status(500).send({
                message: "error retrieving car"
            });
        });
};

//delete car by id
exports.delete = (req, res) => {
    Car.findByIdAndRemove(req.query.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "הרכב לא נמצא"
                });
            }
            res.send({ message: "car deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "הרכב לא נמצא"
                });
            }
            return res.status(500).send({
                message: "לא ניתן למחוק רכב זה"
            });
        });
};
