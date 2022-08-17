



let loginButton = document.getElementById("login")
const url = 'https://real-estate-top-5.herokuapp.com'
let submitUsername
let submitEmail
let submitPassword
loginButton.addEventListener('click', (event) => {
    event.preventDefault();
      submitUsername = $('#username').val();
      submitEmail = $('#email').val();
      submitPassword = $('#password').val();
      loginFunc()})

    async function loginFunc() {
       const res = await fetch(`${url}/login`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
        body: JSON.stringify({username: submitUsername, email : submitEmail, password: submitPassword })
      })
      const responseBody = await res.json()
    console.log(responseBody)
    if(responseBody.loggedIn)
    {
      console.log("You have successfully been logged into the Server.")
      const loginButton = $('#login')
      loginButton.after('<p id="loginMessage"> you have been logged in.</p>')
      setTimeout(clearLoginMessage, 5000)
      window.location.href = `${url}/search`
    } else if( responseBody.message) {
      loginInfoIncorrect()
      setTimeout(clearRetryMessage, 5000)
    }
    }

    function clearLoginMessage() {
      const loginMessage = $('#loginMessage')
      loginMessage.hide()
    }

    function loginInfoIncorrect() {
      const loginButton = $('#login');
      loginButton.after('<p id="retryMessage"> The login information entered is incorrect </p>')
      
    }
    function clearRetryMessage() {
      const retryMessage = $('#retryMessage');
      retryMessage.hide()
    }
