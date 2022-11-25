// veritabanına kayıt işlemleri için models dizinini oluşturuyoruz.
//  routes da yaptığımız işlemlerin model yapısını belirleyebilmek için models dizinin içerisinde auth.js dosyası oluşturmalıyız.

// model ı mongoose üzerinden yapacağız
const mongoose = require('mongoose');



// veritabanına ulaşmak için bir model gerekiyor
// Yeni bir model oluşturuyorum
// Dışarıdan ben Authentication işlemlerini yaparken
// register ve login gibi olabilir
// dışarıdan ne alabilirim
// örnek username
const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    // benim email özelliğim diğerlerinden farklı olmalı
    // bir email sistemde kayıtlıysa onu farklı bir şekilde girebilmem lazım
    // aynı email i tekrar tekrar almamam lazım
    // o yüzden unique özelliği true
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date(),
    }
})

// AuthSchema yı dışarıdan ulaşmak istiyorsun
module.exports = mongoose.model('auth', AuthSchema)