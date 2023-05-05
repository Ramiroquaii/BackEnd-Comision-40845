// Parametros de conexion MariaDB local.
const optionsMariaDB = {
    client : 'mysql',
    connection : {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'mariadb_appweb'
    }
};
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

// Parametros de conecxion SQLite 3 local directorio DBLite file mydb.sqlite.

const urlPath = new URL('../DBLite/mydb.sqlite', import.meta.url);

const DBSOURCE = urlPath.pathname;

const optionsSQLite = {
    client : 'sqlite3',
    connection : {
        filename: DBSOURCE
    },
    useNullAsDefault: true
};
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

// Parametros de conexion a FIREBASE remoto en servicios de nube Google.

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const optionsFireBase = {
    apiKey: "AIzaSyD5Q3vXIjIuchtSPSAUdJq2i1m8SjQRqZo",
    authDomain: "coder-backend-40845.firebaseapp.com",
    projectId: "coder-backend-40845",
    storageBucket: "coder-backend-40845.appspot.com",
    messagingSenderId: "1049239837807",
    appId: "1:1049239837807:web:39746e7c354f8a66a8819a",
    measurementId: "G-1NYNC4ND9P"
};
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


// Parametros de conexion a MONGO remoto en servicios de nube/cluster Mongo Atlas.

// const mongoose = require("mongoose");
// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoUser = "webAppCoder";
const mongoPass = "Coder-backend-40845";
const database = "coder-backend-40845";
//const optionsMongoDB = `mongodb+srv://${mongoUser}:${mongoPass}@rov-cluster.xnap6cc.mongodb.net/${database}?retryWrites=true&w=majority`;

const optionsMongoDB = `mongodb+srv://${mongoUser}:${mongoPass}@rov-cluster.xnap6cc.mongodb.net/${database}`;

// const client = new MongoClient(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-


export { optionsMariaDB, optionsSQLite, optionsMongoDB, optionsFireBase };