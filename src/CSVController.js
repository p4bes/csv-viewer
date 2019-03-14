const fileReader = require('./FileReader');
const csvTransformator = require('./CSVTransformator');
const actionController = require('./Action')
const KEY_TO_ACTION = require('./KeyToAction');

exports.readFile = function (filePath, errorCallback) {
    if (!filePath) {
        errorCallback('NO_FILEPATH');
    } else {
        try {
            return fileReader.readFile(filePath);
        } catch (e) {
            errorCallback('FILE_ERROR');
        }
    }
}

exports.transformData = function (csvContent, errorCallback) {
    if (csvContent != null) {
        return csvTransformator.csvToJS(csvContent);
    } else {
        errorCallback('INVALID_CONTENT');
    }
}

exports.printInitialData = function (data, offset, size, consoleUI, errorCallback) {
    if (data && data.count > 0) {
        consoleUI.printTable(data, KEY_TO_ACTION.keytoActionMap, offset, size);
    } else {
        errorCallback('NO_DATA');
    }
}

exports.handleInteractions = function (key, data, originalPageSize, size, offset, reprintCallback, exitCallback) {
    actionController.handleAction(key, KEY_TO_ACTION.keytoActionMap, size, originalPageSize, offset, data.count, function (action, newOffset, newSize) {
        if (offset !== newOffset || size !== newSize) {
            offset = newOffset;
            size = newSize;
            reprintCallback(data, KEY_TO_ACTION.keytoActionMap, offset, size);
        } else if (action && action === 'EXIT') {
            exitCallback();
        }
    });
}
