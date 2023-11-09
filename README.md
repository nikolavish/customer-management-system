# API Documentation

This document provides an overview of the endpoints and functionalities of the API.

## Base URL

All endpoints are relative to the base URL: `http://localhost:3001`

## Authentication

- The API uses JWT (JSON Web Tokens) for authentication.
- To access protected routes, include the JWT token in the `Authorization` header.

## Endpoints

### POST /signin

Retreive authorization token (JSON Web Token).

#### Parameters

- `email` (required) - An E-mail address associated with the customer's document
- `password` (required) - A password associated with the customer's document

#### Response

- `200 OK` - Successful response
- `400 Bad Request` - Invalid request

Example Request:

```
POST /signin
```
Example Response:
```json
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkNTdkNmQ4ZmY0OWVlYjNkMDhhY2EiLCJpYXQiOjE2OTk1NzEwODF9.OGE57us85zS74ALWI0yc7qZ9EJgwV4HOEDygAEKOg98"
    }
}
```
---
### POST /signup

Register as new customer.

#### Parameters

- `name` (required) - Customer's name
- `email` (required) - Valid customer's E-mail
- `password` (required) - A strong password (must contain atleast 8 characters, 1 symbol and an uppercase letter)

#### Response

- `200 OK` - Successful response
- `400 Bad Request` - Invalid request

Example Request:

```
POST /signup
```
Example Response:
```json
{
    "success": true
}
```
---
### GET /customers

Retrieve a paginated list of customers.

#### Parameters

- `page` (optional, default: 1) - Page number for pagination
- `perPage` (optional, default: 10) - Rows per page for pagination

#### Response

- `200 OK` - Successful response
- `400 Bad Request` - Invalid request

Example Request:

```
GET /customers?page=1&perPage=10
```
Example Response:
```json
{
    "success": true,
    "data": {
        "customers": [
            {
                "_id": "654d57d6d8ff49eeb3d08aca",
                "name": "Nikola",
                "email": "nikola@vish.mk"
            }
        ],
        "pagination": {
            "currentPage": 1,
            "totalCustomers": 1,
            "totalPages": 1
        }
    }
}
```
---
### GET /users

Retrieve a paginated list of users.

#### Response

- `200 OK` - Successful response
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Unauthorized

Example Request:

```
GET /users
```
Example Response:
```json
{
    "success": true,
    "data": {
        "_id": "654d57d6d8ff49eeb3d08aca",
        "name": "Nikola",
        "email": "nikola@vish.mk"
    }
}
```