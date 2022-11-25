// Bu üstekilerden önce mongodb entegrasyonunu sağlamam gerekiyor.
// Bunun içinde config dizinin içerisinde database.js isminde dosya oluşturuyoruz.

// mongodb bağlantılarını kurmak için mongoose paketini kullanmamız gerekiyor.
const mongoose = require('mongoose');

const db = () => {
    // bu connect kısmına mongodb den gelen U R I yazılmalı
    // alttaki kullanım bana bir promise dönecek
    // promise gerçek hayattaki örneği en son satırda anlatılmıştır.
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }).then(()=> {
        console.log("mongoDB connectttt");
    }).catch((error)=> {
        // hata dönülmesini istiyorsanız.
        // throw new Error(error.message)
        console.log(error);
    })
}

// diğer klasörlerden ulaşmamız için module.exports yapısını kullanıyoruz
module.exports = db




    // internetten hamburger siparişi söylediğinizde
    // siparişinizin kontrolünü ekrandan gerçekleştirirsiniz
    // eğer beklenmedik bir sıkıntı olmadıysa hamburgerinizi alır ve yersiniz
    // aksi taktirde başarısızlıkla sonuçlanır ve bununla birlikte ya kavga edersiniz
    // ya da tekrar sipariş söylersiniz

    // o yüzden bu hikaye promise a benzetilmiştir
    // veritabanı bizlere söz vermiştir ama bu sözü tutmazsa
    // ona göre error handling işlemleri yapmamız gerekecek  ya da istenilmeyen
    // sonuçlar dönecek.