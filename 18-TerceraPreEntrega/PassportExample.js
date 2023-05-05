const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// create a user model
const users = [
    { id: 1, username: 'alice', password: 'password123' },
    { id: 2, username: 'bob', password: 'password456' },
    { id: 3, username: 'charlie', password: 'password789' }
];

// configure the local strategy for Passport
passport.use(new LocalStrategy(
    function (username, password, done) {
        // find the user with the given username
        const user = users.find(user => user.username === username);

        // if user not found or password is incorrect, return error
        if (!user || user.password !== password) {
            return done(null, false, { message: 'Invalid username or password' });
        }

        // if user is found and password is correct, return user
        return done(null, user);
    }
));

// serialize/deserialize the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
});

// create an express app
const app = express();

// configure session middleware
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));

// initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// login route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

// dashboard route (protected)
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome, ${req.user.username}!`);
});

// logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

// middleware function to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // user is authenticated, continue with the next middleware
        return next();
    } else {
        // user is not authenticated, redirect to login page
        res.redirect('/login');
    }
}

// login form route
app.get('/login', (req, res) => {
    res.send(`
    <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Log In</button>
    </form>
    `);
});

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});