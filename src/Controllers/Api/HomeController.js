'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require('../../Models/UserModel');

const Asd = (test) => {
    return test;
}

class HomeController {

    Index(req, res) {
        res.json({
            data: 'Api Home@Index'
        });
    }

    Test(req, res) {
        res.json({
            data: 'asd'
        })
    }

}

module.exports = new HomeController();