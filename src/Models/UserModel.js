'use strict';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

// import validate from 'mongoose-validator';
// const passwordValidator = [
//   validate({
//     validator: 'isLength',
//     arguments: [8, 12],
//     message: 'Şifre 8 ile 12 karakter arasında olmalıdır'
//   })
// ];

const UserSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    // email: {
    //     type: String,
    //     required: [true, '`{PATH}` alanı zorunludur.'],
    //     unique: [true, 'Girmiş olduğunuz mail (`{VALUE}`) kayıtlı olduğu için farklı bir tane seçiniz.'],
    //     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // },
    userName: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        unique: [true, 'Girmiş olduğunuz kullanıcı adı (`{VALUE}`) kayıtlı olduğu için farklı bir tane seçiniz.'],
        validate: {
            validator: (v) => { return v && v.length > 3; },
            message: '`{PATH}` alanı(`{VALUE}`) 4 karakterden az olamaz.'
        }
    },
    password: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        minlength: [8, '`{PATH}` alanı en az ({MINLENGTH}) karakter olmalıdır. (`{VALUE}`)'],
        maxlength: [12, '`{PATH}` alanı en fazla ({MAXLENGTH}) karakter olabilir. (`{VALUE}`)']
        //validate: passwordValidator,
    },
    firstName: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.']
    },
    lastName: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.']
    },
    status: {
        type: Number,
        default: 1
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    }
});

// external validate example
// UserSchema.path('userName').validate((userName) => { return userName.length > 3; }, '`{PATH}` alanı 4 karakterden az olamaz.(`{VALUE}`)');

UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('user', UserSchema);