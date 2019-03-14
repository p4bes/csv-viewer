#!/usr/bin/env node
const consoleUI = require('./ConsoleUI');
const consoleProcess = require('./ConsoleProcess');
const ERRORS = require('./Errors');
const controller = require('./CSVController')

// only needed for running tests
let DONT_CLOSE_FOR_TEST = false;

exports.startConsole = function (params, dontCloseForTest) {
    const filePath = consoleProcess.getParamFromPosition(params, 2);
    const pageSize = parseInt(consoleProcess.getParamFromPosition(3));
    DONT_CLOSE_FOR_TEST = dontCloseForTest;
    _start(filePath, pageSize);
};

function _start(filePath, pageSize) {
    let offset = 0;
    let size = pageSize | 10;
    let originalPageSize = size;

    let csvContent = controller.readFile(filePath, _handleError);
    let data = controller.transformData(csvContent, _handleError);
    controller.printInitialData(data, offset, size, consoleUI, _handleError);
    consoleUI.registerActionCallback(key => controller.handleInteractions(key, data, originalPageSize, size, offset, consoleUI.printTable, _exit));
}

function _handleError(errorType) {
    if (ERRORS.errorMap[errorType] != null) {
        consoleUI.printText(ERRORS.errorMap[errorType]);
    } else {
        consoleUI.printText(ERRORS.errorMap['DEFAULT_ERROR']);
    }
    _exit();
}

function _exit() {
    if (!DONT_CLOSE_FOR_TEST) {
        consoleUI.close();
        consoleProcess.exit();
    }
}


