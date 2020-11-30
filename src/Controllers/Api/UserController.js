'use strict';

const jwt = require('jsonwebtoken');

//Models
const User = require('../../Models/UserModel');

class UserController {

    // get user data
    Profile(req, res) {
        const { userName } = req.decoded;

        User.findOne({
            userName
        }, (err, user) => {
            if (err)
                throw err;

            if (!user) {
                res.json({
                    status: false,
                    message: 'Authentication failed, user not found.'
                });
            } else {
                const { _id, userName, firstName, lastName } = user;

                res.json({
                    status: 200,
                    data: { _id, userName, firstName, lastName }
                });
            }
        })
    }

    // user register post
    Register(req, res, next) {
        const { userName, password, firstName, lastName } = req.body;

        // example control before save db
        // if (!password) {
        //     res.json({ status: false, data: 'Password field required' })
        //     next()
        // }

        // save user to database
        const user = new User({
            userName,
            password,
            firstName,
            lastName
        });

        const promise = user.save();
        promise.then((data) => {
            res.json(data)
        }).catch((err) => {
            if (err.name === 'MongoError' && err.code === 11000) {
                err.errmsg = 'Girmiş olduğunuz kullanıcı adı (`' + user.userName + '`) kayıtlı olduğu için farklı bir tane seçiniz.';
            }

            res.json(err);
        });
    }

    // user authenticate post
    Authenticate(req, res) {
        const { userName, password } = req.body;

        User.findOne({
            userName
        }, (err, user) => {
            if (err)
                throw err;

            if (!user) {
                res.json({
                    status: false,
                    message: 'Authentication failed, user not found.'
                });
            } else {
                // matching password
                user.comparePassword(password, function (err, isMatch) {
                    if (err) throw err;

                    if (!isMatch) {
                        res.json({
                            status: false,
                            message: 'Authentication failed, wrong password.'
                        });
                    } else {
                        const payload = {
                            userName
                        };
                        const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                            expiresIn: '24h' // 86400
                        });

                        res.json({
                            status: true,
                            token
                        })
                    }
                });
            }
        })
    }

}

module.exports = new UserController();