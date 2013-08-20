var mongoose = require('./../Database/db')
   ,uniqueValidator = require('mongoose-unique-validator')
   ,validate = require('mongoose-validator').validate
   ,sanitize = require('mongoose-validator').sanitize
   ,bcrypt = require('bcrypt')
   ,SALT_WORK_FACTOR = 10;

/*
* VALIDATORS
* ***********************************************************************************/

//        var nameValidator = [validate({message: "String should be between 3 and 50 characters"},'len', 3, 50),
//                             validate('isAlphanumeric')];
//
//        var emailValidator = [validate({message: "This is not an eMail"},'isEmail')];

        /*
         * ,
         validate: nameValidator
         * */

 /* USER SCHEMA
* *********************************************************************************/

        var userSchema = mongoose.Schema({
            username: {
                type: String,
                required: true,
                unique: true
            },
            email: {
                type: String,
                index: true,
                unique: true,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        });



/*
* USER LOGIN
* ********************************************************************************/

        // Bcrypt middleware
        userSchema.pre('save', function(next) {
            var user = this;

            if(!user.isModified('password')) return next();

            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if(err) return next(err);

                bcrypt.hash(user.password, salt, function( err, hash) {
                    if(err) return next(err);
                    user.password = hash;
                    next();
                });
            });
        });

        // Password verification
        userSchema.methods.comparePassword = function( candidatePassword, cb) {
            bcrypt.compare(candidatePassword, this.password, function( err, isMatch) {
                if(err) return cb(err);
                cb(null, isMatch);
            });
        };


/*
 * SETUP USER MODEL
 * ********************************************************************************/
        userSchema.plugin(uniqueValidator, { mongoose: mongoose });

//        userSchema.path('username').index({ unique: true });
//        userSchema.path('email').index({ unique: true });
        var User = mongoose.model( 'User', userSchema );
/*
== EXPORTS ========
*/
module.exports.User = User;

/*
 * SIGNUP USER
 * ********************************************************************************/

module.exports.signUp = function( req, res, callback ) {



    var post = req.body;
    console.log('POST',post)
    var user = new User({
        username : post.username,
           email : post.email,
        password : post.password
    });

    user.save( function(err) {
        if(err) {
            var test = {};
            _.each(err.errors, function(value,key,list){
                if( value.type === 'unique' && value.path === 'email' ) {

                }
            });
            if(_.toArray(err.errors).length>0){
                req.flash('error',_.toArray(err.errors));
            }
            callback('error')
        }else{
            console.log('User Saved')
            req.logIn( user, function( err) {
                if(err) {
                    if(_.toArray(err.errors).length>0){
                        req.flash('error',_.toArray(err.errors));
                    }
                    return callback('error')
                }
                callback('success')
            });

        }
    });
}

//[
//
//{
//    username:
//            { message: 'Validator "required" failed for path username with value ``',
//                name: 'ValidatorError',
//                path: 'username',
//                type: 'required',
//                value: ''
//            },
//    email:
//            {   message: 'Validator "unique" failed for path email with value `daslicht@ansolas.de`',
//                name: 'ValidatorError',
//                path: 'email',
//                type: 'unique',
//                value: 'daslicht@ansolas.de'
//            }
//}
//
//]