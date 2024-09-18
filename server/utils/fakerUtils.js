const {generatePerson} = require("./generatePerson/generatePerson");

const fakers = {
    US:'fakerEN_US',
    PL: 'fakerPL',
    GEO: 'fakerKA_GE'
}

exports.countries = {
    US: 'USA',
    PL: 'Poland',
    GEO:'Georgia'
}

exports.generateRandomPerson=(country, page, seed)=>{
    let fakerRegion = fakers[country]
    return generatePerson(country, page, seed, fakerRegion)
}

