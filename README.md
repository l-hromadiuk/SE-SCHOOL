# SE-SCHOOL
## Практичне завдання

![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) 
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)


Виконання цього практичного завдання передбачало реалізацію Web API для сервісу,який уможливить реєстрацію,автентифікацію користувачів через файлову систему, а також надання поточного курсу біткоіну автентифікованим користувачам.

Для зручності поставлене завдання було розбите на підзадачі:
- [X] ***Реєстрація нових користувачів (via email and password)***
- [X] ***Автентифікація користувачів (за допомогою JSON Web Token)***
- [X] ***Перевірка факту аутентифікації та надання відомостей про курс біткоіну***
  
Завдання виконувалося мовою програмування **JavaScript**
  _____
## 1. Реєстрація (*/user/create*)

Під час реєстрації користувач вводить свій email та пароль,після чого важливо перевірити,чи існує цей email  <ins>вже</ins> в"базі"(файл *users_info/users.json*) та не допустити повторного запису цих даних до файлу.

![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/emailex.png)

Також покладемо стандартне обмеження на мінімальну довжину пароля: уведений користувачем пароль має містити не менше ніж 6 символів.

![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/password6.png)

Якщо дані користувача відповідають усім вищезазначеним умовам, його дані будуть додані до файлу.

Файл *до* реєстрації нового користувача:
```javascript
[{"email":"l.hromadiuk@gmail.com","password":"$2a$10$O3Dv7WZ/IOL09o5HHOjQkeOCVrkomMEU8ybQeV3uRmku0QLPN4.Yi"}]
```
Безпосередньо сама реєстрація:
![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/success.png)

Файл *після* реєстрації нового користувача:
```javascript
[{"email":"l.hromadiuk@gmail.com","password":"$2a$10$O3Dv7WZ/IOL09o5HHOjQkeOCVrkomMEU8ybQeV3uRmku0QLPN4.Yi"},

{"email":"exampleee@gmail.com","password":"$2a$10$bOtqCNA4LwFVj7QPicHHd.5aPTu8oKY5eAhmLs1QWiEU.j7Ndimd."}]
```
Легко помітити,що паролі не зберігаються у файлі у "звичайному" вигляді, вони хешуються та "підсолюються" (***salted hashing technique*** за допомогою *bcrypt*).

```javascript
const salt = await bcrypt.genSalt(10);  
const hashPassword = await bcrypt.hash(req.body.password, salt);
```
____
## 2. Автентифікація (*/user/login*)
Виуонуючи процедури автентифікації, ми маємо ппересвідчитися в тому,що введений email існує у файлі (*users_info/users.json*):

![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/error%20email.png)

За умови,що email існує, а введений пароль збігається з указаним при реєстрації,відбудеться успішний "вхід" в систему,а автентифікованому корисстувачу буде присвоєний ***JSON Web Token***(використовується файл .env,який з міркувань безпеки не був підвантажений на git :wink: )
![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/token.png) 

_______
## 3.Курс біткоіну (*/btcRate*)
Поточний курс біткоіну може отримати лише автентифікований користувач,саме для цієї перевірки і використовується JWT,який має бути розташований у *header 'login-token'* та збігатися з токеном,наданим при */user/login*.
![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/without%20token.png)

Якщо усі дані збігаються,то користувач отримає поточний курс біткоіну. Для цього використовується сторонній [API](https://coinmarketcap.com/api/).
![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/btc.png) 
____________
## ***Резюме*** 
У висновку слід зазначити,що,незважаючи на невеликий досвід роботи з JS,було реалізовано усі складники поставленої задачі :heavy_check_mark: ,розширено кругозір та отримано задоволення від розв'язання поставленої проблеми. 