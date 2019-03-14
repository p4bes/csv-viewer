const CSV_COLUMN_SPLIT_CHARACTER = ';';
const CSV_NEWLINE_SPLIT_CHAR = '\n';

exports.csvToJS = function (csvContent) {
    if (!csvContent) {
        return;
    }
    let data = {
        count: 0,
        headerItems: [],
        rows: []
    };
    const rows = extractRows(csvContent);
    data.count = rows.length - 1;
    rows.forEach(function (row, index) {
        const indexColumn = [index.toString()];
        let columns = buildColumns(row, indexColumn);
        if (index === 0) {
            columns[index] = 'No.';
            data.headerItems = columns;
        } else if (columns && columns.length > 0) {
            data.rows.push({index, columns});
        }
    });
    return data;
};

function buildColumns(row, indexColumn) {
    const rowColumns = extractColumns(row);
    let columns = null;
    if (rowColumns) {
        columns = indexColumn.concat(rowColumns);
    }
    return columns;
}

function extractRows(csvData) {
    csvData = harmonizeLinebreaks(csvData);
    return csvData.split(CSV_NEWLINE_SPLIT_CHAR);
}

function extractColumns(rowString) {
    return rowString !== '' ? rowString.split(CSV_COLUMN_SPLIT_CHARACTER) : null;
}

function harmonizeLinebreaks(data) {
    return data.replace(new RegExp('\r\n', 'g'), CSV_NEWLINE_SPLIT_CHAR).replace(new RegExp('\r', 'g'), CSV_NEWLINE_SPLIT_CHAR)
}
