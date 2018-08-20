const Cloudinary = (req, res) => {
    const cloudinary = require("cloudinary"); //Cloudinary npm package
    const image = req.body

    cloudinary.config({ 
        cloud_name: 'picme', 
        api_key: process.env.CLOUDINARY_KEY, //ENV variables given to us through cloudinary, check google sheets
        api_secret: process.env.CLOUDINARY_SECRET 
    });  
  

    cloudinary.uploader.upload(image,
    //Image is default for now until it can be done client side
    function(result) {
        if(result.error) {
            res.status(400).json({Message: "Error uploading image"})
        } else {
            res.status(200).json({Message: "Image Uploaded"})
        }
    })
}

module.exports = {
    Cloudinary
}