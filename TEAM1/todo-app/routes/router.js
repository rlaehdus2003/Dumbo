var express = require('./node_modules/express');
var router = express.Router();
var mongoose = require( 'mongoose' );

router.get('/',function(req,res,next){
    res.render('Starter',{title:"Super App"});
});

module.exports = router;
