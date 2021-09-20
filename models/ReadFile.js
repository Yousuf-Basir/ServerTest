const fs = require("fs");
const path = require("path");

const readAFile = (folder) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(folder, "iamyousufbasir", "testhome.txt"), {encoding: "utf-8"}, (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    })
};

module.exports = {
    readAFile: readAFile,
};