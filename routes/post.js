const express = require('express');
const { getPosts, createPosts, getDetail, getUpdate, deletePost, searchPost } = require('../controllers/post.js');
const auth = require('../models/auth.js');

const  router = express.Router();



// tüm postlarımın gelmesini istersem get
// getPosts url ine yönlendirme olduğunda bana getPosts u dönsün
router.get('/getPosts', getPosts)


router.post('/createPosts',auth, createPosts)
// getDetail postun detaylar sayfası id numarasına göre yönlendirme
router.get('/getDetail/:id', getDetail)
// get update id numarasına göre update
router.patch('/getUpdate',auth, getUpdate)
// delete işlemi id numarasına göre silecek
router.delete('/deletePost',auth, deletePost)
router.get('/searchPost', searchPost)


module.exports = router;