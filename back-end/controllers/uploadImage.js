const uploadImage = (req, res) => {
    const cloudinary = require("cloudinary"); //Cloudinary npm package
    const fs = require("fs");
    let tags = []; //Tags we're passing onto the image
    let nameTags; //Public id or mutliple id's we want to give tags to

    //Recieves non-file info from our front-end, this is were we get out tags to upload
    req.busboy.on('field', function(fieldname, val) {
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

            cloudinary.uploader.add_tag(tags, nameTags, //Once image uploaded we add the desired tags to it
            function(result, err) { 
                if(result) res.status(200).json({Message: "Image uploaded"})
                else res.status(500).json({Err: "Could not add tags at this time"})
            });
        }
    })
});
}

module.exports = {
    uploadImage
}