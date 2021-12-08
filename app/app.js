// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authUserEvents = require('./auth-user/events')
const authProfileEvents = require('./auth-profiles/events')
const userEvents = require('./user/events')
const profileEvents = require('./profiles/events')
const profileUI = require('./profiles/ui')
const userUI = require('./user/ui')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up-button').on('click', userUI.signUpDisplay)
  $('#sign-in-button').on('click', userUI.signInDisplay)
  $('#sign-up').on('submit', authUserEvents.onSignUp)
  $('#sign-in').on('submit', authUserEvents.onSignIn)
  $('#sign-out-button').on('click', authUserEvents.onSignOut)
  $('#change-password').on('submit', authUserEvents.onChangePassword)
  $('#profile-link').on('click', profileUI.profilePage)
  $('#settings-link').on('click', profileUI.settingsPage)
  $('#home-link').on('click', profileUI.homePage)
  $('#matches-link').on('click', authProfileEvents.onGetMatches)
  $('#update-profile').on('click', profileUI.enableUpdate)
  $('#create-profile').on('click', profileUI.enableCreate)
  $('#edit-profile-container').on('submit', '.update-profile', authProfileEvents.onUpdateProfile)
  $('#edit-profile-container').on('submit', '.create-profile', authProfileEvents.onNewProfile)
  $('#user-no').on('click', profileEvents.dislikeProfile)
  $('#user-yes').on('click', profileEvents.likeProfile)
  $('#profile-container').on('click', '.select-profile', userEvents.changeProfile)
  $('#profile-container').on('click', '.delete-profile', authProfileEvents.onDeleteProfile)
  $('#modal-match-matches').on('click', authProfileEvents.onGetMatches)
  $('.modal-exit').on('click', profileUI.modalClose)
})
