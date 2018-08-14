// bring in express
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const Sequelize = require('sequelize');
const db = require('./db/dbconnection');
const User = require('./db/models/user')(db, Sequelize);

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

// just test code, will delete later 
const dbTest = async () => {
  await User.create({
    first_name: 'pic',
    last_name: 'me',
    nick_names: '',
    email: 'pic@me.com',
    password: 'you wish',
    credits: 10
  })

  await User.create({
    first_name: 'bob',
    last_name: 'smith',
    nick_names: '',
    email: 'bob@me.com',
    password: "i don't think so",
    credits: 15
  })

  users = await User.findAll();

  users.forEach(user => console.log(`User # ${user.id} is ${user.first_name} ${user.last_name}`));
}

dbTest();
