const router = require('express').Router();
const { validated, loginValidated } = require("./validation");
var schema = require("../users_info/user");
const fs = require('fs');
const bcrypt = require('bcryptjs');
const filePath = "./users_info/users.json";
const jwt = require('jsonwebtoken');




let data = fs.readFileSync(filePath, "utf8");
let users = JSON.parse(data);
router.post('/create', async (req, res) => { //checking whether email and password are valid
  const { error } = validated(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = schema;
  user.email = req.body.email;

  if (data.indexOf(user.email) > -1) { return res.status(400).send('This email already exists!') };


  const salt = await bcrypt.genSalt(10);  //hashing
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashPassword;
  users.push(user);
  data = JSON.stringify(users);
  try {
    fs.writeFileSync(filePath, data);
    res.send(user);
  }
  catch (err) {
    res.status(400).send(err);
  }





});

router.post('/login', async (req, res) => {
  const { error } = loginValidated(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }


  let index = -1;
  users.forEach(element => { if (element.email == req.body.email) { index = users.indexOf(element); } });//checking existance of email

  if ((index == -1)) { return res.status(400).send('This email does not exist! Try to sign up at first'); }

  else {
    const correctPassword = await bcrypt.compare(req.body.password, users[index].password)//checking whether the passport for this email is correct 
    if (!correctPassword) return res.status(400).send('Incorrect password');

    ;
  }


  const jsonToken = jwt.sign({ _id: index }, process.env.TOKEN);//jwt token
  res.header('login-token', jsonToken).send(jsonToken);

})
module.exports = router;