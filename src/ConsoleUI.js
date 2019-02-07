const readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

let actionCallback = null;
const ACTION_SEPARATOR_STRING = ', ';

exports.registerActionCallback = function (callback) {
    if (callback && typeof callback === "function") {
        actionCallback = callback;
    }
};

exports.print = function (csvData, actions) {
    // TODO render json data instead of csv
    console.log(csvData);
    renderActions(actions);
    rl.setPrompt('> ');
    rl.prompt();
};


exports.close = function () {
    rl.close();
    process.stdin.destroy();
};


function renderActions(actions) {
    let actionsString = '';
    for (var key in actions) {
        if (actions.hasOwnProperty(key)) {
            actionsString += actions[key].actionText + ACTION_SEPARATOR_STRING;
        }
    }
    if (actionsString !== '') { // remove last separator
        actionsString = actionsString.slice(0, -ACTION_SEPARATOR_STRING.length);
    }
    console.log(actionsString);
}

function fireCallbackAction(key) {
    if (actionCallback != null) {
        actionCallback(key);
    }
}

// handle keypress events
process.stdin.on('keypress', function (s, key) {
    fireCallbackAction(key.name);
});
