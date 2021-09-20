const fs = require("fs");
const os = require("os");
const path = require("path");

const writeAFile = (folder, fileContent) => {
    const dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  return new Promise((resolve, reject) => {
    fs.mkdir(path.join(folder, "iamyousufbasir"), { recursive: true }, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        fs.writeFile(
          path.join(folder, "iamyousufbasir", "testhome.txt"),
          fileContent  + " ⌚ " + dateNow,
          (err) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
            }
          }
        );
      }
    });
  });
};

module.exports = {
    writeAFile: writeAFile,
};
