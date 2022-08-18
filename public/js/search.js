const searchBtn = document.getElementById('search-addon')
let inputEl = document.getElementById('searchProperty')

// inputEl.addEventListener('keypress', (e) => {
//   if(e.keyCode === 13) {
//     e.preventDefault();
//     console.log("You pressed ENTER.")
//     fetchInfo()
//   }

// })


searchBtn.addEventListener('click', (e) => {
const splitInput = inputEl.value.split(',')
const inputState = splitInput[1];
const inputCity = splitInput[0];
const url = `https://real-estate-top-5.herokuapp.com/api/search/${inputCity}_${inputState}`
  const options = {
    method: 'GET',
    headers: {
      "Content-Type" : "application/json"
    }, 
    }
  //Fetch to rapidapi to mashvisor api
  fetch(`${url}`, options)
    .then((response) => response.json())
    .then((response) => {
      showData(response)

      console.log(response)
    })
    .catch((err) => console.error(err))
  })
//Function to show data with attributes
async function showData(data) {
  data = data.body
  let html = ''

  for (let i = 0; i < 5; i++) {
    let info = data[i]
    let image = info.image
if(info.has_pool == null) { info.has_pool = 'none'}
    html =
      html +
      `<div class='col mb-4'> <div class='card h-100'> <img src="${info.image}" onerror="this.onerror=null;this.src='images/coming_soon.jpeg';" /> <div class='card-body'> <h5 class='card-title'> 
      Address: ${info.address}</h5> 
      <p class='card-text-right'> 
      City: ${info.city}<br>
      Zip Code:${info.zip}<br>
      Listing Price:${info.list_price_formatted}<br>
      Square Ft:${info.sqft}<br>
      Beds:${info.beds}<br>
      Baths:${info.baths}<br>
      AirBnB ROI: ${info.airbnb_ROI}<br>
      Pool:${info.has_pool}<br>
      Days on market:${info.days_on_market}
      </p> </div> </div> </div>`
  }
  document.getElementById('cards').innerHTML = html
}

function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    
    img.onerror = () => {
      callback(false);
    };
  }
}
  



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
