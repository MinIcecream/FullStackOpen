import axios from 'axios' 
import { useEffect } from 'react'
import { useState } from 'react'

function CountryDescription({country}) { 
    const [weather, setWeather] = useState(null)
    useEffect(() => { 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid={API_KEY}&units=metric`)
        .then(response => setWeather(response.data))
    }, [])
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>

            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((language, i) => <li key = {i}>{language}</li>)}
            </ul>
            <img src = {country.flags.png} alt = {country.flags.alt}/>
            {weather
            ? (
                <>
                    <h2>Weather in {country.capital}</h2>
                    <p>temperature {weather.main.temp} Celsius</p> 
                    <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/>
                    <p>wind {weather.wind.speed} m/s</p>
                </>
            )
            : <p>weather not available.</p>} 
        </div>
    )
  }
  
  export default CountryDescription
  