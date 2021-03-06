const { ageCalc, formatCreatedAt, dateFormat } = require('../../lib/utils')
const Member = require('../models/Member')

module.exports = {
    index(req, res){
        let { filter, limit, page } = req.query
        
        filter = filter || ""
        limit = limit || 2
        page = page || 1
        offset = limit *(page-1)
    
        const params = {
            filter,
            limit,
            offset,
            callback(members){
                const pagination = {
                    page,
                    total : Math.ceil(members[0].total / limit)
                }
                return res.render("members/index", { members, pagination})
            }
        }


        Member.paginate(params)
        
    },
    create(req, res){
        Member.instructorsSelectOptions(function(options){
            return res.render("members/create", { instructorOptions: options})
        })
    },
    post(req, res){
        //req.query GET
        //req.body Post
    
        //Validation
        
        const keys = Object.keys(req.body)
    
        for (key of keys ){
            if(req.body[key] == ''){
                return res.send("Please, fill all the filds")
            }
        }
        const { avatar_url,name, email, birth, gender, blood, weight, height,instructor } = req.body
        console.log(req.body)
        const values = [
            avatar_url,
            name,
            email,
            dateFormat(birth).iso,
            gender,
            blood,
            weight,
            height,
            instructor
            
        ]
        
        Member.create(values, function(id){
            return res.redirect(`members/${id}`)
        })
        

    },
    show(req, res){
        Member.find(req.params.id, function(value){
            if(!value) return res.send("Member not found")
            const { id, name, avatar_url, email, gender, birth, blood, weight, height} = value
            Member.memberShowInstructor(id, function(instructor_name){
                const member = {
                    id, 
                    name,
                    avatar_url,
                    email,
                    gender,
                    birth:dateFormat(birth).birthday,
                    blood,
                    weight,
                    height,
                    instructor_name
                }
    
                return res.render('members/show', { member })
            })
            
        })
    },
    edit(req, res){
        Member.find(req.params.id, function(value){
            if(!value) return res.send("Member not found")
            const { id, avatar_url,name, email, birth, gender, blood, weight, height } = value
            member = {
                id,
                avatar_url,
                name,
                email,
                birth : dateFormat(birth).iso,
                gender,
                blood,
                weight,
                height
            }
            Member.instructorsSelectOptions(function(instructorOptions){
                
                return res.render('members/edit', {member, instructorOptions})
            })

            //res.render('members/edit', { member }) 


        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
        for (key of keys){
            if(key ==''){
                return res.send("Please, fill all the fields")
            }
        }
        const { avatar_url, name, email, gender, birth, weight, height, blood,id, instructor } = req.body
        member = [
            avatar_url,
            name, 
            email,
            gender,
            dateFormat(birth).iso,
            blood,
            weight,
            height,
            instructor,
            id
        ]
        Member.update(member, function(){
            return res.redirect(`members/${id}`)
        })


    },
    delete(req, res){
        Member.delete(req.body.id , function(){
            res.redirect("members")    
        })
    },
}
