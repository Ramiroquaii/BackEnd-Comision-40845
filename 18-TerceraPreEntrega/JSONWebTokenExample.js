const express = require('express');
const jwt = require('jsonwebtoken');

// create an express app
const app = express();

// secret key for signing and verifying JWTs
const secretKey = 'mysecretkey';

// example user object
const user = {
    id: 1,
    username: 'alice',
    email: 'alice@example.com'
};

// generate a JWT for the user
const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

// middleware function to check if user is authorized
function isAuthorized(req, res, next) {
    // get the authorization header value (should be "Bearer <token>")
    const authHeader = req.headers.authorization;

    // if authorization header is not present, return error
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // split the authorization header value into two parts (bearer and token)
    const [bearer, token] = authHeader.split(' ');

    // if bearer is not "Bearer", return error
    if (bearer !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid authorization header' });
    }

    try {
        // verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);

        // attach the decoded user object to the request object
        req.user = decoded;

        // continue with the next middleware
        next();
    } catch (err) {
        // if token is invalid, return error
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// example protected route
app.get('/dashboard', isAuthorized, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});