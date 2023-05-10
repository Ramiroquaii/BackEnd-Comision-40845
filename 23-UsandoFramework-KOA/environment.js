const dotenv = require('dotenv');
const yargs = require('yargs');

dotenv.config();

const argv = yargs
  .option('serverPort', { alias: 'p', description: 'Port number to use for the server', type: 'number', default: 3000 })
  .help()
  .alias('help', 'h')
  .argv;

// Override the value of .ENV fiele if command options are specified.
if (argv['serverPort']) { process.env.SERVER_PORT = argv['serverPort']; }

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoDBase = process.env.MONGO_DB;
const urlAtlas = `mongodb+srv://${mongoUser}:${mongoPass}@rov-cluster.xnap6cc.mongodb.net/?retryWrites=true&w=majority`;

const serverPort = process.env.SERVER_PORT;
const sessionSecret = process.env.SESSION_SECRET;

module.exports = { serverPort, sessionSecret, urlAtlas, mongoDBase };