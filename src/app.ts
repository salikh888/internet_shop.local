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
import {resolve} from "dns";


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

            //console.log(JSON.parse(JSON.stringify(goods)));
            res.render('main',{
                foo: 4,
                bar:7,
                goods: JSON.parse(JSON.stringify(goods))
            });
        }
    );

});

app.get('/cat', (req: express.Request, res: express.Response) => {
    //console.log(req.query.id);
    let catId = req.query.id;
    //res.render('cat',{});

    let cat = new Promise((resolve, reject)=>{
        con.query(
            'SELECT * FROM category WHERE id='+catId,
            (error, result)=>{
                if (error) reject(error);
                resolve(result);
                //console.log(JSON.parse(JSON.stringify(result)));
            });
    });
    let goods = new Promise((resolve, reject)=>{
        con.query(
            'SELECT * FROM goods WHERE category='+catId,
            (error, result)=>{
                if (error) reject(error);
                resolve(result);
                //console.log(JSON.parse(JSON.stringify(result)));
            });
    });
    Promise.all([cat, goods]).then((value)=>{
        console.log(value);
        res.render('cat',{
            cat: JSON.parse(JSON.stringify(value[0])),
            goods: JSON.parse(JSON.stringify(value[1]))
        })
    })

});



app.listen(3000,()=>{
    console.log('Listen port 3000');
});