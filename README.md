# buanastore-server
buanastore-server is a server side of Buana Store mini-project from Dibimbing course. This project is built with [ExpressJs](https://www.npmjs.com/package/express) framework and uses MySQL as the database.

## Installation
In the root directory run `npm install` on your terminal.

###### Database configuration
- Import **./dbBackup/buanastore.sql** file into your MySQL Database.
- Open **dbConnection.js** in the **./src/services/** directory and you will see the following code:
```javascript
const mysql = require("mysql");

const db = mysql.createPool({
  host: "YOUR_MYSQL_HOST", // "localhost" by default
  user: "YOUR_MYSQL_USER", // "root" by default
  password: "YOUR_MYSQL_PASSWORD",
  database: "buana_store_db",
});

exports.db = db;
```
Change value of **host**, **user** and **password** to your MySQL configuration.

## Run the server
- In the root directory you can run `npm start` on your terminal.
- The server will be running on [http://localhost:3001](http://localhost:3001). Enjoy!

I hope you guys like this project :grin: