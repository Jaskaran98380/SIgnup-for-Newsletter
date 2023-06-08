const express=require("express");
const request=require("request");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const first=req.body.fname;
    const last=req.body.lname;
    const mail=req.body.email;
    // console.log(first,last,mail);

    const data={
        members:[
            {
                email_address:mail,
                status:"subscribed",
                merge_fields:{
                    FNAME:first,
                    LNAME:last
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);  //mailchimp api expect us to send data as a string(json).

    const url="https://us21.api.mailchimp.com/3.0/lists/6f1a01a787";

    const options = {
        method:"POST",
        auth:"jaskaran:afa21e4315f35c954d9ccabc19d06f35-us21"
    };
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/f",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(req,res){
    console.log("Server running on 3000");
})


//afa21e4315f35c954d9ccabc19d06f35-us21
//6f1a01a787