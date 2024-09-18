const {faker} = require("@faker-js/faker");
exports.countries = {US:"USA", PL: 'Poland', GEO: 'Georgia'}
exports.countryCodes = {US: '+1', PL: '+48', GEO: '+995'}

exports.getCountryIndex = (countryId)=>{
    let i = 0
    for(let country in exports.countries){
        i++
        if(country===countryId){
            return (i+1)
        }
    }
}

exports.generateSeed = (country, page, seed)=>{
    return parseInt(exports.getCountryIndex(country).toString()+seed.toString()+page.toString())
}

exports.generateId = (country, page, seed) =>{
    faker.seed(exports.generateSeed (country, page, seed))
    return faker.string.uuid()
}
