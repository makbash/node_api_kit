import Cors from 'cors';
import WhiteList from '../../Lib/WhiteList';
import Test from './Test';

const CorsOptions = {
    origin: (origin, cb) => {
        if (WhiteList.indexOf(origin) !== -1 || !origin)
            cb(null, true);
        else
            cb({status: 403, data: 'You do not have permission!'});
    },
    optionsSuccessStatus: 200,
    credentials: true
};

module.exports = [
    {
        Url: 'api/v1',
        OptionsMiddlewares: [Cors(CorsOptions)],
        Middlewares: ['ApiMid'],
        Routes: [
            {
                Method: 'GET',
                Controller: 'Api/HomeController',
                Action: 'Index'
            },
            {
                Url: 'user',
                Routes: [
                    {
                        Method: 'POST',
                        Url: 'register',
                        Controller: 'Api/UserController',
                        Action: 'Register'
                    },
                    {
                        Method: 'POST',
                        Url: 'authenticate',
                        Controller: 'Api/UserController',
                        Action: 'Authenticate'
                    },
                    {
                        Method: 'GET',
                        Url: 'profile',
                        Middlewares: ['VerifyToken'],
                        Controller: 'Api/UserController',
                        Action: 'Profile'
                    }
                ]
            },
            {
                Url: 'test',
                Routes: Test
            }
        ]
    }
];