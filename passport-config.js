var passport = require('passport')
   ,User = require('./Model/UserService').User
   ,LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy(function(username, password, done) {

    User.findOne({ username: username }, function(err, user) {

        if(err) {
            return done(err);
        }

        if(!user) {
            return done(null, false, { message: 'Unknown user ' + username });
        }

        user.comparePassword( password, function(err, isMatch) {

            if(err) return done(err);

            if(isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password' });
            }
        });
    });

}));
