

const searchBtn = document.getElementById('search-addon')
let inputEl = document.getElementById('searchProperty')


let logoutBtn = document.getElementsByClassName('text-dark')
let recentSearches = document.getElementById('recentSearches')

window.onload = () => {
  if(localStorage.getItem('search1')) {
    const recentSearch = localStorage.getItem('search1')
    const parsedRecentSearch = JSON.parse(recentSearch)

    parsedRecentSearch.forEach(el => {
      $(`.centerInput`).after(`<h3>${el}</h3>`)

    })
    
  
  }
  

}


// inputEl.addEventListener('keypress', (e) => {
//   if(e.keyCode === 13) {
//     e.preventDefault();
//     console.log("You pressed ENTER.")
//     fetchInfo()
//   }

// })


searchBtn.addEventListener('click', (e) => {
  const splitInput = inputEl.value.split(',')
  const inputState = splitInput[1]
  const inputCity = splitInput[0]
  const url = `https://real-estate-top-5.herokuapp.com/api/search/${inputCity}_${inputState}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  //Fetch to mashvisor api to pull top properties.
  fetch(`${url}`, options)
    .then((response) => response.json())
    .then((response) => {
      showData(response)

      console.log(response.body)
    })
    .catch((err) => console.error(err))
})
var list = []
//Function to show data with attributes
async function showData(data) {
  data = data.body
  list = data
  let html = ''
//put LocalStorage code here.
let cities = []
let getStorage = JSON.parse(localStorage.getItem('search1'))

const searchField = document.getElementById('searchProperty').value
cities.push(searchField)
const newStorage = JSON.stringify(cities)
localStorage.setItem('search1', newStorage)


  for (let i = 0; i < 5; i++) {
    var info = data[i]
    let image = info.image
    if (info.has_pool == null) {
      info.has_pool = 'none'
    }
    html =
      html +
      `<div id="${i}" class='col mb-4' onclick='opendetail(this.id)'> <div class='card h-100'> <img src="${info.image}" onerror="this.onerror=null;this.src='images/coming_soon.jpeg';" /> <div class='card-body'> <h5 class='card-title'> 
      <b>Address: </b>  ${info.address} </h5> 
    <p class='card-text-right'> 
    <b>City:  </b> ${info.city} <br>
    <b>State:  </b>  ${info.state} <br>
    <b>Zip Code:  </b> ${info.zip}<br>
    <b>Listing Price:  </b> ${info.list_price_formatted}<br>
    <b>Square Ft: </b> ${info.sqft}<br>
    </p> </div> </div> </div>`
  }

  document.getElementById('cards').innerHTML = html
}

//function to display detail about property when property card is clicked on from search results
function opendetail(i) {
  document.getElementById('searchholder').style.display = 'none'
  document.getElementById('propertydetail').style.display = 'block'
  //writes json data to console log.
  console.log(list[i])
  let info = list[i]
  let html = `<div class='card mb-3 pcard'>
<img class='card-img-top pimg' src='${info.image}'onerror="this.onerror=null;this.src='images/coming_soon.jpeg';" alt='Card image cap'>
<div class='card-body'>
 <h5 class='card-title'><b>Address:</b> ${info.address}</h5>
 <p class='card-text'><b>City:</b> ${info.city},  ${info.state}  <b>Zip Code:</b>   ${info.zip}<br>
 <b>Neighborhood:</b> ${info.neighborhood}<br>
 <b>MLS ID:</b> ${info.mls_id}
 <b>Listing Price:</b> ${info.list_price_formatted}<br>
 <b>Type:</b>  ${info.type}<br>
 <b>Square Ft:</b>  ${info.sqft}  <b>Price per sqft:</b>  ${info.price_per_sqft}<br>
 <b>Beds:</b>  ${info.beds}   <b>Baths:</b>  ${info.baths}  <b>Pool:</b>  ${info.has_pool}<br>
 <b>Cap Rate:</b>  (<b>AirBnB:</b> ${info.airbnb_cap}  <b>Traditional:</b>  ${info.traditional_cap})<br>
 <b>AirBnB Rental:</b>  $${info.airbnb_rental}   <b>AirBnB ROI:</b>  $${info.airbnb_ROI}<br>
 <b>Traditional Rental:</b>  $${info.traditional_rental}   <b>Traditional ROI:</b>  $${info.traditional_ROI}<br>
 <b>Days on market:</b>  ${info.days_on_market}</p>
</div>
</div>
`
  document.getElementById('propertyInfo').innerHTML = html
}
//function that closes property information page and goes back to search results.
function closedetail() {
  document.getElementById('searchholder').style.display = 'block'
  document.getElementById('propertydetail').style.display = 'none'
}
//function that verifies that an image exists from the json data, if no photo is available shows a stock image of a house.
function checkIfImageExists(url, callback) {
  const img = new Image()
  img.src = url

  if (img.complete) {
    callback(true)
  } else {
    img.onload = () => {
      callback(true)
    }

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
