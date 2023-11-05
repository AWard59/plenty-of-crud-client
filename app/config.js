let apiUrl // Declare apiUrl variable

const apiUrls = {
  production: 'https://plenty-of-crud.cyclic.app', // Production API URL
  // production: 'https://plenty-of-crud.herokuapp.com', // Production API URL
  development: 'http://localhost:4741' // Development API URL
}

if (window.location.hostname === 'localhost') {
  // Check if the hostname is localhost
  apiUrl = apiUrls.development // Set apiUrl to development URL
} else {
  apiUrl = apiUrls.production // Set apiUrl to production URL
}

module.exports = {
  apiUrl // Export the apiUrl variable
}
