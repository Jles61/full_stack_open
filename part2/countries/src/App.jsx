import { useState, useEffect } from 'react'

import Filter from './components/Filter'
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
      {console.log(countries)}
      {/* {countries.map()} */}
    </div>
  )
}

export default App