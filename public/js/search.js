const searchBtn = document.getElementById('search-addon')
const inputEl = document.getElementById('searchProperty')
// const url = 'https://api.mashvisor.com/v1.1/client/city/properties/GA/'
const url = 'https://mashvisor-api.p.rapidapi.com/city/properties/GA/Atlanta'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '0af9b30551msh4f1b4f215df9640p10d116jsn07fcc8f449ab',
    'X-RapidAPI-Host': 'mashvisor-api.p.rapidapi.com',
  },
}

fetch(`${url}`, options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err))

// Not working yet
// searchBtn.addEventListener('click', function () {
//   let input = inputEl.value

//   fetch(`${url}${input}`, {
//       headers: {
//         'X-RapidAPI-Key': '0af9b30551msh4f1b4f215df9640p10d116jsn07fcc8f449ab',
//         'X-RapidAPI-Host': 'mashvisor-api.p.rapidapi.com',
//         'Access-Control-Allow-Origin': '*',
//         // 'x-api-key': 'f206ffc1-0ffa-4f45-b13c-826b47e7b298',
//       }
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err))

//   // fetch(`${url}${input}`, {
//   //   headers: {
//   //     'Access-Control-Allow-Origin': 'https://api.mashvisor.com',
//   //     'x-api-key': 'f206ffc1-0ffa-4f45-b13c-826b47e7b298',
//   //   },
//   //   accept: '*/*',
//   //   mode: 'no-cors',
//   //   credentials: 'include',
//   //   connection: 'keep-alive',
//   // })
//   //   .then((response) => {
//   //     return response.json()
//   //   })
//   //   .then((data) => {
//   //     console.log(data)
//   //   })

//   // fetch(`${url}${input}`, {
//   //   headers: {
//   //     'X-RapidAPI-Key': '0af9b30551msh4f1b4f215df9640p10d116jsn07fcc8f449ab',
//   //     'X-RapidAPI-Host': 'mashvisor-api.p.rapidapi.com',
//   //     'Access-Control-Allow-Origin': '*',
//   //     // 'x-api-key': 'f206ffc1-0ffa-4f45-b13c-826b47e7b298',
//   //   },
//   //   accept: '*/*',
//   //   credentials: 'include',
//   //   connection: 'keep-alive',
//   // })
//   //   .then((response) => {
//   //     console.log(`${url}${input}`)
//   //     console.log(response)
//   //     return response.json()
//   //   })
//   //   .then((data) => {
//   //     console.log(data)
//   //   })
//   // //new comment
//   // console.log(input)
// })
