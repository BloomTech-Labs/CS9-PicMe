const uploadImage = (req, res) => {
    const cloudinary = require("cloudinary"); //Cloudinary npm package
    const fs = require("fs");

    console.log("Reached")
    
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/Images/' + filename);
        file.pipe(fstream);
    
    cloudinary.config({ 
        cloud_name: 'picme', 
        api_key: process.env.CLOUDINARY_KEY, //ENV variables given to us through cloudinary, check google sheets
        api_secret: process.env.CLOUDINARY_SECRET 
    });  
  
    cloudinary.uploader.upload(`controllers/Images/${filename}`, (result, err) => {
        if(err) {
            res.status(400).json({Err: "Failed to upload image"})
        } else {
            let file = (__dirname + '/Images/' + filename)
            let deleteFile = fs.openSync(file, "r");
            fs.closeSync(deleteFile);
            fs.unlinkSync(file)
            res.status(200).json({Message: "Success"})
        }
    })
});
}

module.exports = {
    uploadImage
}