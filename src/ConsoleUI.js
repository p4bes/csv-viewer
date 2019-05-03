const readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

let actionCallback = null;
const ACTION_SEPARATOR_STRING = ', ';

exports.registerActionCallback = function (callback) {
    if (callback && typeof callback === 'function') {
        actionCallback = callback;
    }
};

exports.printTable = function (data, actions, pagination) {
    console.log();
    printData(data, pagination);
    renderActions(actions);
    setPrompt();
};

exports.printText = function (text) {
    console.log(text);
};


exports.close = function () {
    rl.close();
    process.stdin.destroy();
};

// handle keypress events
process.stdin.on('keypress', function (s, key) {
    fireCallbackAction(key.name);
});


function setPrompt() {
    rl.setPrompt('> ');
    rl.prompt();
}

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

function printData(data, pagination) {
    let pageDataRows = data.rows.slice(pagination.offset, (pagination.offset + pagination.size));
    let columnSizes = calculateColumnSizes(pageDataRows, data.headerItems);
    printDataRow(data.headerItems, columnSizes);
    printDividerLine(columnSizes);
    printTableContent(pageDataRows, columnSizes);
    printPageInformation(pagination.pageNumber, pagination.totalPages);
}

function calculateColumnSizes(rows, headerColumns) {
    let columnSizes = [];
    extractColumnSizes(headerColumns, columnSizes);
    rows.forEach(function (row) {
        extractColumnSizes(row.columns, columnSizes);
    });
    return columnSizes;
}

function extractColumnSizes(columns, columnSizes) {
    columns.forEach(function (column, i) {
        if (column && !columnSizes[i] || (columnSizes[i] && columnSizes[i] < column.length)) {
            columnSizes[i] = column.length;
        }
    });
}

function printDataRow(rowItems, columnSizes) {
    let rowString = '';
    rowItems.forEach(function (item, i) {
        rowString += item;
        if (item.length < columnSizes[i]) {
            rowString = addCharactersToString(' ', columnSizes[i] - item.length, rowString);
        }
        rowString += '|';
    });
    console.log(rowString);
}

function printTableContent(dataRows, columnSizes) {
    dataRows.forEach(function (row) {
        printDataRow(row.columns, columnSizes);
    });
}

function printDividerLine(columnSizes) {
    let dividerString = '';
    columnSizes.forEach(function (column) {
        dividerString = addCharactersToString('-', column, dividerString);
        dividerString += '+';
    });
    console.log(dividerString);
}

function addCharactersToString(character, number, textString) {
    for (let i = 0; i < number; i++) {
        textString += character;
    }
    return textString;
}

function printPageInformation(pageNumber, totalElements) {
    console.log("Page " + pageNumber + " of " + totalElements);
}



