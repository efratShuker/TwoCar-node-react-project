const mongoose = require("mongoose");

const Order = mongoose.model(
  "Car",
  new mongoose.Schema({
    carType: { type: String, required: [true, 'missing type car'] },
    carPrice: {
      type: Number,
      required: [true, 'missing car price']
    },
    carHand: { type: String, required: [true, 'missing hand car'] },
    carYear: Number,
    carOwnPhone: {type: String, require:[true, 'missing phone of user']},
    carOwnId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    carOwnEmail: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email address is not valid'],
      required: [true, 'missing email address']
    },
    carOwnAddress: { type: String, required: [true, 'missing user address'] },
    carColor:{type: String, required:[true, 'missing color of car']},
    carSeats:{type: Number, required:'missing amount seats of car'},
    image:String,
    date: {type: String, required:[true, 'missing date of advertisement']}
  })
);

module.exports = Order;
