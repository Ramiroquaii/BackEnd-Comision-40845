const dotenv = require('dotenv');
const yargs = require('yargs');

dotenv.config();

const argv = yargs
  .option('serverPort', { alias: 'p', description: 'Port number to use for the server', type: 'number', default: 8080 })
  .option('serverMode', { alias: 'm', description: 'standAlone / cluster : server mode', type: 'string', default: 'standAlone' })
  .option('clusterPort', { alias: 'cp', description: 'Port number for 1sr server in cluster', type: 'number', default: 8082 })
  .help()
  .alias('help', 'h')
  .argv;

// Override the value of .ENV fiele if command options are specified.
if (argv['serverPort']) { process.env.SERVER_PORT = argv['serverPort']; }
if (argv['serverMode']) { process.env.SERVER_MODE = argv['serverMode']; }
if (argv['clusterPort']) { process.env.CLUSTER_INITIAL_PORT = argv['clusterPort']; }

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoDBase = process.env.MONGO_DB;
const urlAtlas = `mongodb+srv://${mongoUser}:${mongoPass}@rov-cluster.xnap6cc.mongodb.net/?retryWrites=true&w=majority`;

const serverPort = process.env.SERVER_PORT;
const serverMode = process.env.SERVER_MODE;
const sessionSecret = process.env.SESSION_SECRET;
const clusterPort = process.env.CLUSTER_INITIAL_PORT;

module.exports = { serverPort, serverMode, clusterPort, sessionSecret, urlAtlas, mongoDBase };