app.get('/user', function(req, res){
    console.log('CU:',req.session);
    var currentUser = false;
    if(typeof(req.session.currentUser) != 'undefined'){
        currentUser= req.session.currentUser
    }
    context ={  title: 'USER',
        currentUser: currentUser
    };
    res.render('user', context);
});

app.post('/signup', function(req, res){
    var post = req.body;
    var currentUser = {
        username : post.username
    }
    req.session.currentUser = currentUser;
    console.log('CU:',req.session.currentUser);
    res.redirect('/');
});

app.post('/login', function(req, res){
    var post = req.body;
    var currentUser = {
        username : post.username
    }
    req.session.currentUser = currentUser;
    console.log('CU:',req.session.currentUser);
    res.redirect('/');
});

app.get('/logout', function(req, res){

   // req.session.currentUser = currentUser;
    req.session.destroy();// = null;
    console.log('logout',req.session)
    res.redirect('/');
})