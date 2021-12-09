# Authentication Server

## Install

Install locally with npm:

`npm install`

## Test

Run local tests using npm:

`npm test`

## Features

### As a User, I can register a User account, so that I can save my data

Clients can create a User by sending an HTTP `POST` request:

* Route: /signup
* Headers: none
* Body:
  * Required
  * Content-Type: JSON
  * {
    "username": STRING,
    "password": STRING
  }
* Response:
  * Status: 201
  * Content-Type: JSON
  * {
    "username": STRING,
    "id" STRING,
    "token": STRING
  }

### As a User, I can sign in to an existing User account, so that I can retrieve my data

Clients can fetch a User by sending an HTTP `POST` request:

* Route: /signin
* Headers:
  * required:
    * "Authorization" : `Basic BASE64-ENCODED-STRING`
* Body: none
* Response:
  * Status: 200
  * Content-Type - JSON
  * {
    "username": STRING,
    "id" STRING,
    "token": STRING,
  }

### As a User, I can authenticate with a Username and password, so that I can perform operations on my data

Clients can authenticate API requests using an authentication header:

* Route: `api/*`
* Headers:
  * Required
  * "Authorization": `Basic BASE64-ENCODED-STRING`

Any request to the API with the above header should be authenticated by middleware.

### As a User, I can authenticate with a Token, so that I can perform operations on my data

Clients can authenticate API requests using a JSON web token:

* Route: `api/*`
* Headers:
  * Required
  * "Authorization": `Bearer JSON-WEB-TOKEN`

Any request to the API with the above header should be authenticated by middleware.

### As a User, I can authorize with a Role, so that I can can protect my data

Clients with the following authorized roles can perform specific request types:

* `User` Role:
  * Route:
    * GET `api/*`
    * POST `api/*
  * Headers:
    * Required
      * "Authorization": `Bearer JSON-WEB-TOKEN`
    * Optional
      * "Authorization": `Basic BASE64-ENCODED-STRING`
  * Response:
    * 200 - authorized
    * 401 - unauthorized

* `Admin` Role:
  * Route:
    * GET `api/*`
    * POST `api/*`
    * PUT `api/*`
    * DELETE `api/*`
  * Headers:
    * Required
      * "Authorization": `Bearer JSON-WEB-TOKEN`
    * Optional
      * "Authorization": `Basic BASE64-ENCODED-STRING`
  * Response:
    * 200 - authorized
    * 401 - unauthorized

### As a User, I can create and fetch Products, so I can manage a store front of products

Clients are able to Create and Read `Producst` from a producst model using the following request:


* Route: GET `/products`
  * Body: none
  * Headers: none
  * Response:
    * Status: 200
    * Body: Content-Type: JSON
      * Count: Number of total products
      * Results: `[ Products ]`
* Route: POST `/products`
  * Body: { name: STRING, categoryId: UUID }
  * Headers: none
  * Response
    * Status: 201
    * Body: Content-Type: JSON
      * `{ Product }`

### As a User, I can create and fetch Categories, So I can manage store front products by category

Client are able to Create and Read `Categories` from a categories model using the following request:

* Route: GET `/categories`
  * Body: none
  * Headers: none
  * Response:
    * Status: 200
    * Body: Content-Type: JSON
      * Count: Number of total categories
      * Results: `[ Categories ]`
* Route: POST `/categories`
  * Body: { name: STRING }
  * Headers: none
  * Response
    * Status: 201
    * Body: Content-Type: JSON
      * `{` Category }`
