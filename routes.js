const express = require("express")
const routes = express.Router() /* Variavel resposavel pelas rotas */
const instructors = require("./instructors")

routes.get('/', function(req, res){
    return res.render("instructors/index")
})

routes.get('/instructors', function(req, res){
    return res.render("instructors/index")
})
routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create")
})

routes.get('/instructors/:id', instructors.show)

routes.post("/instructors",instructors.post)

routes.get('/members', function(req,res){
    return res.render("members")
})


module.exports= routes