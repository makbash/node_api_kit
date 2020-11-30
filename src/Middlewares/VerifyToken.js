const jwt = require('jsonwebtoken');

class VerifyToken {
    constructor() {
        return (req, res, next) => {
            let token = req.headers['x-access-token'] || req.headers['authorization'] || req.body.token || req.query.token;

            if (token) {
                // Remove Bearer from string
                if (token.startsWith('Bearer ')) {
                    token = token.slice(7, token.length);
                }

                jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
                    if (err) {
                        res.json({
                            status: false,
                            message: 'Failed to authenticate token.'
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                res.json({
                    status: false,
                    message: 'No token provided.'
                });
            }
        };
    }
}

module.exports = new VerifyToken();