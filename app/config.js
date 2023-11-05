let apiUrl
const apiUrls = {
  production: 'https://plenty-of-crud.cyclic.app', // Production API URL
  // production: 'https://plenty-of-crud.herokuapp.com', // Production API URL
  development: 'http://localhost:4741' // Development API URL
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
