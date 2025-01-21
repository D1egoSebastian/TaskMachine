const {connection, Request } = require('tedious');
const config = {
    server: 'your_server_name',
    authentication: {
        type: 'default',
        options: {
            userName: 'your_user_name',
            password: 'your_password'
        }
    },
};

const connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected');
    }
});

module.exports = connection;