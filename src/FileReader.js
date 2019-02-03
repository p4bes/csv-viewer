const fs = require('fs');


exports.readFile = function (filePath) {
    var fileData;
    try {
        fileData = fs.readFileSync(filePath, {encoding: 'utf8'});
    } catch (e) {
        console.log('File not found');
        return null;
    }
    return fileData;
};
