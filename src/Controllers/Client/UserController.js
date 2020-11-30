'use strict';

class UserController {

    Index(req, res) {
        res.render(
                'User/Index',
                {
                    title: 'Dashboard'
                }
        );
    }

    Login(req, res) {
        res.render(
                'User/Login',
                {
                    title: 'Kullnıcı Girişi'
                }
        );
    }

    Register(req, res) {
        res.render(
                'User/Register',
                {
                    title: 'Kullnıcı Kaydı'
                }
        );
    }

}

module.exports = new UserController();