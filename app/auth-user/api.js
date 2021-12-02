const config = require('../config')
const store = require('../store')

// using formData from events.js, make POST request to api to create a new user object
// return result
const signUp = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/sign-up`,
    method: 'POST',
    data: formData
  })
}

const signIn = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/sign-in`,
    method: 'POST',
    data: formData
  })
}

const getUserData = function () {
  return $.ajax({
    url: `${config.apiUrl}/userProfile`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

// Token needs to be the same as the token created when logging in
// delete that token - requiring user to sign in again for access
const signOut = function () {
  return $.ajax({
    url: `${config.apiUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const changePassword = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/change-password`,
    method: 'PATCH',
    data: formData,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

module.exports = {
  signUp,
  signIn,
  getUserData,
  signOut,
  changePassword
}
