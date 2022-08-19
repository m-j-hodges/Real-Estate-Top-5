window.onload = async (event) => {

url = `https://real-estate-top-5.herokuapp.com`
const response = await fetch(`${url}/logout`, {
  method: "POST", 
  headers: { 'Content-Type' : 'application/json'},
  body: req.session.id,
})
const responseBody = await response.json();
if(responseBody.message) {
  const confMsg = document.getElementById('deletedMsg')
  confMsg.after('<p>&#9745Your logout has been confirmed.<p>')
  setTimeout(reloadPage, 5000)
}

}

function reloadPage() {

  window.location.href = `${window.location.origin}/login`
}