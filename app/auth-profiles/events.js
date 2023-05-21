'use strict'

// Importing necessary modules and functions.
const getFormFields = require('../../lib/get-form-fields') // Function to get form fields.
const api = require('./api') // Importing the API module for making API requests.
const ui = require('../profiles/ui') // Importing the UI module for displaying UI elements.
const authUserEvents = require('../auth-user/events') // Importing the events module for user authentication.
const store = require('../store') // Importing the store module for storing data.

// Event handler for creating a new user profile.
const onNewProfile = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form) // Extracting form data using the getFormFields function.

  api
    .createProfile(formData) // Making an API request to create a new profile.
    .then(onUpdateFirstProfile) // After successful profile creation, update the first profile.
    .then(() => {
      ui.createProfileSuccess() // Display success message on the UI.
      setTimeout(() => {
        authUserEvents.getUserData() // Retrieve user data after a short delay to ensure profile data is updated.
      }, 1500)
    })
    .catch(ui.createProfileFailure) // Display error message on the UI in case of failure.
}

// Event handler for updating a user profile.
const onUpdateProfile = function (event) {
  if (store.profile === undefined) {
    onUpdateFirstProfile() // If no profile exists, update the first profile.
  } else {
    event.preventDefault()
    const form = event.target
    const formData = getFormFields(form) // Extracting form data using the getFormFields function.

    api
      .updateProfile(formData) // Making an API request to update the user profile.
      .then(() => {
        const profile = formData.userProfile
        const profileDisplayName = profile.name
        const profileLocation = profile.location
        const profileDescription = profile.description
        const profileTag = profile.tag
        const profileAge = parseInt(profile.age)
        const profileGender = profile.gender
        const profileId = store.profile[6]
        const profileImg = store.profile[7]
        const profileInfo = [
          profileDisplayName,
          profileDescription,
          profileLocation,
          profileTag,
          profileAge,
          profileGender,
          profileId,
          profileImg
        ]
        store.profile = profileInfo // Update the profile information in the store.
      })
      .then(() => {
        authUserEvents.getUserData() // Retrieve user data to ensure profile data is updated.
        ui.updateProfileSuccess() // Display success message on the UI.
      })
      .catch(ui.updateProfileFailure) // Display error message on the UI in case of failure.
  }
}

// Function to update the first profile.
const onUpdateFirstProfile = function () {
  console.log('first', store)
  const profile = store.userProfile
  const profileDisplayName = profile.name
  const profileLocation = profile.location
  const profileDescription = profile.description
  const profileTag = profile.tag
  const profileAge = parseInt(profile.age)
  const profileGender = profile.gender
  const profileId = store.profile[6]
  const profileImg = store.profile[7]
  const profileInfo = [
    profileDisplayName,
    profileDescription,
    profileLocation,
    profileTag,
    profileAge,
    profileGender,
    profileId,
    profileImg
  ]
  store.profile = profileInfo // Update the profile information in the store.
  // ui.profilePage()
}

// Event handler for deleting a user profile.
const onDeleteProfile = function (event) {
  event.preventDefault()
  const profileID = $(event.target).data('id') // Extracting the profile ID from the event target.

  api
    .deleteProfile(profileID) // Making an API request to delete the user profile.
    .then(() => {
      authUserEvents.getUserData() // Retrieve user data to ensure profile data is updated.
      ui.deleteProfileSuccess() // Display success message on the UI.
    })
    .catch(ui.deleteProfileFailure) // Display error message on the UI in case of failure.
}

// Event handler for getting the user's matches.
const onGetMatches = function () {
  api.getMatches().then((data) => {
    const filterNull = data.matches.filter(
      (filteredMatches) => filteredMatches !== null
    )
    const uniqueMatches = [...new Set(filterNull)]
    const filteredArray = []
    for (let i = 0; i < uniqueMatches.length; i++) {
      if (uniqueMatches[i].length === 24) {
        filteredArray.push(uniqueMatches[i])
      }
    }
    getMatchesData(filteredArray) // Retrieve and display match data.
  })
}

// Function to retrieve match data for multiple matches.
const getMatchesData = async function (matchData) {
  const userMatchData = []
  for (let i = 0; i < matchData.length; i++) {
    await api.getMatchProfileData(matchData[i]).then((returnUser) => {
      userMatchData[i] = returnUser
    })
  }
  ui.displayMultipleMatches(userMatchData) // Display multiple match profiles on the UI.
  ui.matchesPage() // Display the matches page.
}

module.exports = {
  onNewProfile,
  onUpdateProfile,
  onUpdateFirstProfile,
  onDeleteProfile,
  onGetMatches
}
