
/*
 * HOME / INDEX
 * *********************************************************************
 * */
        app.get('/', function( req, res) {

            var context ={
                user: req.user,
                title : S('I am a Long Text which is Log').truncate(10),
                message: req.flash('error'),//req.session.messages
                blog : false
            }
            BlogService.getAll(req,res,function(result){
                if(result) {
                    context.blog = result;
                }

                res.render('index', context);
            })


        });


/*
 * CREATE
 * *********************************************************************
 * */
        app.get('/create-post', ensureAuthenticated, function( req, res) {

            var context ={
                date: moment().format("YYYY-MM-DD"),
                user: req.user,
                title : 'Create',
                message: req.flash('error')//req.session.messages
            }
            res.render('create-post', context);
        });

        app.post('/create-post', ensureAuthenticated, function(req, res) {
            BlogService.createPost( req, res, function( result) {
                if(result === 'success') {
                    res.redirect('/')
                }else{
                    res.redirect('/create-post')
                }

            });
        });

