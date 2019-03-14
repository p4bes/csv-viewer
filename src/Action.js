exports.handleAction = function (key, keytoActionMap, pagination, updateCallback) {
    key.toLowerCase();
    if (keytoActionMap.hasOwnProperty(key)) {
        const action = keytoActionMap[key];
        if (action && action.actionType) {
            if (action.paginationMethod) {
                pagination[action.paginationMethod]();
            }
            callUpdateCallback(action.actionType, pagination, updateCallback);
        }
    }
};

function callUpdateCallback(actionType, pagination, callback) {
    if (callback && typeof callback === 'function') {
        callback(actionType, pagination);
    }
}
