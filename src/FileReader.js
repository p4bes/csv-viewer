const fs = require('fs');


exports.readFile = function (filePath) {
    let fileData;
    fileData = fs.readFileSync(filePath, {encoding: 'utf8'});
    return fileData;
};
