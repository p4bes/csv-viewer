#!/usr/bin/env node
const consoleUI = require('./src/ConsoleUI');
const processParameters = require('./src/ProcessParameters');
const fileReader = require('./src/FileReader');
const KEY_TO_ACTION = require('./src/KeyToAction');

main();

function main() {
    const filePath = processParameters.getFirstParameter();
    if (filePath != null) {
        // 1. read File
        const csvContent = fileReader.readFile(filePath);

        // 2. do stuff with the data
        // TODO transform csv/string data to json

        // 3. print data to the UI
        consoleUI.print(csvContent, KEY_TO_ACTION.keytoActionMap);

        // 4. wait for interactions
        consoleUI.registerActionCallback(function (key) {
            handleAction(key);
        });

    } else {
        // TODO what else? error message?
        exit();
    }
}

function exit() {
    consoleUI.close();
    process.exit();
}

// TODO move to own file
function handleAction(key) {
    if (KEY_TO_ACTION.keytoActionMap.hasOwnProperty(key)) {
        const action = KEY_TO_ACTION.keytoActionMap[key];
        switch (action.actionType) {
            case 'NEXT': // TODO next page
                break;
            case 'PREV': // TODO prev page
                break;
            case 'FIRST': // TODO first page
                break;
            case 'LAST': // TODO last page
                break;
            case 'EXIT':
                exit();
                break;
        }
        console.log(' -> ' + action.actionType); // TODO remove
    } // else -> ignore and nothing happens
}
