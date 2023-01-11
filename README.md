# Image Server
This node application allows users to signup and login in order to upload images and get those images from the server when required.

## Features
- Secure Authentication and Authorization to **GET /image/:id** and **POST /image/upload** routes
- Image uploaded should not be more than 1mb
- Can get image uploaded by sending a request with image ID

## Routes
```
## /signup POST
{
    "email": "xyz@gmail.com",
    "password": "test1234"
}

## /login POST
{
    "email": "xyz@gmail.com",
    "password": "test1234"
}

## /image/:id GET

## /image/upload POST
Add image as file with name field: "image"

## /logout GET
```

## How to use:
1. Clone, Fork or Download Repo
2. Add a **.env** file to the root directory of the root project.
   Include the following environment variables:
   ```
    MONGO_URI=xxxxx
    PORT=3080 // or any other port of choice
    AUTH_TOKEN=yyyyyy
   ```
   - A mongodb instance link. You can use a local instance if you have MongoDB installed on your local machine, or a remote instance by quickly creating an account and a free cluster on (Atlas)[https://www.mongodb.com/cloud/atlas/register]. Use the variable name exactly as used above.
   - You can generate an AUTH_TOKEN by running the following command in a Node REPL and copy the output:
        ```
        require('crypto').randomBytes(64).toString('hex');
        ```
3. Install all dependencies for the project by runnin the following command in the terminal inside the project root directory:
   ```
   npm install
   ```
4. Use Postman(/Thunder Client, or any other API Testing client) to send commands as described in the routes section above.


## Tech Used
1. NodeJS and NPM
2. ExpressJS
3. MongoDB and Mongoose
4. Validator
5. Multer
6. Bcrypt
7. Cookie-Parser
8. JWt
9. Short-uuid
   