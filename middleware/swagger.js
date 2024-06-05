const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
openapi: "3.0.0",
info: {
title: "FindIt Backend",
version: "1.0.0",
description: "This is an api documentation for the findit api meant to authenticate, serve user request, and maintain user sessions",
},
};
    
const options = {
swaggerDefinition,
servers:[{
    url: "http://localhost:3011/",
}],
apis:["../routes/api.auth.js"]

};
    
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;