const dotenv=require('dotenv');
const express= require('express');
//const jsonParser = express.json();
const port=process.env.port||process.env.PORT||3000;
const app=express();




dotenv.config();
//import routes
 const authRoute= require('./routes/auth');
 const poute= require('./routes/bitcoin');



// Middlewares
app.use(express.json());
//route Middlewares
app.use('/api/user',authRoute);
app.use('/api/btCoin',poute);
app.listen(port,()=>console.log('SE school project by Liubomyr Hromadiuk'));
