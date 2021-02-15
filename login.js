module.exports=function(app,settings){
    app.get('/login',(req,res)=>{
        if(req.session.user===settings.account.acc){
            res.redirect('/');
        }
        else{
            res.render('login',{
                title: settings.blog.title,
                fail: false
            });
        }
    });
    app.post('/login',(req,res)=>{
        if(req.body.acc===settings.account.acc&&req.body.pwd===settings.account.pwd){
            req.session.user=req.body.acc;
            res.redirect('/');
        }
        else{
            res.render('login',{
                title: settings.blog.title,
                fail: true
            });
        }
    });
    app.get('/logout',(req,res)=>{
        req.session.user=null;
        res.redirect('/');
    });
};