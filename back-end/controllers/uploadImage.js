let tags = []; //Tags we're passing onto the image
let nameTags; //Public id or mutliple id's we want to give tags to
let email;

const uploadImage = (req, res) => {

    const Sequelize = require("sequelize");
    const db = require("../db/dbconnection");
    const Image = require("../db/models/image")(db, Sequelize);
    const User = require("../db/models/user")(db, Sequelize); 
    User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
    Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'}); 
    User.hasMany(Image, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImages'});
    Image.belongsTo(User, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImageUser'});

    const newImage = (name, url) => {
        Image.create({
            name: name,
            url: url
        })
    }

    const cloudinary = require("cloudinary"); //Cloudinary npm package
    const fs = require("fs");


    //Recieves non-file info from our front-end, this is were we get out tags to upload
    req.busboy.on('field', function(fieldname, val) {
        if(fieldname === "Email") {
            email = val;
        }

        if(fieldname === "Tags") {
            tags = val.split(",")            
        }
    });
    
    
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) { //Grabs our file from FE and sets it into our images folder as cloudinary only likes paths
        fstream = fs.createWriteStream(__dirname + '/Images/' + filename);
        file.pipe(fstream);
    
    cloudinary.config({ 
        cloud_name: 'picme', 
        api_key: process.env.CLOUDINARY_KEY, //ENV variables given to us through cloudinary, check google sheets
        api_secret: process.env.CLOUDINARY_SECRET 
    });  
  
    cloudinary.uploader.upload(`controllers/Images/${filename}`, (result, error) => {
        if(error) {
            res.status(400).json({Err: "Failed to upload image"})
        } else {
            let file = (__dirname + '/Images/' + filename) //We delete the image from our server afterwards
            let deleteFile = fs.openSync(file, "r");
            fs.closeSync(deleteFile);
            fs.unlinkSync(file)
            nameTags = result.public_id
            url = result.url

            cloudinary.uploader.add_tag(tags, nameTags, //Once image uploaded we add the desired tags to it
            function(result, err) { 
                if(result) {
                    User.findOne({where: {email: email}}).then(user => {
                        user.addUploadedImages([newImage(nameTags, url)]) //Not sure if this is working, no errors though
                    })
                    res.status(200).json({Message: "Image uploaded"})
                }
                else res.status(500).json({Err: "Could not add tags at this time"})
            });
        }
    })
});
}

module.exports = {
    uploadImage
}