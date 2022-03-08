# buanastore-server

## Description

buanastore-server is a server side of Buana Store mini-project from Dibimbing course in the form of Back-end API Server Development. This project uses [ExpressJs](https://www.npmjs.com/package/express) framework and MySQL as the database.
This project can be accessed online at [https://buanastore-server.herokuapp.com](https://buanastore-server.herokuapp.com) or you can follow this documentation to use locally on your computer.

## What's in this app?

- REST API
- Database
- JSON Web Token
- Email Service
- Authentication and Authorization
- Data Secure HASH Algorithm (SHA-256)

# Installation

In the root project directory run `npm install` on your terminal.

# Database Configuration

There are two ways how to setup the database configuration. You can choose one of the methods below:

#### 1st method

- The first of all that you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Import **./db/buanastore.sql** file into your MySQL database. It will automatically create new schema named "merchant_service" with its tables and dummy datas.
- Open **./config/dbConnection.js** and you will see the followng code:

```javascript
const mysql = require("mysql");

const db = mysql.createPool({
  host: "YOUR_MYSQL_HOST", // "localhost" by default
  user: "YOUR_MYSQL_USER", // "root" by default
  password: "YOUR_MYSQL_PASSWORD",
  database: "buanastore",
});

module.exports = db;
```

- Change the value of **host**, **user** and **password** to your MySQL configuration. If you use another port for your MySQL you can add new **port** property on it.

#### 2nd method

- The first of all that you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Open **./config/dbConnection.js** and you will see the code like 1st method above.
- Change the value of **host**, **user** and **password** to your MySQL configuration. If you use another port for your MySQL you can add new **port** property on it.
- In the root project directory open your terminal and run `npm run migrate`. It will create the tables that needed.
- After create the tables you can insert data into it by running `npm run seeder`.

# Run The App

- In the root directory you can run `npm start` on your terminal.
- The server uses port: `3001` and it will be running on [http://localhost:3001](http://localhost:3001).

# API Usage

The use of the API in this project is divided into 4 groups namely product, user, wishlist and cart. How to access the API is as follows:

### Product

<details>
<summary><b>Get 10 list of products</b></summary>

<p>

`GET` `/product/{index}`

_Parameters:_ path

- `index` integer \*required (index of array)

_Response:_ JSON

- `status: 200` get products success

```json
[
  {
    "code": "string",
    "product_name": "string",
    "price": "integer",
    "discount_value": "integer"
  }
]
```

</p>
</details>

<details>
<summary><b>Get 10 list of products with category</b></summary>

<p>

`GET` `/product/category/{index}`

_Parameters:_ path, query

- `index` integer \*required (path) (index of array)
- `key` string \*required (query) (see `tag` table on database as reference)
- \* You can add `key` as category parameter more than one. Example: `key1`, `key2`, `key3` and so on.

_Response:_ JSON

- `status: 200` get products success

```json
[
  {
    "code": "string",
    "product_name": "string",
    "price": "integer",
    "discount_value": "integer"
  }
]
```

- `status: 404` product not found

```json
{
  "message": "Product not found."
}
```

</p>
</details>

<details>
<summary><b>Count products</b></summary>

<p>

`GET` `/product/count`

_Parameters:_ none

_Response:_ JSON

- `status: 200` count products success

```json
[
  {
    "total": "integer"
  }
]
```

</p>
</details>

<details>
<summary><b>Count products with category</b></summary>

<p>

`GET` `/product/category/count`

_Parameters:_ query

- `key` string \*required (see `tag` table on database as reference)
- \* You can add `key` as category parameter more than one. Example: `key1`, `key2`, `key3` and so on.

_Response:_ JSON

- `status: 200` count products success

```json
[
  {
    "total": "integer"
  }
]
```

- `status: 404` product not found

```json
{
  "message": "Product not found."
}
```

</p>
</details>

<details>
<summary><b>Get product detail</b></summary>

<p>

`GET` `/product/detail`

_Parameters:_ query

- `code` string \*required

_Response:_ JSON

- `status: 200` get product detail success

```json
[
  {
    "code": "string",
    "product_name": "string",
    "price": "integer",
    "discount_value": "integer",
    "description": "string"
  }
]
```

- `status: 404` product not found

```json
{
  "message": "Product with code '(string)' not found."
}
```

</p>
</details>

### User

<details>
<summary><b>Login</b></summary>

<p>

`POST` `/signin`

_Parameters:_ body

- `email` string, valid email format \*required
- `password` string, min:8 \*required

_Response:_ JSON

- `status: 200` login success

```json
{
  "message": "Sign in success!",
  "data": {
    "token": "token"
  }
}
```

- `status: 400` unverified account

```json
{
  "message": "Please verify your account."
}
```

- `status: 403` wrong email or password

```json
{
  "message": "Wrong email or password."
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

</p>
</details>

<details>
<summary><b>Register</b></summary>

<p>

`POST` `/signup`

_Parameters:_ body

- `first_name` string \*required
- `last_name` string \*required
- `email` string, valid email format \*required
- `password` string, min:8 \*required
- `password_confirmation` string, min:8 \*required

_Response:_ JSON

- `status: 200` registration success

```json
{
  "message": "Registration success! Please check your email and verify your account."
}
```

- `status: 500` email service error

```json
{
  "message": "Oops, there is a little technical problem. Please try again later."
}
```

- `status: 400` user already exist

```json
{
  "message": "User already exist! Use another email."
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

</p>
</details>

<details>
<summary><b>Verify account</b></summary>

<p>

`GET` `/account/verify`

_Parameters:_ query

- `token` token \*required

_Response:_ JSON

- `status: 200` verification success

```json
{
  "message": "Account verification success."
}
```

- `status: 400` already verified

```json
{
  "message": "Account is already verified."
}
```

- `status: 401` invalid token

```json
{
  "message": "Invalid Token."
}
```

</p>
</details>

### Wishlist

<details>
<summary><b>Get wishlist</b></summary>

<p>

`GET` `/wishlist`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ none

_Response:_ JSON

- `status: 200` get wishlist success

```json
[
  {
    "user_id": "integer",
    "product_code": "string",
    "product_name": "string"
  }
]
```

- `status: 404` wishlist doesn't exist

```json
{
  "message": "You dont have wishlist yet."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Add wishlist</b></summary>

<p>

`POST` `/wishlist`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `product_code` string \*required

_Response:_ JSON

- `status: 200` add wishlist success

```json
{
  "message": "Successfully added to wishlist."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Soft delete wishlist</b></summary>

<p>

`PUT` `/wishlist/softDelete`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `product_code` string \*required

_Response:_ JSON

- `status: 200` soft delete wishlist success

```json
{
  "message": "Successfully soft deleted."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Count selected wishlist</b></summary>

<p>

`GET` `/wishlist/checkSelected`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ query

- `product_code` string \*required

_Response:_ JSON

- `status: 200` count selected wishlist success

```json
[
  {
    "count": "integer"
  }
]
```

- `status: 404` selected wishlist doesn't exist

```json
{
  "message": "Selected item not found."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

### Cart

<details>
<summary><b>Get cart</b></summary>

<p>

`GET` `/cart`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ none

_Response:_ JSON

- `status: 200` get cart success

```json
[
  {
    "user_id": "integer",
    "product_code": "string",
    "product_name": "string"
  }
]
```

- `status: 404` cart doesn't exist

```json
{
  "message": "No item found in your cart."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Add cart</b></summary>

<p>

`POST` `/cart`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `product_code` string \*required

_Response:_ JSON

- `status: 200` add cart success

```json
{
  "message": "Successfully added to cart."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Soft delete cart</b></summary>

<p>

`PUT` `/cart/softDelete`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `product_code` string \*required

_Response:_ JSON

- `status: 200` soft delete cart success

```json
{
  "message": "Successfully soft deleted."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Get selected cart</b></summary>

<p>

`GET` `/cart/checkSelected`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ query

- `product_code` string \*required

_Response:_ JSON

- `status: 200` get selected cart success

```json
[
  {
    "count": "integer"
  }
]
```

- `status: 404` selected cart doesn't exist

```json
{
  "message": "Selected item not found."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

To see the response you can do API testing using an application like [Postman](https://www.postman.com/).
You can also import this project's postman_collection at **./postman_collection/buanastore-server.postman_collection.json** to your [Postman](https://www.postman.com/).

I hope you guys like this project and ENJOY!!! :grin:
