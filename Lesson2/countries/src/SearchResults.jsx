import { useEffect } from "react"
import CountryDescription from "./CountryDescription"

function SearchResults({countries, onClick}) {
    useEffect(() => { 
        if (countries.length == 1){
            onClick(countries[0])
        } 
    }) 
    if(countries.length > 10){
        return <p>Too many matches!</p>
    }
    else if (countries.length > 1)
    { 
        return( 
            <>  
                {countries.map((country, index) => <p key = {index}>{country.name.common} <button onClick = {() => onClick(country)}> show </button></p> )} 
            </> 
        ) 
    } 
    return null 
}

export default SearchResults
