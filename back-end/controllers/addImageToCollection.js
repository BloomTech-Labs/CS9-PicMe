const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);
const Image = require("../db/models/image")(db, Sequelize);
// imports, used for queries later 

//getCollectionImages();
//.forEach(img => res.json(img))
const addImageToCollection = (req, res) => {
    const { email, images } = req.body;

    User.findOne({ where: { email: email} })
    .then(user => {
        if (!user) {
            return res.status(422).json({error: 'The specified user does not exist'});
        } else {
           await User.addCollectionImages(images)
        }
    }).catch(err => console.log(err))
}

// Export addImageToCollection controller
module.exports = {
    addImageToCollection
};