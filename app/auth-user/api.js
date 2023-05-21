// Importing necessary modules and functions.
const config = require('../config') // Configuration file
const store = require('../store') // Store module for storing data

// Function to get user data.
const getUser = function () {
  return $.ajax({
    url: `${config.apiUrl}/user/`, // API endpoint to retrieve user data
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.user.token}` // Authorization token for authentication
    }
  })
}

// Function to create a new user.
const signUp = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/sign-up`, // API endpoint to create a new user
    method: 'POST',
    data: formData // Form data containing user information
  })
}

// Function to sign in as a user.
const signIn = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/sign-in`, // API endpoint to sign in
    method: 'POST',
    data: formData // Form data containing user credentials
  })
}

// Function to sign out the user by deleting the authentication token.
const signOut = function () {
  return $.ajax({
    url: `${config.apiUrl}/sign-out`, // API endpoint to sign out
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.user.token}` // Authorization token for authentication
    }
  })
}

// Function to change the user's password.
const changePassword = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/change-password`, // API endpoint to change the password
    method: 'PATCH',
    data: formData, // Form data containing old and new passwords
    headers: {
      Authorization: `Bearer ${store.user.token}` // Authorization token for authentication
    }
  })
}

module.exports = {
  getUser,
  signUp,
  signIn,
  signOut,
  changePassword
}
