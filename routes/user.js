var passport = require('passport')
   //,signUp = require('../Model/UserService').signUp
/*
 * ACCOUNT
 * *********************************************************************
 * */
        app.get('/account', ensureAuthenticated, function(req, res){
            var context ={
                user: req.user,
                title : 'Home',
                message: req.flash('error')//req.session.messages
            }
            res.render('account', context);
        });

//        ensureAuthenticated = function(req, res, next) {
//            if (req.isAuthenticated()) { return next(); }
//            res.redirect('/login')
//        }

/*
 * LOGIN
 * *********************************************************************
 * */
        app.get('/login', function(req, res){
            var context ={
                user: req.user,
                title : 'Home',
                message: req.flash('error')//req.session.messages
            }

            res.render('login', context);
        });

        app.post('/login', function( req, res, next) {

            console.log('req.body:', req.body)

            passport.authenticate('local', function(err, user, info) {
                if(err) {
                    return next(err)
                }
                if(!user) {
                    console.log( 'message',info.message);
                    req.flash( 'error', info.message)
                    //req.session.messages =  [info.message];
                    return res.redirect('/')
                }
                console.log('USER: ',user)
                req.logIn( user, function( err) {
                    if(err) {
                        return next(err);
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
        });

/*
 * SIGNUP
 * *********************************************************************
 * */
        app.get('/signup', function( req, res){
            var context ={
                user: req.user,
                title : 'Home',
                message: req.flash('error')
            }
            console.log(context.message)
            res.render('signup', context)
        });

        app.post('/signup', function(req, res) {
            UserService.signUp(req, res, function(result) {
                if(result === 'success') {
                    res.redirect('/')
                }else{
                    res.redirect('signup')
                }

            });
        });








/*
 * LOGOUT
 * *********************************************************************
 * */
        app.get('/logout', function(req, res){
            req.logout();
            res.redirect('/');
        });

