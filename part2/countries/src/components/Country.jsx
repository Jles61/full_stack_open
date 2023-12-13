import { useState } from 'react'

import Button from './Button'
import countryService from '../services/countries'
import weatherService from '../services/weather'


const Country = ({ country, length }) => {

    const [show, setShow] = useState(false)
    const [weather, setWeather] = useState('')

    const handleClick = () => {
        countryService
            .getByName(country.name.common.toLowerCase())
            .then(countryReturned => {
                setShow(true)
                console.log(countryReturned)
            })
            .catch((error) => {
                console.error('Error fetching country:', error)
            })
    }

    const capitalWeather = (lat, long) => {
        weatherService
            .getWeather(lat, long)
            .then(weatherReturned => {
                console.log(weatherReturned)
                setWeather(weatherReturned)
            })
            .catch((error) => {
                setWeather('')
                console.error('Error fetching weather:', error)
            })
    }

    const capitalInfo = capitalWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])

    const showInfo = (country) => {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <h2>languages:</h2>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img
                    src={country.flags.svg}
                    alt={country.flags.alt}
                    height="150px"
                    width="150px" />
                <h1>Weather in {country.capital}</h1>
                {console.log(capitalInfo)}
                {/* {weather == '' ? <p>Can't fetch weather for now</p> : <p>temperature {weather.main.temp} Celsius</p>} */}
                <img
                    src="https://openweathermap.org/img/wn/10d@2x.png"
                    alt={country.flags.alt}
                    height="150px"
                    width="150px" />
                {/* {weather == '' ? <p>Can't fetch weather for now</p> : <p>wind {weather.wind.speed} m/s</p>} */}
            </div>
        )
    }

    const showList = (country) => {
        return (
            <p>{country.name.common} <Button handleClick={handleClick} text="show" /></p>
        )
    }

    if (length > 1) {
        return (
            <div>
                {/* <p>{country.name.common} <Button handleClick={handleClick} text="show" /></p> */}
                {show ? showInfo(country) : showList(country)}
            </div>
        )
    }

    return showInfo(country)
}
  
export default Country