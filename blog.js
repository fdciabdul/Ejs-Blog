function gs(req,settings){
    var shortcuts=[];
    if(req.session.user===settings.account.acc){
            shortcuts.push({
                text: 'logout',
                href: '/logout'
            });
            shortcuts.push({
                text: 'new post',
                href: '/new'
            });
        }
        else{
            shortcuts.push({
                text: 'login',
                href: '/login'
            });
        }
    return shortcuts;
}
module.exports=function(app,fs,path,moment,settings){
    app.get('/',(req,res)=>{
        let shortcuts=gs(req,settings);
        fs.readFile(settings.blog.articlesData).then(data=>{
                res.render('index',{
                    title: settings.blog.title,
                    banner: settings.blog.banner,
                    articles: JSON.parse(data).sort((a,b)=>a.date<b.date).map(e=>{
                        e.date=moment(e.date).format(settings.blog.dateFormat);
                        return e;
                    }),
                    shortcuts: shortcuts,
                    login: req.session.user===settings.account.acc
                });
            }).catch(err=>{
                console.log('server error');
            });
    });
    app.get('/article/:name',(req,res)=>{
        let shortcuts=gs(req,settings);
        fs.readFile(path.join(__dirname,'articles',req.params.name)).then(content=>{
            res.render('article',{
                title: req.params.name,
                banner: settings.blog.banner,
                content: content,
                shortcuts: shortcuts
            });
        }).catch(err=>{
            res.send('server error');
        });
    });
    app.get('/del/:name',(req,res)=>{
        if(req.session.user!=settings.account.acc){
            res.redirect('/');
        }
        else{
            fs.unlink(path.join(__dirname,'articles',req.params.name),err=>{});
            fs.readFile(path.join(__dirname,'./articles.json')).then(articles=>{
                articles=JSON.parse(articles);
                articles=articles.filter(i=>i.name!=req.params.name);
                fs.writeFile(path.join(__dirname,'./articles.json'),JSON.stringify(articles),err=>{});
                res.redirect('/');
            }).catch(err=>{});
        }
    });
};