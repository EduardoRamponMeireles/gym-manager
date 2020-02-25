const fs = require('fs')
const data = require('./data.json')

//post
exports.post = function(req, res){
    //req.query GET
    //req.body Post

    //Validation

    const keys = Object.keys(req.body)

    for (key of keys ){
        if(req.body[key] == ''){
            return res.send("Please, fill all the filds")
        }
    }
    
    //Treatment
    req.body.birth = Date.parse(req.body.birth)
    req.body.id = Number(data.instructors.length + 1)
    req.body.created_at = Date.now();

    //Destructuring and organizing.
    const { avatar_url, name, birth, gender, services, id, created_at} = req.body


    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) throw err
        return res.redirect("/instructors")
    })

}

//update



//delete



