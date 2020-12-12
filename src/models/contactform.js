const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema({
		name:{
				type:String,
				required:true
			},
		email:{
				type:String,
				required:true
			},
		message:{
				type:String,
				required:true
			},
	})

const User=new mongoose.model("User",contactSchema);

module.exports=User; 
