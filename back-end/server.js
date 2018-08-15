// bring in express
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const Sequelize = require('sequelize');
const db = require('./db/dbconnection');
const User = require('./db/models/user')(db, Sequelize);

// routes

const routes = require("./routes/routes")

// middleware to parse json objs
server.use(express.json());
server.use(helmet())
server.use(cors());

server.get('/', (req, res) => {
    res.send('Hello World!')
});

routes(server)
// no hard coded ports
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`=== Server listening on ${port}... ===`));
