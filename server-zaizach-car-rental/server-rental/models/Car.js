const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    vehicle: String,
    model: String,
    owner: String,
    status: String
})