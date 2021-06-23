const router = require('express').Router();
const { validated, loginValidated } = require("./validation");
var schema = require("../users_info/user");
const fs = require('fs');
const bcrypt = require('bcryptjs');
const filePath = "./users_info/users.json";
const jwt=require('jsonwebtoken');



//trying to validete
let data = fs.readFileSync(filePath, "utf8");
let users = JSON.parse(data);
router.post('/create', async (req, res) => {
  const { error } = validated(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = schema;
  user.email = req.body.email;


  if (data.indexOf(user.email) > -1) { return res.status(400).send('This email already exists!') };

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashPassword;
  users.push(user);
  data = JSON.stringify(users);
  try {
    fs.writeFileSync(filePath, data);
    res.send(user)
  }
  catch (err) {
    res.status(400).send(err);
  }





});
//logins.push
router.post('/login', async (req, res) => {
  const { error } = loginValidated(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //checking existance of email

  let index = -1;
  users.forEach(element => { if (element.email == req.body.email) { index = users.indexOf(element); } });

  if ((index == -1)) { return res.status(400).send('This email does not exist! Try to sign up at first'); }

  else {
    const correctPassword = await bcrypt.compare(req.body.password, users[index].password)
    if (!correctPassword) return res.status(400).send('Incorrect password');

    ;
  }

  //password is correct

  //res.send('Log in succeed');
//jsw token

const jsonToken=jwt.sign({_id: index},process.env.TOKEN);

res.header('login-token',jsonToken).send(jsonToken);



})
module.exports = router;