const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000
const data = require('./teacher.json');
const user = require('./users.json');
const username = user[0].username;
const password = user[0].password;
const jwt = require('jsonwebtoken');

    
app.get("/",  (request,response) => 
response.send('Selamat Datang di Integrasi JWT Renaldi INJS-KS05-011'  ),
);
 
app.post("/login", (req,res,next) => {
    try {
        const userbody = req.body.username;
        const passbody = req.body.password;
    
        if (userbody === username && passbody === password) {
            var token = jwt.sign({ data: user }, "secret");
            return res.send(token);
            
        } else {
            return res.status(403).send("Username / Password Salah!");
        }
      } catch (error) {
        res.sendStatus(403);
      }
      next();
});
//verifikasi

function verifikasi(req, response,next) {
    let getHeader = req.headers["auth"];
    if (typeof getHeader !== "undefined") {
        req.token = getHeader;
        next();
    } else {
        response.send('Gagal Verifikasi')};
}



//memberikan list biodata

app.get("/data", verifikasi, (request, response) => {
    jwt.verify(request.token, "secret", (err, dataAuth) => {
        if (err) {
            response.send('Gagal Memuat Data');
        } else {
            response.json(data)
        }
    });
});

app.listen(PORT, () => {
    console.log("App running on port: ", PORT);
  })