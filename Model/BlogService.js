var mongoose = require('./../Database/db')
    ,uniqueValidator = require('mongoose-unique-validator')
    , sanitize = require('validator').sanitize
    ,validate = require('mongoose-validator').validate;

exports['myfilter'] = function(text) {
    return "<![CDATA[\n" + text + "\n]]>";
}
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

/* SCHEMA
 * *********************************************************************************/

    var blogSchema = mongoose.Schema({
        createdAt: {
            type: Date,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        headline: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    });


/*
 * SETUP
 * ********************************************************************************/
        blogSchema.plugin(uniqueValidator, { mongoose: mongoose });

//        blogSchema.pre('save', function (next) {
//            var obj = this;
//
//
////            Object.keys(obj).forEach(function (key) {
////                console.log('Keys: ',obj[key]);
////            });
////            console.log('for start -------------------------')
////                for(var key in obj) {
////                    console.log(obj[key])
////                }
//            console.log('for end -------------------------', obj.hasOwnProperty())
////            _.each( self , function(value, key, list){
////                console.log('VALUE:',key);
////
////            })
//
//            next();
//        })
        //        userSchema.path('username').index({ unique: true });
        //        userSchema.path('email').index({ unique: true });

        var Blog = mongoose.model( 'Blog', blogSchema );
/*
 * EXPORTS
 * ********************************************************************************/
        module.exports.Blog = Blog;


        module.exports.createPost = function( req, res, callback) {



            var post = {
                createdAt : req.body.date,
                createdBy : req.user.username,
                headline : req.body.headline,
                content : req.body.content
            }

//            _.each( post , function(value, key, list){
//               post[key] =  sanitize(value).xss();
//            })

            var item = new Blog(post);

            item.save( function(err) {
                if(err) {
                    if(_.toArray(err.errors).length>0){
                        req.flash('error',_.toArray(err.errors));
                    }
                    console.log('Blog Error', err)
                    callback('error')
                }else{
                    console.log('Blog Saved')
                    callback('success')
                }
            });

        }

        module.exports.getAll = function( req, res, callback) {
            Blog.find(function (err, items) {
                if(err) {
                    callback( false)
                }else{
                   // console.log(items)
                    callback( items)
                }

            })
        }



//var user = new User({
//    username : post.username,
//    email : post.email,
//    password : post.password
//});
//
//user.save( function(err) {
//    if(err) {
//        var test = {};
//        _.each(err.errors, function(value,key,list){
//            if( value.type === 'unique' && value.path === 'email' ) {
//
//            }
//        });
//        if(_.toArray(err.errors).length>0){
//            req.flash('error',_.toArray(err.errors));
//        }
//        callback('error')
//    }else{
//        console.log('User Saved')
//        req.logIn( user, function( err) {
//            if(err) {
//                if(_.toArray(err.errors).length>0){
//                    req.flash('error',_.toArray(err.errors));
//                }
//                return callback('error')
//            }
//            callback('success')
//        });
//
//    }
//});