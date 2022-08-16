let loginButton = document.getElementById("login")
const url = 'https://real-estate-top-5.herokuapp.com'

loginButton.addEventListener('click', (event) => {
    event.preventDefault();
      const submitUsername = $('#username').val();
      const submitEmail = $('#email').val();
      const submitPassword = $('#password').val();
      loginFunc()
    async function loginFunc() {
        await fetch(`${url}/login`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            'Access-Control-Allow-Origin' : '*'
          },
          redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({username: submitUsername, email : submitEmail, password: submitPassword })
        }).then((data) => {
          const response = data.json()
          return response
        }).then((response) => {
          newData = response.body
          console.log(newData);
          return newData
        })
        return newData
      }
    
    })