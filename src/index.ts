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