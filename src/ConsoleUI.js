const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    ouput: process.stdout
});


exports.print = function (content) {
    // TODO beautify or use readline as well?
    console.log(content);
};

exports.listen = function (callback) {
    readline.emitKeypressEvents(process.stdin);
    // TODO Check ndoe 11 for raw mode
    // process.stdin.setRawMode(true);
    process.stdin.on('keypress', function(s, key) {
        switch (key.name) {
            case 'x': callback('exit'); break;
            default: break;
        }
    });
}


