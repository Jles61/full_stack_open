const Country = ({ country, length }) => {
    if (length > 1) {
        return (
            <div>
                <p>{country.name.common}</p>
            </div>
        )
    }
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
  
export default Country