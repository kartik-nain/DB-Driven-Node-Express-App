# Sales Management Web Application
This project is a web application that provides a Web API for managing sales data. It is built using Node.js, Express, and Mongoose to interact with MongoDB Atlas.

## Installation
* Clone the repository from GitHub.
* Install the necessary packages by running npm install.
* Create a .env file at the root of the project and add your MongoDB Atlas connection string in the following format: MONGODB_URI=<your-connection-string>
* Start the application by running npm start.

## Routes
The following routes are available:
  
### User Authentication API
* POST /api/auth/register: Registers a new user by creating a new person document in the collection. Requires name, username, and password in the request body.
* POST /api/auth/login: Authenticates a user by checking the provided username and password against the stored data. Returns a JWT token upon successful login. This JWT token is needed to access the Sales Data API.

### Sales Data API
* POST /api/sales: This route adds a new "sales" document to the collection using the body of the request and returns the created object/fail message to the client.
* GET /api/sales: This route accepts the numeric query parameters "page" and "perPage" as well as the string parameter "storeLocation". It returns all "sales" objects for a specific "page" to the client as well as optionally filtering by "storeLocation", if provided.
* GET /api/sales/:id: This route accepts a route parameter that represents the _id of the desired sales object. It returns a specific "sales" object to the client.
* PUT /api/sales/:id: This route accepts a route parameter that represents the _id of the desired sales object as well as the contents of the request body. It updates a specific "sales" document in the collection and returns a success/fail message to the client.
* DELETE /api/sales/:id: This route accepts a route parameter that represents the _id of the desired sales object. It deletes a specific "sales" document from the collection and returns a success/fail message to the client.
* UI/Form: A new route has been added that works similar to /api/sales?page=1&perPage=5&storeLocation=Seattle. It takes the page, perPage, and storeLocation values through a form and displays the output using a template engine. The layout has been designed and proper CSS style/format has been applied.

## Security
To limit user access to the app and certain routes, security features such as password encryption, JWT, session, and cookies have been implemented. Only authorized users are able to use the special routes.

## Deployment
The application has been deployed to Cyclic and can be accessed at https://tiny-gray-bream-vest.cyclic.app/
