const {generateFakeData} = require('../services/dataService');
const {handleCSV} = require('../utils/csvExporter');

exports.getData = (req, res) => {
    try {
        const {country, errorsPerRecord, seed, page, pageSize} = req.body;
        const data = generateFakeData(country, errorsPerRecord, seed, page, pageSize);
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error generating data'});
    }
};

exports.exportCSV = (req, res) => {
    try{
        let {data} = req.body;
        const csv = handleCSV(data);
        res.status(200).json(csv)
    }
    catch (err){
        console.error(err);
        res.status(500).json({message: 'Error generating CSV'});
    }
};