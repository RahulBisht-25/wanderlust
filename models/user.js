const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

const passportPlugin =
    passportLocalMongoose.default || passportLocalMongoose;

userSchema.plugin(passportPlugin);

module.exports = mongoose.model("User", userSchema);