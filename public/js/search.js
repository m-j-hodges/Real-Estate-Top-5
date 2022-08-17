const searchBtn = document.getElementById("search-addon");
const inputEl = document.getElementById("searchProperty");
const url = "https://api.mashvisor.com/v1.1/client/city/properties/ga/";



// Not working yet
searchBtn.addEventListener("click", function () {
   let input = inputEl.value;





    fetch(`${url}${input}`, {
        headers: {
            "Access-Control-Allow-Origin": "https://api.mashvisor.com",
            "x-api-key": "f206ffc1-0ffa-4f45-b13c-826b47e7b298",
        },
        accept: "*/*",
        mode: "no-cors",
        credentials: 'include',
        connection: "keep-alive"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
   console.log(input);
})


