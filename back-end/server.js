const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const bodyparser = require("body-parser");
const busyBoy = require("connect-busboy"); //Needed to parse image
require('dotenv').config()

const Sequelize = require('sequelize');
const db = require('./db/dbconnection');
const User = require('./db/models/user')(db, Sequelize);
const Image = require('./db/models/image')(db, Sequelize);
const Relationship = require('./db/models/relationship')(db, Sequelize);
require('./db/models/user_collection_image')(db, Sequelize);

User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'});

User.hasMany(Image, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImages'});
Image.belongsTo(User, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImageUser'});

// routes

const routes = require("./routes/routes")

// middleware to parse json objs
server.use(express.json());
server.use(helmet())
server.use(cors());
server.use(bodyparser.urlencoded({limit: "10mb", extended: false, parameterLimit:"10000000000"})) //Needed for Stripe
server.use(busyBoy()) //Middleware to parse image
server.get('/', (req, res) => {
    res.send('Hello World!')
});

routes(server)

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`=== Server listening on ${port}... ===`));

// example db access code for reference.  Don't delete for now
const dbTest = async () => {

  // in development. this resets the db each server startup
  // comment out in production
  await db.sync({force: true});


  // Create two users 
  let Bob = await User.create({
    first_name: 'Bob',
    last_name: 'Smith',
    nick_names: '',
    email: 'bob',
    password: 'bob',
    credits: 10,
    hashed_id: 1
  })

  const Jerry = await User.create({
    first_name: 'Jerry',
    last_name: 'Brown',
    nick_names: '',
    email: 'jerry',
    password: "jerry",
    credits: 15,
    hashed_id: 2
  })

  const Sue = await User.create({
    first_name: 'Sue',
    last_name: 'Williams',
    nick_names: '',
    email: 'sue',
    password: "sue",
    credits: 15,
    hashed_id: 3
  })

  // Create two images 
  const myCollectionImage1 = await Image.create({
    name: 'my wedding',
    url: 'http://weddingpicimage.com'
  })

  const myCollectionImage2 = await Image.create({
    name: 'my graduation',
    url: 'http://graduation.com'
  })

  // Add two images to Bob's collection
  await Bob.addCollectionImages([myCollectionImage1, myCollectionImage2]);

  // Add one image to Jerry's collection
  await Jerry.addCollectionImages([myCollectionImage1]);

  // For any image, list all users who have that image in their collection 
  const collection1Users = await myCollectionImage1.getUsers();
  console.log('All users that have myCollectionImage1');
  collection1Users.forEach(user => console.log(`user is ${user.first_name}`))

  const collection2Users = await myCollectionImage2.getUsers();
  console.log('All users that have myCollectionImage2');
  collection2Users.forEach(user => console.log(`user is ${user.first_name}`))
  

  // List all of Bob's images
  let BobImages = await Bob.getCollectionImages();
  console.log(`All images belonging to ${Bob.first_name}`)
  BobImages.forEach(img => console.log(`Image #${img.id} is ${img.name}`)); 

  // List all existing users
  users = await User.findAll();
  users.forEach(user => console.log(`User # ${user.id} is ${user.first_name} ${user.last_name}`));

  // Update user Bob
  
  // Bob.first_name = 'Robert';
  // await Bob.save();

  Bob = await User.findOne({ where: { first_name: 'Bob' } });
  console.log("\nupdated Bob first name is", Bob.first_name);

  // Update Bob's wedding image 
  const bobWeddingImage = (await Bob.getCollectionImages()).find(img => img.name === 'my wedding');
  bobWeddingImage.name = "Bob's wedding image";
  await bobWeddingImage.save();

  BobImages = await Bob.getCollectionImages();
  BobImages.forEach(img => console.log(`Image #${img.id} is ${img.name}`)); 


  const myCollectionImage3 = await Image.create({
    name: 'Test Image 1',
    url: 'https://res.cloudinary.com/picme/image/upload/v1534982156/Selfie-Images/blue-boy-daylight-1205033.jpg'
  })

  const myCollectionImage4 = await Image.create({
    name: 'Test Image 2',
    url: 'https://res.cloudinary.com/picme/image/upload/v1534982245/Selfie-Images/beard-face-fashion-59576.jpg'
  })

  const myCollectionImage5 = await Image.create({
    name: 'Test Image 3',
    url: 'https://res.cloudinary.com/picme/image/upload/v1534982560/Selfie-Images/accomplishment-celebrate-ceremony-267885.jpg'
  })

  const myCollectionImage6 = await Image.create({
    name: 'Test Image 4',
    url: 'https://res.cloudinary.com/picme/image/upload/v1534982481/Selfie-Images/apple-camera-fashion-5164.jpg'
  })

  // Bob uploads two images 
  await Bob.addUploadedImages([myCollectionImage3, myCollectionImage4, myCollectionImage5, myCollectionImage6]);

  // List Bob's uploaded images
  (await Bob.getUploadedImages()).forEach(img => console.log('Image is', img.name));

  // for a particular image, list the user who uploaded it
  // Need to first reload the image model to retrieve the updated data
  const myuser = await (await myCollectionImage3.reload()).getUploadedImageUser();
  console.log(`User who uploaded myCollectionImage3 is ${myuser.first_name}`);

  await Bob.friendRequest(Jerry);

  await Jerry.acceptFriendRequest(Bob);

  let result = await Bob.isFriendsWith(Jerry);
  console.log("Bob is friends with Jerry", result);

  result = await Jerry.isFriendsWith(Bob);
  console.log("Jerry is friends with Bob", result);

  result = await Jerry.isFriendsWith(Sue);
  console.log("Jerry is friends with Sue", result);
}



dbTest();
