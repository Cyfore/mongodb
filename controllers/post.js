// routes dizinin içerisindeki
// post dosyasının gerekli olan getDelete gibi fonksiyonlarını bu sayfada
// ele alacağız

const PostSchema = require('../models/post.js');

// gerekli işlemleri yapabilmem için bir tane modele ihtiyacım var
const getPosts = async(req, res) => {
    try {
        // yeni bir ürün oluşturmak istiyorum
        const newPost = await PostSchema.create(req.body)
        res.status(201).json(newPost)
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

const createPosts = async(req, res) => {
    try {

        const getPosts = await PostSchema.find()
        res.status(201).json(getPosts)
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

// dışarıdan verilen id numarasına göre bulmak
const getDetail = async(req, res) => {
    try {
        // id alttaki satır gibi gelecek
        const {id} = res.params;
        const detailPost = await PostSchema.findById(id)
        res.status(200).json(detailPost)
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

const getUpdate = async(req, res) => {
    try {
        const {id} = res.params;
        // update istediğimiz verileri dışarıdan gönderdiğimiz için req.body
        // 
        const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(updatePost)
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

const deletePost = async(req, res) => {
    try {
        const {id} = res.params;
        const newPost = await PostSchema.findByIdAndRemove(id)
        res.status(201).json({message: "Silme işleminiz başarılı"})
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

// - BİRİNCİ KISIM
// search
// http://localhost:5000/searchPost?search="samsung" diyerek
// postman üzerinde Params kısmında Key ve value olarak şu değerleri alıyorsunuz
// Key = search - Value = "samsung"
// bunu ? = Query sayesinde yapıyorsunuz

// - İKİNCİ KISIM
// hashtag
// http://localhost:5000/searchPost?search="samsung"&tag="deneme" diyerek
// KEY = tag - VALUE = "deneme"
// tekleride bu şekilde key ve value lara karşılık getiriyorsunuz
const searchPost = async (req, res) => {
    const {search, tag} = req.query;
    try {
        // search olayı alttaki satırla yapılıyr
        const title = new RegExp(search, "i")

        // girilen parametreyi senin modülünde arar
        const posts = await PostSchema.find({$or: [{title}], tag:{$in: tag.split(",")}})
        res.status(200).json({posts})
    } catch (error) {
        return res.status(500).json({message: error.message}) 
    }
}

module.exports = {createPosts, getDetail, getPosts, getUpdate, deletePost, searchPost}