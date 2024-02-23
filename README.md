# SIMPLE INVENTORY MANAGER
This document outlines the design of a simple inventory manager application, its database structure, and the technologies involved.

## Functionality
- Add, edit, and delete products.
- Track product quantity, price, and description.
- Generate reports on inventory levels and value.
- Simple user interface for easy management.

## Technologies
<img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" height="18">
<img src="https://miro.medium.com/v2/resize:fit:1400/1*i2fRBk3GsYLeUk_Rh7AzHw.png" height="24"> 
<img src="https://upload.wikimedia.org/wikipedia/labs/8/8e/Mysql_logo.png" height="36"> 
<img src="https://www.svgrepo.com/show/373574/ejs.svg" height="30"> 
<img src="https://static-00.iconduck.com/assets.00/node-js-icon-1901x2048-mk1e13df.png" height="30"> 

### Front-End
- HTML5
- CSS3
- JS
- TAILWIND CSS

### Back-End
- NODE JS: a lightweight and efficient server-side environment.
- Express: for building the web application framework
- MySQL: for relational database storage.
- MySQL2: database driver.

## Database Design
Tables:
- products
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NULLABLE
);
```

## Installation and Setup
### Environment Variable
| KEY         | REQUIRED | DESCRIPTION             |
|:------------|:--------:|:------------------------|
| DB_HOST     |   true   | Host name               |
| DB_PORT     |   true   | Port of the database    |
| DB_USERNAME |   true   | Username of database    |
| DB_PASSWORD |   true   | Password of database    |
| DB_NAME     |   true   | Database name           | 
| NODE_ENV    |   true   | Environment information |

To run the application, use following commands:
```
npm install 
npm run prod
```
For production, use `NODE_ENV=production`