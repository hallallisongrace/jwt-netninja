const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an enail'],
        unique: true,
        lowercase: true,
        validate: [(val) => {  }, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'minimum password length is 6 characters']
    },
});

//fire a function after doc saved to db
userSchema.post('save', async function (doc, next) {
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password, salt);
next();
});

//fire a function before doc saved to db
userSchema.pre('save', function (next) {
    console.log('user about to be created and saved', this);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;


