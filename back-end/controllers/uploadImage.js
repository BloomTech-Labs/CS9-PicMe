const uploadImage = (req, res) => {
    const cloudinary = require("cloudinary"); //Cloudinary npm package
    const fs = require("fs");
    let tags = [];
    let nameTags;

    req.busboy.on('field', function(fieldname, val) {
        if(fieldname === "Tags") {
            console.log(fieldname, val);
            // val.forEach(tag => {
            //     tags.push(tag)
            // })
            tags = val.split(",")            
        }
    });
    
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
  
    cloudinary.uploader.upload(`controllers/Images/${filename}`, (result, error) => {
        if(error) {
            res.status(400).json({Err: "Failed to upload image"})
            console.log(error)
        } else {
            let file = (__dirname + '/Images/' + filename)
            let deleteFile = fs.openSync(file, "r");
            fs.closeSync(deleteFile);
            fs.unlinkSync(file)
            res.status(200).json({Message: "Success"})
            console.log(result)
            nameTags = result.public_id

            cloudinary.uploader.add_tag(tags, nameTags,
            function(res, err) { 
                if(res) console.log(res);
                else console.log(err) 
            });
        }
    })
});
}

module.exports = {
    uploadImage
}