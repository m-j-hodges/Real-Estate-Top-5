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
      'x-api-key' : 'e9fc1589-f4cd-49a7-bfbb-b81e88d78837'
    }})
const data = await newSearch.json()
console.log(data)
return data
}

//     .then((response) => {
//       console.log(response.status)
//       response.body.readable
//      const readable = response.body
//       const results = readable.on('readable', () => {
//         let chunk;
//         console.log('Stream is readable (new data received)');
//         while(null !==(chunk = readable.read())) {
//           console.log(`read ${chunk.length} bytes of data..`)
//         }
//       })
//       .on('end', (chunk) => {
//         console.log(`Reached end of stream.`)
//         searchResult = chunk
//         res.json({message: `Response received from server.`})
//       })
//     })
//   }


 

// })




module.exports = router;