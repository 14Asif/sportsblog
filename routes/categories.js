const express=require('express');
const router=express.Router();
Category=require('../models/category.js');
//Get category route
router.get('/',(req,res,next)=>{
  Category.getCategories((err,categories)=>{
    if(err){
      res.send(err);
    }

    res.render('categories',{title:'Categories',categories:categories});
  })

});
// Add Category Post
router.post('/add',(req,res,next)=>{
  let category=new Category();
  category.title=req.body.title;
  category.description=req.body.description;

Category.addCategory(category,(err,category)=>{
  if(err){
    res.send(err);
  }
  res.redirect('/manage/categories');
});
});
//Edit Category post
router.post('/edit/:id',(req,res,next)=>{
  let category=new Category();
  const query={_id:req.params.id}
  const update={title:req.body.title,description:req.body.description}


Category.updateCategory(query,update,{},(err,category)=>{
  if(err){
     res.send(err);
  }
  res.redirect('/manage/categories');
});
});
//Delete Category-delete
router.delete('/delete/:id',(req,res,next)=>{

  const query={_id:req.params.id}
Category.removeCategory(query,(err,category)=>{
  if(err){
     res.send(err);
  }
  res.status(200);
});
});
module.exports=router;
