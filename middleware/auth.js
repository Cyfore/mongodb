// authentication için bir middleware yazarsak middleware klasörü oluşturmalıyız.
// middleware gerçek hayattaki örneği en alt satırda

const jwt = require("jsonwebtoken");


const auth = async(req, res, next) => {
    try {
        // frontend kısmında tokenların kaydedilmiş olduğunu varsayarsak
        // tokenları kontrol etmek için
        const token = req.headers.authorization.split("")[1]
        // yukarıdaki kodun anlamı aşağıda anlatıldığı gibidir
        // gelen tokenları şöyle olduğunu varsayalım
        // "Bearer sfsdfsdfsdfsd"
        // ben tokenı oluştururken şunu istiyorum
        // splitle böl ["Bearer", "sfsdfsdfsdfsd"]
        // ve 0. indexi değilde 1. indexi yani sfsdfsdfsdfsd i al
        
        // eğer kişi token kaydettiyse
        // giriş işlemlerini sağladıysa
        let decodedData;

        // önceden oluşturduğum secret token ile
        // o kişi olup olmadığını bulma kısmı
        if (token) {
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN)
            
            // eğer decodedData içinde veri varsa
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = auth


// alışveriş yapmak istediğimizde ürünü sepete ekleriz
// sonra ise ödeme aşamasında eğer login olmadıysak
// bizi logine yönlendirir.
// bunu middleware yapar