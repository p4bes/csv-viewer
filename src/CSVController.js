#!/usr/bin/env node
const consoleUI = require('./ConsoleUI');
const consoleProcess = require('./ConsoleProcess');
const fileReader = require('./FileReader');
const csvTransformator = require('./CSVTransformator');
const actionController = require('./Action')
const KEY_TO_ACTION = require('./KeyToAction');


exports.startWithoutConsole = function (filePath, pageSize, dontCloseForTest) {
    _start(filePath, pageSize, dontCloseForTest);
};

exports.startConsole = function (dontCloseForTest) {
    const filePath = consoleProcess.getParamFromPosition(2);
    const pageSize = parseInt(consoleProcess.getParamFromPosition(3));
    _start(filePath, pageSize, dontCloseForTest);
};

function _start(filePath, pageSize, dontCloseForTest) {
    let offset = 0;
    let size = pageSize | 10;
    let originalPageSize = size;
    let data;
    let csvContent;

    if (filePath != null) {
        // 1. read File
        try {
            csvContent = fileReader.readFile(filePath);
        } catch (e) {
            consoleUI.printText('Error while reading file! Exiting...');
            _exit();
        }

        // 2. transform the data
        if (csvContent != null) {
            data = csvTransformator.csvToJS(csvContent);
        } else {
            consoleUI.printText('File has invalid (= no csv) content! Exiting...');
            _exit();
        }

        // 3. print data to the UI
        if (data && data.count > 0) {
            consoleUI.printTable(data, KEY_TO_ACTION.keytoActionMap, offset, size);
        } else {
            consoleUI.printText('File contains no data! Exiting...');
            _exit();
        }

        // 4. wait for interactions
        consoleUI.registerActionCallback(function (key) {
            // handle action
            actionController.handleAction(key, KEY_TO_ACTION.keytoActionMap, size, originalPageSize, offset, data.count, function (action, newOffset, newSize) {
                if (offset !== newOffset || size !== newSize) {
                    // reprint with updated offset and size
                    offset = newOffset;
                    size = newSize;
                    consoleUI.printTable(data, KEY_TO_ACTION.keytoActionMap, offset, size);
                } else if (action && action === 'EXIT') {
                    _exit();
                }
            });
        });

    } else {
        consoleUI.printText('No filepath passed as first parameter! Exiting...');
        _exit();
    }

    function _exit() {
        if (!dontCloseForTest) {
            consoleUI.close();
            consoleProcess.exit();
        }
    }
}


