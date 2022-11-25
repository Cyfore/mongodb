// Rotalarımı belirleyebilmek için routes dizini.
// authentication işlemlerini yapmak için routes un içerisinde auth.js diye dosya oluşturacağız.


const express = require("express");
const { register, login } = require("../controllers/auth.js");

const router = express.Router();

// /register kısmına gitsin ve bunun karşılığında 
// register fonksiyonunu bana geri getirsin.
router.post('/register', register)

// bu register ve login işlemleri burada tanımlı değil ama
// controller da tanımlı olduğunu varsayıyoruz.

// login işlemlerini yapabilmem içinse alttaki işlem
router.post('/login', login)

// ana dizinde kullanabilmek için

module.exports = router