var express = require("express")
var router = express.Router();
var mongoose = require("mongoose")
var db = mongoose(
  "meantask",
  ["task"]
)

//Get all tasks
router.get("/tasks",function(req,res,next){
  db.tasks.find(function(err,tasks){
    if(err){
      res.send(err)
    }
    res.json(tasks)
  })

})
//mongodb+srv://admin:<password>@cluster0-rjgpj.mongodb.net/test?retryWrites=true&w=majority
//Save task
router.post("/task",function(req,res,next){
  var task =req.body
  console.log(task)
  if(!task.title){
    res.status(400)
      res.json({
        error:"Bad DAta"
      })

  }else {
    db.tasks.save(task.function(err,task){
      if(err){
        res.send(err)
      }
    //res.json(task)
    })
  }
})
