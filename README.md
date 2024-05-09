# SE-SCHOOL

![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) 
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)


This practical task involved implementing a Web API for a service that will allow users to register, authenticate through the file system, and provide the current bitcoin rate to authenticated users.

For convenience, the task was divided into subtasks:
- [X] ***Registration of new users (via email and password)***
- [X] ***User authentication (using JSON Web Token)***
- [X] ***Checking the fact of authentication and providing information about the bitcoin rate***
  
The task was performed in the programming language **JavaScript**.
  _____
## 1. Registration (*/user/create*)

When registering, the user enters his email and password, after which it is important to check whether this email <ins>already</ins> exists in the “database” (*users_info/users.json* file) and prevent this data from being rewritten to the file.

![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/emailex.png)

Also, let's put a standard restriction on the minimum password length: the password entered by the user must contain at least 6 characters.

![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/password6.png)

If the user's data meets all of the above conditions, their data will be added to the file.

File *before* the new user is registered:
```javascript
[{“email”: “l.hromadiuk@gmail.com”, “password”:“$2a$10$O3Dv7WZ/IOL09o5HHOjQkeOCVrkomMEU8ybQeV3uRmku0QLPN4.Yi”}]
```
Directly the registration itself:
![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/success.png)

The file *after* the registration of a new user:
```javascript.
[{“email”: “l.hromadiuk@gmail.com”, “password”:“$2a$10$O3Dv7WZ/IOL09o5HHOjQkeOCVrkomMEU8ybQeV3uRmku0QLPN4.Yi”},

{“email”: “exampleee@gmail.com”, “password”:“$2a$10$bOtqCNA4LwFVj7QPicHHd.5aPTu8oKY5eAhmLs1QWiEU.j7Ndimd.”}]
```
It's easy to see that passwords are not stored in the file in “plain” form, they are hashed and “salted” (***salted hashing technique*** using *bcrypt*).

```javascript
const salt = await bcrypt.genSalt(10);  
const hashPassword = await bcrypt.hash(req.body.password, salt);
```
____
## 2. Authentication (*/user/login*)
When performing authentication procedures, we need to make sure that the entered email exists in the file (*users_info/users.json*):

![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/error%20email.png)

Provided that the email exists and the entered password matches the one specified during registration, the system will be successfully “logged in” and the authenticated user will be assigned a ***JSON Web Token*** (the .env file is used, which for security reasons was not uploaded to git :wink: )
![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/token.png) 

_______
## 3.Bitcoin rate (*/btcRate*)
The current bitcoin rate can be obtained only by an authenticated user, and this is the purpose of the JWT, which should be located in the *header 'login-token'* and match the token provided in */user/login*.
![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/without%20token.png)

If all the data matches, the user will receive the current bitcoin rate. For this purpose, a third-party [API] is used (https://coinmarketcap.com/api/).
![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/btc.png) 

Translated with DeepL.com (free version)
