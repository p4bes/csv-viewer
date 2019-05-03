#!/usr/bin/env node
const consoleUI = require('./ConsoleUI');
const consoleProcess = require('./ConsoleProcess');
const ERRORS = require('./Errors');
const controller = require('./CSVController');
const Pagination = require('./Pagination');

let DONT_CLOSE_FOR_TEST = true; // only needed for test execution
const DEFAULT_PAGE_SIZE = 10;

exports.startConsole = function (params, dontCloseForTest) {
    const filePath = consoleProcess.getParamFromPosition(params, 2);
    const pageSize = parseInt(consoleProcess.getParamFromPosition(params, 3));
    DONT_CLOSE_FOR_TEST = dontCloseForTest;
    _start(filePath, pageSize);
};

function _start(filePath, pageSize) {
    let size = pageSize ? pageSize : DEFAULT_PAGE_SIZE;
    let csvContent = controller.readFile(filePath, errorCode => _handleError(errorCode));
    let data = controller.transformData(csvContent, errorCode => _handleError(errorCode));
    let pagination = new Pagination(0, size, size, data ? data.count : 0, 1);
    controller.printInitialData(data, pagination, consoleUI, errorCode => _handleError(errorCode));
    consoleUI.registerActionCallback(pressedKey => _onKeyPressed(pressedKey, data, pagination));
}

function _handleError(errorType) {
    if (ERRORS.errorMap[errorType] != null) {
        consoleUI.printText(ERRORS.errorMap[errorType]);
    } else {
        consoleUI.printText(ERRORS.errorMap['DEFAULT_ERROR']);
    }
    _exit();
}

function _onKeyPressed(pressedKey, data, pagination) {
    controller.handleInteractions(pressedKey, data, pagination, consoleUI.printTable, _exit);
}

function _exit() {
    if (!DONT_CLOSE_FOR_TEST) {
        consoleUI.close();
        consoleProcess.exit();
    } else {
        // keep the application running, but stop executing - only needed for tests!
        return null;
    }
}


