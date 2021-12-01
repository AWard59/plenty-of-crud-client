// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const events = require('./events')
const ui = require('./ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#profile-link').on('click', ui.profilePage)
  $('#settings-link').on('click', ui.settingsPage)
  $('#edit-profile').on('submit', authEvents.onUpdateProfile)
  $('#user-no').on('click', events.dislikeProfile)
  $('#user-yes').on('click', events.likeProfile)
})
