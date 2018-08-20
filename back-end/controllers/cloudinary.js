const Cloudinary = (req, res) => {
    const cloudinary = require("cloudinary"); //Cloudinary npm package
    const image = req.body

    console.log(image)
    
    cloudinary.config({ 
        cloud_name: 'picme', 
        api_key: process.env.CLOUDINARY_KEY, //ENV variables given to us through cloudinary, check google sheets
        api_secret: process.env.CLOUDINARY_SECRET 
    });  
  
    //Grabs from image link, will test grabbing image from fe later
    cloudinary.uploader.upload("https://images.unsplash.com/photo-1534607287018-541c7d97748f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f8492e948d2ac5c91199a2623b1c42af&auto=format&fit=crop&w=925&q=80",
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