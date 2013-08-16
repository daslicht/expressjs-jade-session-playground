app.get('/',function(req, res){

    console.log('CU:',req.session);

    var currentUser = false;
    if(typeof(req.session.currentUser) != 'undefined' ){
        currentUser= req.session.currentUser
    }
    context ={  title: 'HOME',
        currentUser: currentUser

    };
    res.render('user', context);


});
