import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Country from './components/Country'
import countryService from './services/countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    countryService.getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }

  useEffect(hook, [])

  const countriesSelected = filter == '' ? [] : countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  // const countriesToShow = countriesSelected > 10 ? 'Too many matches, specify another filter' : countriesSelected

  // useEffect(() => {
  //   console.log('effect run, countries found', countries)

  //   // skip if country is not defined
  //   if (countries) {
  //     console.log('fetching countries...')
  //     countryService
  //       .getAll()
  //       .then(response => {
  //         setCountries(response.data.rates)
  //       })
  //   }
  // }, [countries])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      {countriesSelected.length > 10 ? <p>Too many matches, specify another filter</p> : countriesSelected.map(
        country => <Country 
          key={country.name.official} 
          country={country} 
          length={countriesSelected.length} />
      )}
    </div>
  )
}

export default App