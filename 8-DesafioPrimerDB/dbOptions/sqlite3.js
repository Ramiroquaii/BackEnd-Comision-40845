const path = require('path');

const DBSOURCE = path.join(__dirname, '../DBLite/mydb.sqlite');

const options = {
    client : 'sqlite3',
    connection : {
        filename: DBSOURCE
    },
    useNullAsDefault: true
};

module.exports = { options };