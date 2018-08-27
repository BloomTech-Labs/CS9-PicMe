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
            //remove the credit due to the addition of an image to the users collection.
           user.credits -= 1
           // adds the added image to the collection
           User.addCollectionImages(images).then()
           // save the current status of the User.
           user.save().then();
           res.status(200).json({
               // success message below
            Message: "Image successfully added to your collection, and one credit removed.", // 
            credits: user.credits // credits are set to the number of credits owned by the user.
          })

        }
    }).catch(err => console.log(err))
}

// Export addImageToCollection controller
module.exports = {
    addImageToCollection
};