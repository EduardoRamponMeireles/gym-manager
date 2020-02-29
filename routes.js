const express = require("express")
const routes = express.Router() /* Variavel resposavel pelas rotas */
const instructors = require("./instructors")

routes.get('/', instructors.index)

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create")
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.post("/instructors",instructors.post)

routes.put ("/instructors", instructors.put)

routes.delete("/instructors", instructors.delete)


routes.get('/members', function(req,res){
    return res.render("members")
})


module.exports= routes