const express = require('express');
const router = express.Router();
const mongoose =require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Post = mongoose.model("POST")


//Route
router.post("/createPost",requireLogin, (req,res)=>{
    const {title,body}=req.body;
    if(!title || body){
        return res.status(422).json({error:"Please add all the feilds"})
    }
    console.log(req.user)
   const post = new POST({
       title,
       body,
       postedBy:req.user
})
    post.save().then((result)+==>{
        return res.json({post:result})
    }).catch(err => console.log(err))

module.exports = router