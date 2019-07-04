const express= require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const knex =require('knex');
const app = express ();
var port =process.env.PORT||3003;
app.use(cors())
const db = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'abuubakry',
    database: 'proiot'
  }
});


app.use(bodyParser.json());

app.post ('/login',  (req, res) =>{
	db.select('*').from('admin')
	.where('email','=',req.body.email)
	.then( data=>{ 
		console.log(data)
  if (
  	req.body.password === data[0].hash)
  	 {
  	 	res.json('success')

  }
  else{
  		res.json('wrong password')
  } }) 
	.catch(err=>res.status(404).json(err))
})
app.put('/api/customer',  (req, res) =>{
 db.select('*').from('customer')
 .then(customer=>{
 res.status(200).json(customer[0])
 })
 .catch(err=>
  res.status(404).json(err))
 //console.log(err)  
 // pg.customer.push({
 	
 // 		email:'ms@gmail.com',
 // 		ussp:'mteja',
 // 		watts: req.body.value,
 // 		time: new Date() 

 // })
 // res("success")
 //console.log(pg.customer[0])
// database.users.length - 1])
})
app.put('/',  (req, res) =>{
console.log(req.body.values)
  db('customer')
  .where('id','=','1')
  .update({
    watts: req.body.values[0],
    bill: req.body.billing[0],
    refrence: new Date()
  }).then(resposense=>
  console.log(resposense))
  .catch(err=>console.log(err))
  // res.body('ON');
})

app.get('/',  (req, res) =>{
  res.json('ON');
//console.log(req)
})
app.listen(port, ()=>{
	console.log('server is running on port 3003')
})

/*
login -->GET success/fail
profile/:userId -->GET=user
data-->POST 
*/