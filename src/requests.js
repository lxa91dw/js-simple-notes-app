

const getPuzzle = async (wordCount) => {

    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`, {})
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to fetch the puzzle')
    }
}


const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=c3790e1246b933', {})
    if (response.status === 200) {
        const data = await response.json()
        return data 
    } else {
        throw new Error('Unable to fetch your location information')
    
    }}


const getCountryDetails = async (countryCode) => {
    const response = await fetch('//restcountries.eu/rest/v2/all', {})
    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Unable to fetch the puzzle')
    }}
    
export { getPuzzle as default }
