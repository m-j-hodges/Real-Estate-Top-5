const withAuth = (req, res, next) => {
  //if the user is not logged in, redirect the request to the login route
  if (!req.session.id) {
    res.redirect('login')
  } else {
    next()
  }
}

module.exports = withAuth
