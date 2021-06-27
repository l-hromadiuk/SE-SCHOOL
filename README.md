# SE-SCHOOL
## Практичне завдання

![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) 
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)


Виконання цього практичного завдання передбачало реалізацію Web API для сервісу,який уможливить реєстрацію,аутентифікацію користувачів через файлову систему, а також надати поточний курс біткоіну аутентифікованим коистувачам.

Для зручності поставлене завдання було розбите на підзадачі:
- [X] ***Реєстрація нових користувачів (via email and password)***
- [X] ***Аутентифікація користувачів (за допомогою JSON Web Token)***
- [X] ***Перевірка факту аутентифікації та надання відомостей про курс біткоіну***
  
Завдання виконувалося мовою програмування **JavaScript**
  _____
## 1. Реєстрація (*/user/create*)

Під час реєстрації користувач вводить свій email та пароль,після чого важливо перевірити,чи існує цей email  <ins>вже</ins> в"базі"(файл *users.json*) та не допустити повторного запису цих даних до файлу.

![](https://github.com/l-hromadiuk/SE-SCHOOL/blob/main/screenshots%20for%20readme/emailex.png)




![]()













```javascript
[{"email":"l.hromadiuk@gmail.com","password":"$2a$10$O3Dv7WZ/IOL09o5HHOjQkeOCVrkomMEU8ybQeV3uRmku0QLPN4.Yi"}]
```








```javascript
[{"email":"l.hromadiuk@gmail.com","password":"$2a$10$O3Dv7WZ/IOL09o5HHOjQkeOCVrkomMEU8ybQeV3uRmku0QLPN4.Yi"},

{"email":"exampleee@gmail.com","password":"$2a$10$bOtqCNA4LwFVj7QPicHHd.5aPTu8oKY5eAhmLs1QWiEU.j7Ndimd."}]
```