var mongoose = require('mongoose');
    mongoose.connect( 'mongodb://localhost/angular-blade' );

var con = mongoose.connection;
    con.on('error', console.error.bind(console, 'connection error:'));
    con.once('open', function callback() {
        console.log('Connected to DB');
    });

module.exports = mongoose;