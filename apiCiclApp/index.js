const express =require('express');
const mysql=require('mysql');
const cors = require('cors')



//const bodyParser= require('body-parser');
//const { restart } = require('nodemon');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'ciclapp_db',
   port:'3306'

});
connection.connect(error=>{
   if(error) throw error;
   console.log('Database server running')
});
 app.get('/', (req,res)=>{
    // res.status();
    console.log(res);
   res.json({ message: "Welcome to bezkoder application." });
 })

 app.listen(port, ()=> {
     console.log(`Server running on PORT ${port}`)
    });

 app.get('/users', (req,res)=>{
   const sql ='SELECT * FROM `users`';
   connection.query(sql, (error,results)=>{
     if (error) throw error;
     if(results.length>0){
       res.json(results);
     }
     else{
       res.send('Not result');
     }
   })
})
 app.post('/registration', (req,res)=>{
     let nombres_apellidos= req.body.nombres_apellidos;
     let contraseña= req.body ['contraseña'];
     let correo= req.body ['correo'];
     let fecha_nacimiento= req.body.fecha_nacimiento;
     let id= req.body.id;
    console.log("holsa", req.body, );
    const sql ='INSERT INTO `users` VALUES ('  + ' " ' + `${nombres_apellidos}` +'"' + ',' +'"' +`${contraseña}`+ '"' + ',' + '"' +` ${correo}`+ '"'+ ',' + '"'+ `${fecha_nacimiento}` + '"'+ ','+ `${id}` + ')';
    connection.query(sql, (error,results)=>{
      if (error) throw error;
      if(results.length>0){
        res.json({"mensaje":"ok"});
      }
      else{
        res.json({"mensaje":"ok"});
      }
    })
 })

 app.get('/login', (req,res)=>{
    
    let contraseña= req.body ['contraseña'];
    let correo= req.body.correo;
    
   console.log("holsa", req.body, );
   const sql ='SELECT id FROM `users` WHERE correo=' + '"'+`${correo}`+ '"' +'  AND contraseña='+ '"'+`${contraseña}`+ '"'+ ';'
   console.log(sql);
   connection.query(sql, (error,results)=>{
     if (error) throw error;
      if(results.length>0){
         
          res.json({"mensaje": 1, "id": results[0].id});
       //res.sendStatus(200);
     }
     else{
        res.json(results);
       res.json({"mensaje":0})
        //res.sendStatus(404);
     } 
   })
})

 app.get('/novedades',(req,res)=>{
    const sql ='SELECT * FROM `news`';
    connection.query(sql, (error,results)=>{
      if (error) throw error;
      if(results.length>0){
        res.json(results);
      }
      else{
        res.send('Not result');
      }
    })
 } )