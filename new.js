module.exports=function(app,fs,path,settings){
    app.get('/new',(req,res)=>{
        if(req.session.user!=settings.account.acc){
            res.redirect('/');
        }
        res.render('new',{
            title: 'new post'
        });
    });
    app.post('/new',(req,res)=>{
        if(req.session.user!=settings.account.acc){
            res.redirect('/');
        }
        else{
            fs.writeFile(path.join(__dirname,'articles',req.body.title),req.body.html);
            fs.readFile(path.join(__dirname,'./articles.json')).then(articles=>{
                articles=JSON.parse(articles);
                articles.push({
                    name: req.body.title,
                    path: path.join('./articles',req.body.title),
                    url: path.join('./article',req.body.title),
                    date: Date.now()
                });
                fs.writeFile(path.join(__dirname,'./articles.json'),JSON.stringify(articles),err=>{});
                res.redirect('/article/'+req.body.title);
            }).catch(err=>{});
        }
    });
};