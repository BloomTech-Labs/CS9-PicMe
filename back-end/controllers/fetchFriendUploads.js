const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const Image = require("../db/models/image")(db, Sequelize);
const User = require("../db/models/user")(db, Sequelize); 
User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'}); 
User.hasMany(Image, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImages'});
Image.belongsTo(User, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImageUser'});


const fetchFriendUploads = (req, res) => {
    const userId = req.params.id;

    User.findOne({where: {id: userId}}).then(user => {
        const pics = []
        const bob =  user.getUploadedImages().then(uploads => {
            uploads.forEach(image => {
                // console.log("lol", image.dataValues.url); 
                pics.push(image.dataValues.url)
            })
            // console.log("\n", pics)
            res.status(200).json(pics)


        })

        // console.log(bob)
        // bob.forEach(img => console.log(`Image #${img.id} is ${img.name}`)); 

        // const stuff = {

        // }

        // pics.forEach((image, index) => {
        //     console.log(image, index)
        // })


    })
}

module.exports = {
    fetchFriendUploads
}