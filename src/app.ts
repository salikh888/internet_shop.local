/*
import * as http from "http";

// http.createServer().listen(3000);
http.createServer((req, res)=>{
    console.log(req.url);

    res.setHeader('Content-type', 'text/html; charset=utf-8;');

    if (req.url === '/'){
        res.end('main <h1>Hello</h1> Главная');
    }
    else if (req.url === '/cat'){
        res.end('Category');
    }

}).listen(3000);
 */
import express = require('express');

const app = express();
app.use(express.static('public'));

//подключаем и указываем шаблонизатор
app.set('view engine', 'pug');

app.get('/', (req: express.Request, res: express.Response) => {
    res.render('main',{
        foo: 4,
        bar:8
    });
});

app.listen(3000,()=>{
    console.log('Listen port 3000');
});