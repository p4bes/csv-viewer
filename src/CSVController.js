#!/usr/bin/env node
const consoleUI = require('./ConsoleUI');
const consoleProcess = require('./ConsoleProcess');
const fileReader = require('./FileReader');
const csvTransformator = require('./CSVTransformator');
const actionController = require('./Action')
const KEY_TO_ACTION = require('./KeyToAction');


exports.start = function () {
    let offset = 0;
    let size = 10;
    let data;
    let csvContent;

    const filePath = consoleProcess.getParamFromPosition(2);
    const paramSize = parseInt(consoleProcess.getParamFromPosition(3));
    if (paramSize) {
        size = paramSize;
    }
    let originalSize = size;
    if (filePath != null) {
        // 1. read File
        try {
            csvContent = fileReader.readFile(filePath);
        } catch (e) {
            consoleUI.printText('Error while reading file! Exiting...');
            exit();
        }

        // 2. transform the data
        if (csvContent != null) {
            data = csvTransformator.csvToJS(csvContent);
        } else {
            consoleUI.printText('File has invalid (= no csv) content! Exiting...');
            exit();
        }

        // 3. print data to the UI
        if (data && data.count > 0) {
            consoleUI.printTable(data, KEY_TO_ACTION.keytoActionMap, offset, size);
        } else {
            consoleUI.printText('File contains no data! Exiting...');
            exit();
        }

        // 4. wait for interactions
        consoleUI.registerActionCallback(function (key) {
            // handle action
            actionController.handleAction(key, KEY_TO_ACTION.keytoActionMap, size, originalSize, offset, data.count, function (action, newOffset, newSize) {
                if (offset !== newOffset || size !== newSize) {
                    // reprint with updated offset and size
                    offset = newOffset;
                    size = newSize;
                    consoleUI.printTable(data, KEY_TO_ACTION.keytoActionMap, offset, size);
                } else if (action && action === 'EXIT') {
                    exit();
                }
            });
        });

    } else {
        consoleUI.printText('No filepath passed as first parameter! Exiting...');
        exit();
    }
};

function exit() {
    consoleUI.close();
    consoleProcess.exit();
}

