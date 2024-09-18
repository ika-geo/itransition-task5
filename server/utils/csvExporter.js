let converter = require('json-2-csv');

exports.handleCSV=(data)=> {
    let csv = converter.json2csv(data);
    return csv
}



