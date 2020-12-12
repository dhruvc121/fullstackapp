//require dependencies
const express=require('express');
const path=require('path');
const hbs=require('hbs');

require('./db/comm.js');
const User=require('./models/contactform');

//constants
const port=8000;
const app=express();


//paths
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../template/views");
const partialPath=path.join(__dirname,"../template/partials");


app.set("views",templatePath);
//app.use(express.static(staticPath));
app.set("view engine","hbs");
hbs.registerPartials(partialPath);

//app.use(express.json());
app.use(express.urlencoded({extented:false}));
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")))

//routing
app.get('/',(req,res)=>{
		res.render("index");
	})
app.get('/about',(req,res)=>{
		res.render("about");
	})
app.get('/service',(req,res)=>{
		res.render("service");
	})
app.get('/contact',(req,res)=>{
		res.render("contact");
	})
app.post("/contact",async(req,res)=>{
		try{
					const userdata = new User({
							name:req.body.name,
							email:req.body.email,
							message:req.body.message
						})
					await userdata.save();
						//console.log(contacted);
						res.status(201).render("index");		
					//console.log(req.body);	
			}catch(error){
					res.status(500).send(error);
				}
	})
	
app.get('*',(req,res)=>{
		res.status(404).send("page not found")
	})
app.listen(port,()=>{
		console.log('listening at port ',port);
	})
