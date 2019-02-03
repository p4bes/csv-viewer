#!/usr/bin/env node
const consoleUI = require('./src/ConsoleUI');
const processParameters = require('./src/ProcessParameters');
const fileReader = require('./src/FileReader');

main();

function main() {
    const filePath = processParameters.getFirstParameter();
    if (filePath != null) {
        // 1. read File
        const csvContent = fileReader.readFile(filePath);

        // 2. do stuff with the data

        // 3. print data to the UI
        consoleUI.print(csvContent);

        // 4. wait for interactions
        consoleUI.listen(function (event) {
            if (event === 'exit') {
                exit();
            }
        })

    } else {
        // TODO what else?
        exit();
    }
    process.stdin.on('keypress', function(s, key) {
        switch (key) {
            case 'x': callback('exit'); break;
            default: break;
        }
    });
}

function exit() {
    process.exit();
}
