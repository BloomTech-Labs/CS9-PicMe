// bring in express
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

// routes

// middleware to parse json objs
server.use(express.json());
server.use(helmet())
server.use(cors());

server.get('/', (req, res) => {
    res.send('Hello World!')
});

// no hard coded ports
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`=== Server listening on ${port}... ===`));