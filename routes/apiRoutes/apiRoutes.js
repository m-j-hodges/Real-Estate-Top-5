const router = require("express").Router()
const fetch = require('node-fetch')
const fs = require('fs')


router.get('/search', (req,res) => {
  let city
  let state
  let searchResult
  try{
  if(req.body.searchCity || req.body.searchState) {
    city = req.body.searchCity;
    state = req.body.searchState;
  if(state && city) {
newFetch(state,city)
.then( (data) =>{
if(data.content) {
  searchResult = data.content.properties
  searchResult = searchResult.splice(0,5)
}
  if(searchResult) {
    res.status(200).json({message: 'successful', body: searchResult})
  }
})} else {
  console.log(`Your API request could not be completed.`)
  res.status(500).render('errorSearch') // Please insert Handlbars partial here for what we want to show with an error in the search.
  res.end()
}

} else {res.json({message: `There was an error completing your search.`})}

} catch (err) {
  console.log(err)
  res.status(500).json({message: `your search could not be completed.`})
}

})

async function newFetch(state,city) {
  const newSearch = await fetch(`https://api.mashvisor.com/v1.1/client/city/properties/${state}/${city}`, {
    method: 'GET',
    headers: {
      'x-api-key' : `${process.env.apiKey}`
    }})
const data = await newSearch.json()
console.log(data)
return data
}


 



module.exports = router;