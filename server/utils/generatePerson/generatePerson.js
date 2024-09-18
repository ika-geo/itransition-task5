const {fakerKA_GE, fakerEN_US, fakerPL} = require("@faker-js/faker");
const {generateId, generateSeed, countries} = require("./helpers");

const chosenFaker = { fakerKA_GE, fakerEN_US, fakerPL };


const addressTypes = (fakerPrefix, country)=> {return [
    `${fakerPrefix.location.streetAddress()}, ${fakerPrefix.location.city()}, ${countries[country]}`,
    `${fakerPrefix.location.secondaryAddress()}, ${fakerPrefix.location.ordinalDirection()}, ${fakerPrefix.location.city()}, ${countries[country]}`,
    `${fakerPrefix.location.street()}, ${fakerPrefix.location.zipCode()}, ${fakerPrefix.location.city()}, ${countries[country]}`,
]}

const generateRandomArrayItem = (fakerPrefix, country, seed)=>{
    return addressTypes(fakerPrefix, country)[seed%3]
}

exports.generatePerson = (country, page, seed, fakerRegion)=>{
    let fakerPrefix = chosenFaker[fakerRegion]
    return {
        id: generateId(country, page, seed, fakerPrefix),
        name: generateName(country, page, seed, fakerPrefix),
        address: generateAddress(country, page, seed, fakerPrefix),
        phone: generatePhone(country, page, seed, fakerPrefix),
    }
}

const generateName = (country, page, seed, fakerPrefix)=>{
    fakerPrefix.seed(generateSeed (country, page, seed))
    return fakerPrefix.person.fullName()
}

const generateAddress = (country, page, seed, fakerPrefix)=>{
    fakerPrefix.seed(generateSeed (country, page, seed))
    return generateRandomArrayItem(fakerPrefix, country, seed)
}


const generatePhone=(country, page, seed, fakerPrefix)=>{
    fakerPrefix.seed(generateSeed (country, page, seed))
    return fakerPrefix.phone.number()
}