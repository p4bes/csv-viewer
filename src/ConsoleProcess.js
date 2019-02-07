exports.getParamFromPosition = function (position) {
    if (process && process.argv && process.argv[position]) {
        return process.argv[position];
    }
    return null;
};

exports.exit = function () {
    process.exit();
}
