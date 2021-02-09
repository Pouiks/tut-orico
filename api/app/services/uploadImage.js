const {
    promisify
} = require('util');
const pipeline = promisify(require("stream").pipeline);
const fs = require("fs");
    const UploadImage =  async(file) => {

        console.log("JE SUIS FILE",file)
        console.log("JE SUIS DIRNAME", __dirname);
        console.log("detectedFileExtension : ", file.detectedFileExtension)
        
            const fileName = Math.floor(Math.random() * 1000) + file.detectedFileExtension;
            console.log("JE SUIS FILENAME",fileName);
    
            await pipeline(file.stream, fs.createWriteStream(`${__dirname}/../public/image/${fileName}`));
            console.log("ROUTE PR LE FRONT ",`/image/${fileName}`);
            const newImageUrl = `/image/${fileName}`;
            return newImageUrl;
    }

    module.exports = UploadImage;
    

