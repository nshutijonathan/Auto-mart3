
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3230ae8f8d7c479aae949c7e0291de83)](https://app.codacy.com/app/nshutijonathan/Auto-mart3?utm_source=github.com&utm_medium=referral&utm_content=nshutijonathan/Auto-mart3&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.org/nshutijonathan/Auto-mart3.svg?branch=develop)](https://travis-ci.org/nshutijonathan/Auto-mart3)
[![Coverage Status](https://coveralls.io/repos/github/nshutijonathan/Auto-mart3/badge.svg?branch=develop)](https://coveralls.io/github/nshutijonathan/Auto-mart3?branch=develop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c0a7d7c8f5a64b5b8fb703580fb1f9fc)](https://www.codacy.com/app/nshutijonathan/Auto-mart3?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nshutijonathan/Auto-mart3&amp;utm_campaign=Badge_Grade)

# Auto-mart
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.


# User Interface

![AUTO-MART](images/ui.PNG "auto-mart")

## UI Technologies
* HTML.
* CSS.
* JS


### UI link
[Auto-Mart](https://nshutijonathan.github.io/Auto-Mart/UI/html/)

### Heroku link Example

[Auto-mart](https://auto-mart-challenge3.herokuapp.com/)

### Swagger link Example
[Auto-mart-swagger](https://auto-mart-challenge3.herokuapp.com/apis-docs/)

### MY swagger  link reference
[Placide-Irandora](https://github.com/placideirandora/epic-mail/blob/develop/swagger.json)

## API ENDPOINTS
| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index page |
| /api/v2/auth/signup| POST | Sign up |
| /api/v2/auth/signin| POST | Sign in |
| /api/v2/users| GET | Get all users |
| /api/v2/users/:id| GET | Get specific user |
| /api/v2/users/:id| DELETE| Delete specific user |
| /api/v2/cars| GET | Get all cars advers |
| /api/v2/car| POST | Create a car advert |
| /api/v2/orders| GET | Get all  purchasing order |
| /api/v2/order| POST| Create purchasing order  |
| /api/v2/order/:order Id | PUT| Update price of purchasing order |
| /api/v2/car/:car Id/status | PUT| Update car status |
| /api/v2/car/:car Id/price | PUT| Seller Update car price |
| /api/v2/cars/available | GET| Get all available cars |
| /api/v2/cars/:advert id | DELETE | Delete a car advert |
| /api/v2/cars/available&new | GET | Get all available and new cars |
| /api/v2/cars/available&used | GET | Get all available and used cars  |


### POST api/v2/auth/signup
```
{
    "status": 201,
    "message": "user is successfully registered",
    "data": [
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zZSI6eyJpZCI6NDI1LCJmaXJzdG5hbWUiOiJzb21lb25lIiwibGFzdG5hbWUiOiJzb21lb25lIiwidXNlcm5hbWUiOiJzb21lb25lIiwiZW1haWwiOiJzb21lb25lQGVwaWNtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDNleFVENUtnUDJza3J0MzloYTdPQS5CdVZVa1E1alQvbk9na1hjeE4uNk04MFB6cXBSVUFlIiwiaXNhZG1pbiI6ZmFsc2UsInJlZ2lzdGVyZWQiOiIyMDE5LTA0LTAxVDIyOjAwOjAwLjAwMFoifSwiaWF0IjoxNTU0MjM1NjczfQ.VHgTeFNx4FRbNPENp0JY2Q6lK5cT5QaBZ-RMIH6kIag",
            "user": {
                "id": 425,
                "firstname": "someone",
                "lastname": "someone",
                "username": "someone",
                "email": "someone@epicmail.com",
                "isadmin": 'false'
            }
        }
    ]
}
```
### POST api/v2/auth/signin

```
{
    "status": 200,
    "success": "successfully logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNwb25zZSI6eyJpZCI6NDI1LCJmaXJzdG5hbWUiOiJzb21lb25lIiwibGFzdG5hbWUiOiJzb21lb25lIiwidXNlcm5hbWUiOiJzb21lb25lIiwiZW1haWwiOiJzb21lb25lQGVwaWNtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDNleFVENUtnUDJza3J0MzloYTdPQS5CdVZVa1E1alQvbk9na1hjeE4uNk04MFB6cXBSVUFlIiwiaXNhZG1pbiI6ZmFsc2UsInJlZ2lzdGVyZWQiOiIyMDE5LTA0LTAxVDIyOjAwOjAwLjAwMFoifSwiaWF0IjoxNTU0MjM1NzI5LCJleHAiOjE1NTQyNDY1Mjl9.tE3In1DmIvG8V4x7qePcSEAlKLCUIdlCaqKCzI5XaoY",
    "data": [
        {
            "id": 425,
            "firstname": "someone",
            "lastname": "someone",
            "email": "someone@epicmail.com",

        }
    ]
}
```
### clone the Application

[Github](https://github.com/nshutijonathan/Auto-mart3)

## Tools Used

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* 
 ```
### Framework
```
 *Express* 
 ```
### Testing Framework
```
 *Mocha* and *Chai*
 ```
### Style Guide
```
*Airbnb*
```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository or download the zip file and once this is set up you are going to need this packages.

```
 [Node Package Installer - NPM] this usually comes with Node.
```
## SET NODE
TO setup the project on your local machine do the following
Install Node
```
npm install node
```
## Install Postgres
```
[Postgres](http://www.postgresqltutorial.com/install-postgresql/)
## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```

> npm install
```
## Database
Creata a .env file

Copy and Paste the DATABASE_URL

DATABASE_URL=postgres://[USERNAME]:[PASSWORD]@localhost/[DATABASE_NAME]



It will install the node_modules which will help you run the project on your local machine.
```

## Run the server
```
> npm run start
```
## Run the test
```
> npm run test
```

## Contributor
Jonathan Nshuti <nshutijonathan130@gmail.com>

---

## License & copyright
jonathan NSHUTI
 



