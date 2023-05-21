'use strict'

// Importing necessary modules and functions.
const getFormFields = require('../../lib/get-form-fields') // Function to extract form fields
const api = require('./api') // API module for user authentication
const profileApi = require('../auth-profiles/api') // API module for user profiles
const ui = require('../user/ui') // UI module for user-related UI functions
const profileUI = require('../profiles/ui') // UI module for profile-related UI functions
const userEvents = require('../user/events') // Event module for user-related events
const store = require('../store') // Store module for storing data
const profileEvents = require('../profiles/events') // Event module for profile-related events

// Event handler for user sign-up
const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form) // Extract form fields using the getFormFields function

  api
    .signUp(formData) // Call the signUp function from the API module
    .then(ui.signUpSuccess) // Display sign-up success message on the UI
    .catch(ui.signUpFailure) // Display sign-up failure message on the UI
}

// Event handler for user sign-in
const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form) // Extract form fields using the getFormFields function

  api
    .signIn(formData) // Call the signIn function from the API module
    .then((data) => {
      store.user = data.user // Store user data in the store module
      let isNew = 'notNew'
      if (data.user.userProfile[0] === undefined) {
        isNew = 'new'
      }
      userEvents.setUserData(data.user, 0) // Set user data and profile data
      onGetUserProfileData() // Get user profile data
      ui.signInSuccess(isNew) // Display sign-in success message on the UI
    })
    .catch(ui.signInFailure) // Display sign-in failure message on the UI
}

// Function to get user profile data
const onGetUserProfileData = function (num) {
  profileApi
    .getUserData()
    .then((userData) => profileEvents.getUserData(userData, num)) // Call the getUserData function from the profile events module
}

// Event handler for user sign-out
const onSignOut = function () {
  api
    .signOut() // Call the signOut function from the API module
    .then(ui.signOutSuccess) // Display sign-out success message on the UI
    .catch(ui.signOutFailure) // Display sign-out failure message on the UI
}

// Event handler for changing user password
const onChangePassword = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form) // Extract form fields using the getFormFields function

  api
    .changePassword(formData) // Call the changePassword function from the API module
    .then(ui.changePasswordSuccess) // Display password change success message on the UI
    .catch(ui.changePasswordFailure) // Display password change failure message on the UI
}

// Function to get user data
const getUserData = function () {
  api
    .getUser()
    .then((data) => {
      store.user = data.user // Store user data in the store module
    })
    .then(profileUI.profilePage) // Display the profile page on the UI
}

module.exports = {
  onSignUp,
  onSignIn,
  onGetUserProfileData,
  onSignOut,
  onChangePassword,
  getUserData
}
