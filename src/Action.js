const Pagination = require('./Pagination');

exports.handleAction = function (key, keytoActionMap, size, pageSize, offset, totalElements, updateCallback) {
    key.toLowerCase();
    if (keytoActionMap.hasOwnProperty(key)) {
        const action = keytoActionMap[key];
        let pagination = new Pagination(offset, size, totalElements, pageSize);
        switch (action.actionType) {
            case 'NEXT':
                pagination.next();
                break;
            case 'PREV':
                pagination.prev();
                break;
            case 'FIRST':
                pagination.first();
                break;
            case 'LAST':
                pagination.last();
                break;
            case 'EXIT':
                break;
        }
        callUpdateCallback(action.actionType, pagination.offset, pagination.size, updateCallback);
    } // else -> ignore and nothing happens


    function callUpdateCallback(actionType, offset, size, callback) {
        if (callback && typeof callback === 'function') {
            callback(actionType, offset, size);
        }
    }
};
