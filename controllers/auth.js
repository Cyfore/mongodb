// Routes dizinin içerisindeki dosyaların içeriği uzun olmasın diye controller dizisine ihtiyacımız var

// modelımızıda buraya import etmemiz lazım
const Auth = require('../models/auth.js')
// şifrelerin hashlenmesi için bcryptjs
const bcrypt = require('bcryptjs');
// token oluşturmak için
const jwt = require('jsonwebtoken')

// req ve res dışarıdan alınacak değerler
// bu alttaki işlemleri yapabilmem için veritabanıyla eş zamanlı çalışmam lazım
// veritabanına ulaşmak için bir model gerekiyor
// req ime frontend kısmından bir takım bilgiler gelecek.
// username email password gibi
const register = async(req, res) => {
    try {
        // req.body den gerekli bilgileri alıp
        // username gibi parametrelere eşitliyoruz.
        // ve req.body den gelen değerlerin bana sıkıntı yaşatmaması için
        // index.js e app.use(express.json({limit: '30mb}, extended: true))
        // e benzer şeyler yazıyoruz.
        const {username, email, password} = req.body
        // başka emaillerle karşılaştırma işlemleri
        // dışarıdan girilen email bilgisini git veritabanından bul
        // eğer bulursan böyle bir email hesabı var sen bununla email olamazsın senaryosu yapılması gerekir.
        const user = await Auth.findOne({email})

        if (user) {
            // http status değerlerini detaylıca araştır!!!
            return res.status(500).json({message: "Bu email hesabı zaten bulunmakta!!"})
        }

        if (password.length < 6) {
            return res.status(500).json({message: "Parolanız 6 karakterden küçük olmamalı!!"})
        }

        const passwordHash = await bcrypt.hash(password, 12)

        // veritabanı üzerinden yeni bir user oluşturmam gerekiyor
        const newUser = await Auth.create({username, email, password: passwordHash})

        // bu oluşturduğum user üzerinden token oluşturup döndüreceğim
        // bu token frontend kısmında güvenlik açıkları açmamak için kullanılacak bir yapı
        // bu tokenı id ye göre oluşturacağım
        // secret token oluşturmak için .env de tanımladığın
        const userToken =  jwt.sign({id: newUser.id}, process.env.SECRET_TOKEN, {expiresIn: '1h'});
        // yukarıdaki satırda token oluştu

        // oluşturulduğunu göstermek için alttaki değerli döndürmesini istiyorum.
        res.status(201).json({status: "OK", newUser, userToken})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const login = async(req, res) => {
    try {
        // login için email ve password gerekli
        const {email, password} = req.body;

        // kayıtlı email varsa true döner
        const user = await Auth.findOne({email});
        if (!user) {
            return res.status(500).json({message: "Böyle bir kullanıcı bulunamadı"})
        }
        // parolayı bulduğum userla kıyasla
        // bulamazsa false
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            res.status(500).json({message: "Parolanız yanlış"})
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN, {expiresIn: '1h'})

        res.status(200).json({
            status: "OK",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

module.exports = {register, login}