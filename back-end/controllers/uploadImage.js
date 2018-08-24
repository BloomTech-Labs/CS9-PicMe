let tags = []; //Tags we're passing onto the image
let nameTags; //Public id or mutliple id's we want to give tags to
let email;

const uploadImage = (req, res) => {
    const cloudinary = require("cloudinary"); //Cloudinary npm package
    const Sequelize = require("sequelize");
    const db = require("../db/dbconnection");
    const Image = require("../db/models/image")(db, Sequelize);
    const User = require("../db/models/user")(db, Sequelize); 
    User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
    Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'}); 
    User.hasMany(Image, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImages'});
    Image.belongsTo(User, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImageUser'});

    const {email, name, url, tags} = req.body;

    console.log(email, name, url, tags); 
    

    cloudinary.config({ 
        cloud_name: 'picme', 
        api_key: process.env.CLOUDINARY_KEY, //ENV variables given to us through cloudinary, check google sheets
        api_secret: process.env.CLOUDINARY_SECRET 
    });  

    const newImage = (name, url) => {
        Image.create({
            name: name,
            url: url
        })
    }    

        if(email && tags[0].length != 0) {
            User.findOne({ where: { email: email } }).then(user => {
            let credits = user.credits;
            
            //Adds a credit to a user
            User.update({ credits: credits+1 }, { where: { email: email }, individualHooks: true })
            .then(user => console.log(user))
            .catch(err => console.log(err)); 
            })
        }
        
        User.findOne({where: {email: email}}).then(user => {
            user.addUploadedImages([newImage(name, url)]) //Not sure if this is working, no errors though
        })
}

module.exports = {
    uploadImage
}