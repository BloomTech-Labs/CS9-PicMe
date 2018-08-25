const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const Image = require("../db/models/image")(db, Sequelize);
const User = require("../db/models/user")(db, Sequelize); 
User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'}); 
User.hasMany(Image, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImages'});
Image.belongsTo(User, {foreignKey: 'uploaded_image_user_id', as: 'UploadedImageUser'});


const fetchFriendUploads = (req, res) => {
    const test = req.params.id;
    res.status(200).json({URL: test})
}

module.exports = {
    fetchFriendUploads
}