import { useState } from 'react' 
import { useEffect } from 'react'
import axios from 'axios'
import SearchResults from './SearchResults'
import CountryDescription from './CountryDescription'

function App() {
  const [search, setSearch] = useState("")
  const [shownCountries, setShownCountries] = useState([])
  const [allCountries, setAllCountries] = useState([]) 
  const [showDescription, setShowDescription] = useState("")

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      setAllCountries(response.data)
      setShownCountries(response.data)
    })  
  }, []) 

  const handleSearch = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)  
    setShownCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase())))
    setShowDescription("")
  }  

  const setDescription = (country) => {
    setShowDescription(country)
  }
  return (
    <>
       <form>
          find countries <input value = {search} onChange = {handleSearch}/>
       </form>  
       <SearchResults countries = {shownCountries} onClick = {setDescription}/>
       {showDescription == "" ? null : <CountryDescription country = {showDescription} />}
    </>
  )
}

export default App
