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
};

exports.transformData = function (csvContent, errorCallback) {
    if (csvContent !== null && csvContent !== '') {
        return csvTransformator.csvToJS(csvContent);
    } else {
        errorCallback('INVALID_CONTENT');
    }
};

exports.printInitialData = function (data, pagination, consoleUI, errorCallback) {
    if (data && data.count > 1) {
        consoleUI.printTable(data, KEY_TO_ACTION.keytoActionMap, pagination);
    } else if (data) {
        errorCallback('NO_DATA');
    }
};

exports.handleInteractions = function (key, data, pagination, reprintCallback, pageNumberCallback, exitCallback) {
    actionController.handleAction(key, KEY_TO_ACTION.keytoActionMap, pagination, function (action) {
            if (action && action === 'EXIT') {
                exitCallback();
            } else if (action && action === 'JUMP') {
                pageNumberCallback();
            } else if (pagination.hasChanged()) {
                reprintCallback(data, KEY_TO_ACTION.keytoActionMap, pagination);
            }

        }
    );

};
