// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authUserEvents = require('./auth-user/events')
const authProfileEvents = require('./auth-profiles/events')
const userEvents = require('./user/events')
const profileEvents = require('./profiles/events')
const profileUI = require('./profiles/ui')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authUserEvents.onSignUp)
  $('#sign-in').on('submit', authUserEvents.onSignIn)
  $('#sign-out').on('click', authUserEvents.onSignOut)
  $('#change-password').on('submit', authUserEvents.onChangePassword)
  $('#profile-link').on('click', profileUI.profilePage)
  $('#settings-link').on('click', profileUI.settingsPage)
  $('#home-link').on('click', profileUI.homePage)
  $('#edit-profile').on('submit', authProfileEvents.onUpdateProfile)
  $('#user-no').on('click', profileEvents.dislikeProfile)
  $('#user-yes').on('click', profileEvents.likeProfile)
  $('#create-new-profile').on('click', authProfileEvents.onNewProfile)
  $('#profile-container').on('click', '.select-profile', userEvents.changeProfile)
  // $('#profile-container').on('click', '.delete-profile', authUserEvents.deleteProfile)
})
