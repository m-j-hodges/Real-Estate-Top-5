const searchBtn = document.getElementById("search-addon");
const inputEl = document.getElementById("searchProperty");
const url = "https://api.mashvisor.com/v1.1/client/city/properties/georgia/";

// Not working yet
searchBtn.addEventListener("click", function () {
   let input = inputEl.value;
    fetch(`${url}${input}`, {
        headers: {
            "Access-Control-Allow-Origin": "https://api.mashvisor.com",
            "x-api-key": "e9fc1589-f4cd-49a7-bfbb-b81e88d78837",
        },
        mode: "no-cors"
    })
    .then(data => data.json())
    .then(result => {
        console.log(result);
    })
   console.log(input);
})


