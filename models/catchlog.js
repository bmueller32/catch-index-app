const mongoose = require('mongoose');

const Schema = mongoose.Schema;





const catchSchema = new mongoose.Schema({
    species : {type: String, required: true},
    weightlb : {type: Number, min: 0, max: 50},
    weightoz: {type: Number, min: 0, max: 15},
    location : {type: String, required: true},
    lure: {type: String, required: true}, 
    date : {type: Date,
    default: function () {
      return new Date().getFullYear()},

     


    }   
},

);


module.exports = mongoose.model('Catch', catchSchema);