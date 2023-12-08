import { useState } from 'react'

import Button from './Button'
import countryService from '../services/countries'


const Country = ({ country, length }) => {

    const [show, setShow] = useState(false)

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