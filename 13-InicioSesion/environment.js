const dotenv = require('dotenv');

dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoDBase = process.env.MONGO_DB;

const urlAtlas = `mongodb+srv://${mongoUser}:${mongoPass}@rov-cluster.xnap6cc.mongodb.net/?retryWrites=true&w=majority`;

const serverPort = process.env.SERVER_PORT;
const sessionSecret = process.env.SESSION_SECRET;

module.exports = { serverPort, sessionSecret, urlAtlas, mongoDBase };