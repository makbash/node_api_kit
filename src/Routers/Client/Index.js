module.exports = [
    {
        Url: '',
        Method: 'GET',
        Controller: 'Client/HomeController',
        Action: 'Index'
    },
    {
        Method: 'GET',
        Url: 'login',
        Controller: 'Client/UserController',
        Action: 'Login'
    },
    {
        Method: 'GET',
        Url: 'register',
        Controller: 'Client/UserController',
        Action: 'Register'
    },
    {
        Method: 'GET',
        Url: 'dashboard',
        Controller: 'Client/UserController',
        Action: 'Index'
    },
    {
        Url: 'learn',
        Routes: [
            {
                Method: 'GET',
                Controller: 'Client/LearnController',
                Action: 'Index'
            },
            {
                Url: 'categories',
                Method: 'GET',
                Controller: 'Client/LearnController',
                Action: 'Categories'
            },
            {
                Url: 'category',
                Method: 'GET',
                Controller: 'Client/LearnController',
                Action: 'Category'
            }
        ]
    }
];