var express = require('express')
  , http = require('http')
  , flash = require('connect-flash')
  , db = require('./Database/db')
  , passport = require('passport')
  , sanitize = require('validator').sanitize
  , auth = require('./passport-config');
var myMiddleware =  require('./MiddlewareTest.js')
/* GLOBAL
** ****************************************/
        appDir = __dirname
        path = require('path')
       // formidable = require('formidable')
        fs = require('fs');
        S = require('string')
        _ = require('underscore')
        moment = require('moment')
        app = express()

        ensureAuthenticated = function(req, res, next) {
            if(req.method==='POST') {

                for(var key in req.body) {
                    req.body[key] =  sanitize(req.body[key]).xss();

                    if(req.body[key].search("[removed]") > 0) {
                        console.log('xss found!')
                        req.valid = false;
                        return res.redirect('/logout')
                    }
                }
            }
            req.isAuthenticated()
            if (req.isAuthenticated()) {
                console.log(' valid ')
                return next();
            }else{
                console.log('not valid ')
                res.redirect('/')
            }


        }

//http://stephensugden.com/middleware_guide/
/* CONFIG
** *****************************************/
        //bob.use('/attention', worseThanUselessMiddleware)
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'blade');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        //app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/uploads" }));
       // app.use(express.bodyParser());
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.cookieParser('secret'));
        app.use(express.session({ secret: 'secret',
                                     key: 'session.sid',
                                  cookie: {secure: false, maxAge: 60000 }}));
       // app.use(myMiddleware())
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));

/* DEV ONLY CONFIG
** ******************************************/
        if ('development' == app.get('env')) {
          app.use(express.errorHandler());
        }


var server = http.createServer(app).listen(app.get('port'), function()
{
    console.log('Express server listening on port ' + app.get('port'));

    /* SERVICES
    ** ******************************************/
            BlogService = require('./Model/BlogService.js')
            UserService = require('./Model/UserService.js')

    /* SOCKET.IO
    ** ******************************************/
            io = require('socket.io').listen(server);
            io.set('log level', 0);
            io.sockets.on('connection', function (socket){

                socket.on('disconnect', function(){
                    console.log('socket disconnected: ',socket.handshake.sessionID);
                });
            });

    /* ROUTES
    ** ******************************************/
            require('./routes/user')
            require('./routes/index')
            require('./routes/upload')


});
