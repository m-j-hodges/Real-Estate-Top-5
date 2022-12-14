

let saveButton = document.getElementById("send-data");
const url = 'https://real-estate-top-5.herokuapp.com'
// let loginButton = document.getElementById("login")
let logoutButton = document.getElementById('logout')
let newData

saveButton.addEventListener("click", async (event) => {
  event.preventDefault();
  let newUserName = $("#username").val();
  let newEmail = $("#email").val();
  let newPassword = $("#password").val();
  let bodyPayload = { username: newUserName, email : newEmail, password : newPassword, isLoggedIn: false }
  //let stringifiedBody = JSON.stringify(bodyPayload)
  // let requestBody = {};
  // requestBody.username = newUserName;
  // requestBody.email = newEmail;
  // requestBody.password = newPassword;

const newResponse = await fetch(`${url}/createUser`, {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type' : 'application/json',
  },
  body: JSON.stringify(bodyPayload)
})
const responseBody = await newResponse.json();
const createUserBtn =  $('#send-data')

if(responseBody.message) {
  console.log(responseBody.message)
  createUserBtn.after(`<p>&#9745; User account created for ${newUserName}</p>`)
  setTimeout(createDelay, 5000)
}
  else {createUserBtn.after(`<p>There was an error creating your account.</p>`)}
}

)

function createDelay() {
  window.location.href = `${window.location.origin}/search`
}

// loginButton.addEventListener('click', (event) => {
// event.preventDefault();
//   const submitUsername = $('#username').val();
//   const submitEmail = $('#email').val();
//   const submitPassword = $('#password').val();
//   loginFunc()
// async function loginFunc() {
//     await fetch(`${url}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type" : "application/json",
//         'Access-Control-Allow-Origin' : '*'
//       },
//       redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify({username: submitUsername, email : submitEmail, password: submitPassword })
//     }).then((data) => {
//       const response = data.json()
//       return response
//     }).then((response) => {
//       newData = response.body
//       console.log(newData);
//       return newData
//     })
//     return newData
//   }

// })

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  const newUserName = $('#username').val()
  const newEmail = $('#email').val()
  const newPassword = $('#password').val()

const bodyPayload = {username: newUserName, email : newEmail, password : newPassword }

logoutFunc()

async function logoutFunc() {
  await fetch()
}

})