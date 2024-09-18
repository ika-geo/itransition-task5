const { generateRandomPerson} = require('../utils/fakerUtils');
const {handleAddErrors} = require("../utils/errorUtil");


exports.generateFakeData = (country, errorsPerRecord, seed, page, pageSize) => {
    const start = page * pageSize;
    const data = [];
    for (let i = start; i < start + pageSize; i++) {
        let person = generateRandomPerson(country, page, seed + i, );
        if (errorsPerRecord&&errorsPerRecord > 0) {
            person = handleAddErrors(person, errorsPerRecord);
        }
        data.push(person);
    }
    return data;
};