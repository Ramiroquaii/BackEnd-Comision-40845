/*
Realizar un programa de backend que permita gestionar cookies desde el frontend. Para ello: 
Definir una ruta “cookies”.
Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de
duración en segundos, y que genere y guarde dicha cookie.
Definir un método GET que devuelva todas las cookies presentes.
Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.
*/

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser('mi-super-secreto'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const myMiddleware = (req, res, next) => {
    console.log(req.cookies)
    if (req.cookies.isLogged === 'true') {
        next();
    }
    return res.send('No way!');
};

const cookiesRouter = express.Router();
cookiesRouter.post('/', (req, res) => {
    const cookieName = req.body.name;
    const cookieValue = req.body.value;
    const maxAge = req.body.maxAge;

    res.cookie(cookieName, cookieValue, { maxAge }).send('OK');
});

cookiesRouter.get('/', myMiddleware, (req, res) => {
    console.log('Hello!');
    res.send(`Your cookies are: ${JSON.stringify(req.cookies, null, 2)}`);
});

cookiesRouter.delete('/:name', (req, res) => {
    const cookieName = req.params.name;

    res.clearCookie(cookieName).send(`Your cookie ${cookieName} was deleted`);
});

app.use('/cookies', cookiesRouter);

app.listen(3000, () => console.log('SERVER on 8080 - Cookies time!'));
