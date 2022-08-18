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
      loginFunc()
      })

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
      loginButton.after('<p id="loginMessage">&#x2611; you have been logged in.</p>')
      setTimeout(clearLoginMessage, 3000)
    } else if( responseBody.message) {
      loginInfoIncorrect()
      setTimeout(clearRetryMessage, 3000)
    }
    }

    function clearLoginMessage() {
      const loginMessage = $('#loginMessage')
      loginMessage.hide()
      const origin = window.location.origin
      console.log(origin)
      window.location.href = `${origin}/search`
    }

    function loginInfoIncorrect() {
      const loginButton = $('#login');
      loginButton.after('<p id="retryMessage">&#x2639; The login information entered is incorrect </p>')
      
    }
    function clearRetryMessage() {
      const retryMessage = $('#retryMessage');
      retryMessage.hide()
    }
