exports.getParamFromPosition = function (params, position) {
    if (params && params[position]) {
        return params[position];
    }
    return null;
};

exports.exit = function () {
    process.exit();
}
