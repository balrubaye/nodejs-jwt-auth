# nodejs-jwt-auth

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)


## About <a name = "about"></a>

Simple APIs for user authentication using JWT where you can send web requests to register, login or checkToken. Here I am using DI pattern to wire between different modules.  

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Node.js and npm.

```
node -v
```

### Installing

Install all the modules then run the server in either dev or prod mode

```
npm install
```

And 

```
npm run start
```


## Usage <a name = "usage"></a>

To register a new user you can issue a POST request:

```
curl -X POST -d '{"username": "joe", "password":"1234"}' http://localhost:3000/auth/register -H "Content-Type: application/json"
```

To login issue a POST request you should receive a token back if successful like

```
curl -X POST -d '{"username": "joe", "password":"1234"}' http://localhost:3000/auth/login -H "Content-Type: application/json"
```

Check if token is valid

```
curl -X GET -H "Accept: application/json" http://localhost:3000/auth/checkToken\?token\=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJzYnMiLCJleHAiOjE1OTI1NTA1NDQsImlhdCI6MTU5MjU0Njk0NH0.RTFWeuNJw6loxQUUio5KhC7u1ufyfkudbkg21eSUxsg
```
