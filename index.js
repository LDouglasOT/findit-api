const express = require('express');
const cors = require('cors');
const http = require('http');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'FindIt Backend',
    version: '1.0.0',
    description: 'API documentation for the FindIt API, used for authentication, serving user requests, and maintaining user sessions.',
  },
  servers: [
    {
      url: 'http://localhost:3011', 
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.auth'));

const PORT = process.env.PORT || 3011;

const server = http.createServer(app);
server.listen(PORT, () => console.log(`🚀 Server is running at http://localhost:${PORT}`));
