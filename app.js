
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

_ = require('underscore');
app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
//why is secure: true not working ?!
app.use(express.session({ secret: 'secret', key: 'session.sid', cookie: {secure: false, maxAge: 60000 }}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/user')
require('./routes/index')

var server =http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    io = require('socket.io').listen(server);
    io.set('log level', 0);
    io.sockets.on('connection', function (socket){

        socket.on('disconnect', function(){
            console.log('socket disconnected: ',socket.handshake.sessionID);
        });
    });
            

});
