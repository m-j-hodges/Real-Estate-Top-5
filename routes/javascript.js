let saveButton = document.getElementById("send-data");

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

await fetch('http://localhost:3001/createUser', {
  method: 'POST',
  headers: {
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : '*'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(bodyPayload)
})
.then((data) => console.log(data));
  

})