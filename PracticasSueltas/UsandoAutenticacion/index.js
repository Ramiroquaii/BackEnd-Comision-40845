const express = require('express');
const session = require('express-session');

const app = express();
app.use(session({ secret: 'secreto' }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const users = [];

app.post('/signup', (req,res) => {

});

app.post('/login', (req,res) => {
    const { name, password } = req.body;

    const user = users.find(user => user.name === name);
    if(!user) {
        res.status(403).send('Datos Invalidos');
        return;
    }
    req.session.name = name;
    res.redirect('/datos');
});

