# Problem 5: A Crude Server

For this challenge, I create a simple inventory server app.

## Table of contents

* [Features](#feature)
* [Installation](#installation)
* [API Testing](#api-testing-examples)

## Feature

- Add, update, delete, and view inventory items
- Simple RESTful API endpoints
- Pagination support for large inventories
- Filter items by category

## Installation

1. Clone the repository:
```
$ git clone https://github.com/andrewmoquia/simple-inventory-server.git
```
2. Install dependencies:
```
$ npm i
```
3. Set up environment variables:

- For convenience, a .env file is included in this repository.
- Important: In production, .env files should never be committed to version control.

4. Start the server:
```
$ npm run dev
```


## API Testing Examples
- Set this up in Postman or your preferred API testing tool.

#### POST Create Item
```
curl --location 'http://localhost:8080/item' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Nonstick Wok",
    "quantity": 14,
    "category": "Kitchenware"
}'
```

#### GET All Item
```
curl --location 'http://localhost:8080/item?page=1&limit=5&category=Kitchenware'
```

#### Get One Item
- Note: You must have the ID of an item to retrieve it. You can find the ID by using the "Get All Items" endpoint after creating an item.
```
curl --location 'http://localhost:8080/item/691c7b64e93c53704850eb3e'
```

#### Update One Item
- Note: You must have the ID of an item to retrieve it. You can find the ID by using the "Get All Items" endpoint after creating an item.
```
curl --location --request PUT 'http://localhost:8080/item/691c7b64e93c53704850eb3e' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Stainless Pan",
    "quantity": 1,
    "category": "Kitchenware"
}'
```

#### Delete One Item
- Note: You must have the ID of an item to retrieve it. You can find the ID by using the "Get All Items" endpoint after creating an item.
```
curl --location --request DELETE 'http://localhost:8080/item/691c7b64e93c53704850eb3e'
```

