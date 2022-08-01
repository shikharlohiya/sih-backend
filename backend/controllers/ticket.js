const Ticket = require("../models/ticket")

exports.ticket = (req, res)=>{
    const user = new Ticket(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "not able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            age: user.age,
            adhar: user.adhar

        });
    }) 
}

exports.getAllTickets = (req,res)=>{
    try{
        Ticket.find({},(err,results)=>{
            if(err){
                // res.send("erorr");
                console.log(err);
            }else{
                console.log(results)
                res.send(results)
            }
        });

    }catch(err){
        res.status(400).send('some error occured')
    }
}