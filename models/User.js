const { Schema, model } = require('mongoose');

const NAME_PATTERN = /^[A-Za-z-]+$/;
const EMAIL_PATTERN = /^([A-Za-z]+)@([A-Za-z]+)\.([A-Za-z]+)$/;
//TODO changed user model according to ecam description.
const userSchema = new Schema({
    firstName: {
        type: String, minlength: [3, 'First name must be at least 3 characters long'], validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'First name must contain only english letters'
        }
    },
    lastName: {
        type: String, minlength: [3, 'Last name must be at least 5 characters long'], validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'Last name must contain only english letters'
        }
    },
    email: {
        type: String, required: "Email is required", validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Invalid Email'
        }
    },
    hashedPassword: { type: String, required: true },
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;