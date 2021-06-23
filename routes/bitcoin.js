const verify=require('./verifyJWT');


const router = require('express').Router();


router.get('/',verify, (req, res) => {

    res.json({ posts: { title: 'mine', description: 'math is worth doing' } })










})











module.exports = router;