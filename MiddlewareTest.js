/*
USE behind BodyParser , other case req.body will undefined
*/

var sanitize = require('validator').sanitize
var test = function(options){

    return function(req, res, next) {

        req.valid = true;
        if(req.method==='POST') {
            console.log('MID POST', req.body)

            for(var key in req.body) {
                req.body[key] =  sanitize(req.body[key]).xss();

                if(req.body[key].search("[removed]") > 0) {
                    console.log('xss found')
                    req.valid = false;

                }

            }


//            _.each(  req.body , function(value, key, list){
//                req.body[key] =  sanitize(value).xss();
//            })
            req.doit = function() {
                console.log('doit')

            }
        }
        next();
    }

}


module.exports = test;