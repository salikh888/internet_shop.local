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
import mysql = require('mysql');

const app = express();
app.use(express.static('public'));

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'shop'
});
//подключаем и указываем шаблонизатор
app.set('view engine', 'pug');
// let goods:[number, string, string, number, string, number];

app.get('/', (req: express.Request, res: express.Response) => {
    con.query(
        'SELECT * FROM goods',
        (error, result)=>{
            if (error) throw error;

            let goods:any = {};
            for (let i = 0; i < result.length; i++){
                goods[result[i]['id']] = result[i];
            }

            console.log(JSON.parse(JSON.stringify(goods)));
            res.render('main',{
                foo: 4,
                bar:7,
                goods: JSON.parse(JSON.stringify(goods))
            });
        }
    );

});

app.listen(3000,()=>{
    console.log('Listen port 3000');
});