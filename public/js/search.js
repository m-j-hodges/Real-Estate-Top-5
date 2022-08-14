const searchBtn = document.getElementById('search-addon')
const inputEl = document.getElementById('searchProperty')
const url = 'https://api.mashvisor.com/v1.1/client/city/properties/GA/'

// const axios = require('axios')

// // Make a request for a user with a given ID
// axios
//   .get('/Atlanta')
//   .then(function (response) {
//     // handle success
//     console.log(response)
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error)
//   })
//   .then(function () {
//     // always executed
//   })

// Not working yet
searchBtn.addEventListener('click', function () {
  let input = inputEl.value

  // fetch(`${url}${input}`, {
  //   headers: {
  //     'Access-Control-Allow-Origin': 'https://api.mashvisor.com',
  //     'x-api-key': 'f206ffc1-0ffa-4f45-b13c-826b47e7b298',
  //   },
  //   accept: '*/*',
  //   mode: 'no-cors',
  //   credentials: 'include',
  //   connection: 'keep-alive',
  // })
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((data) => {
  //     console.log(data)
  //   })

  fetch(`${url}${input}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'x-api-key': 'f206ffc1-0ffa-4f45-b13c-826b47e7b298',
    },
    accept: '*/*',
    credentials: 'include',
    connection: 'keep-alive',
  })
    .then((response) => {
      console.log(`${url}${input}`)
      console.log(response)
      return response.json()
    })
    .then((data) => {
      console.log(data)
    })
  //new comment
  console.log(input)
})
