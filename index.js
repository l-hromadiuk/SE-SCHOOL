const dotenv=require('dotenv');
const express= require('express');
const port=process.env.port||process.env.PORT||3000;
const app=express();

dotenv.config();
 const authRoute= require('./routes/auth');
 const poute= require('./routes/bitcoin');

app.use(express.json());
app.use('/api/user',authRoute);
app.use('/api/btcRate',poute);
app.listen(port,()=>console.log('SE school project by Liubomyr Hromadiuk'));
