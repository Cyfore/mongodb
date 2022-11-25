// ONEMLI!!!!!!
// bu index.js in içerisini olabildiğince yalın tut!!!


// export yapma işlemleri require ve ilgili ismi girince oluyor
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// dosya exportlarında uzantıyı belirtmeyi unutma!!!
const db = require('./config/database.js');
const Auth = require('./routes/auth.js');
const Post = require('./routes/post.js');

// dotenv.config ile dotenv nin çalıştığını terminalde göreceğiz
dotenv.config();

// express üzerinden bir app oluşturuyoruz
// app, express in sunduğu özelliklere sahip oluyor 
const app = express();

// cors u çalıştıran use fonksiyonunu kullanıyoruz.
app.use(cors());
// ben dışarıdan veri gönderdiğimde bu verinin sıkıntı olmadan
// yazılabilmesi bir işlem
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))


app.use('/', Auth);
app.use('/', Post);


// serveri ayağa kaldırdığımızda bize bir şeyler dönmesini istiyorsak
// app.get('/', (req, res) => {
//     res.json({message: "deneme deneme"});
// })

// eğer process.env.PORT un içinde bir şey varsa onu PORT değeri olarak tutar
// eğer yoksa 5000 i PORT değeri olarak tutacaktır.
const PORT = process.env.PORT || 5000;

// database importu sağlanması için yukarıda db nin bulunduğu dosyayı import etmemiz gerekiyor
db();

// PORT a gelen değer üzerinde bir server ayağa kaldır
app.listen(PORT, () => {
    console.log("server is running on port: 5000");
})