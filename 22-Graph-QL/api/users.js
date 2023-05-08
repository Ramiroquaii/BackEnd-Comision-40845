const Router = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { urlAtlas, mongoDBase } = require('../environment.js');

const bcrypt = require('bcrypt');

function connectAtlas() {
  const client = new MongoClient(
    urlAtlas,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    }
  );
  return client;
}

const userApiRouter = new Router()

userApiRouter.post('/login', async (req, res) => {
  const usr = req.body.user;
  const pwd = req.body.pass;

  let storedUser = await getUser(usr);

  bcrypt.compare(pwd, storedUser.passwd, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        req.session.loguedUser = usr;
        res.json({ estado: 1, usuario: req.session.loguedUser });
      } else {
        res.json({ estado: 0, mensaje: "LogIn error - Intnete nuevamente" });
      }
    }
  });
});

userApiRouter.post('/register', async (req, res) => {
  const usr = req.body.user;
  const pwd = req.body.pass;
  const age = req.body.age;
  const mail = req.body.mail;
  const phone = req.body.phone;

  let storedUser = await getUser(usr);

  if (storedUser == null) {
    try {
      const hash = await bcrypt.hash(pwd, 5);
      let inserted = await addUser({user: usr, passwd: hash, age: age, mail: mail, phone: phone});
      if (inserted.status == 0) {res.json({ estado: 0, mensaje: `USUARIO INSERTADO CON EXITO !!\n\nID: ${inserted.id}` });}
      if (inserted.status == -1) {res.json({ estado: 1, mensaje: `ERROR AL AGREGAR USUARIO !!\n\nINTENTE NUEVAMENTE`});}
    } catch (error) {
      res.json({ estado: 1, mensaje: `ERROR INESPERADO - INTENTE NUEVAMENTE`});
    }
  } else {
    res.json({ estado: 1, mensaje: `ERROR USUARIO EXISTENTE` });
  }
});

async function getUser(usr) {
  const client = connectAtlas();
  const databaseAtlas = client.db(mongoDBase);
  const collectionUsuarios = databaseAtlas.collection("users");

  let result;
  try {
    const query = { user: usr };
    result = await collectionUsuarios.findOne(query);
  } finally {
    await client.close();
  }
  return result; //Null si usuario no existe - Objeto usuario si se encuentra en la DB.  
}

async function addUser(docUsr) {
  const client = connectAtlas();
  const databaseAtlas = client.db(mongoDBase);
  const collectionUsuarios = databaseAtlas.collection("users");

  let result = null;
  let estado = -1;
  try {
    result = await collectionUsuarios.insertOne(docUsr);
    estado = 0;
  } catch (error) {
    console.log('Error:', err.message);
  }
  finally {
    await client.close();
    return {status: estado, id: result.insertedId};
  }
}

function encrypt(plainText) {
  bcrypt.hash(plainText, 5)
  .then(hash => {
    return hash;
  })
  .catch(err => {
    console.error(err);
    return -1;
  });
}

module.exports = { userApiRouter };