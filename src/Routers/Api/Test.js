module.exports = [
    {
        Method: 'POST',
        Url: 'post',
        Controller: 'Api/HomeController',
        Action: 'Test',
        Middlewares: ['VerifyToken', 'TestMid1']
    },
    {
        Method: 'GET',
        Url: 'get',
        Controller: 'Api/HomeController',
        Action: 'Test',
        Middlewares: ['TestMid2']
    }
];