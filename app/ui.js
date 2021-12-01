'use strict'

const store = require('./store')

const signUpSuccess = function () {
  $('#sign-up-message').html(
    '<p>Signed up successfully!</p> <br> <p>Sign In to continue</p>'
  )
  $('#sign-up-message').removeClass()
  $('#sign-up-message').addClass('text-success')
  $('#sign-up-message').fadeOut(5000)

  $('form').trigger('reset')
}

// text response stating failure, addclass text danger (red)
const signUpFailure = function () {
  $('#sign-up-message').text('Sign up failed')
  $('#sign-up-message').removeClass()
  $('#sign-up-message').addClass('text-danger')
  $('#sign-up-message').fadeOut(5000)
}

// hide the sign-in-page section from user's view. show the game-page section
// prevents a refresh of webpage
const signInSuccess = function () {
  $('#sign-in-message').text('Signed in successfully!')
  $('#sign-in-message').removeClass()
  $('#sign-in-message').addClass('text-success')
  $('#sign-in-message').fadeOut(3000)

  $('form').trigger('reset')

  $('#sign-in-page').hide()
  $('#home-page').show()

  $('#home').text('Signed in successfully!')
  $('#home').addClass('text-success')
  $('#home').fadeOut(2000)
}

const signInFailure = function () {
  $('#sign-in-message').text('Sign in failed')
  $('#sign-in-message').removeClass()
  $('#sign-in-message').addClass('text-danger')
  $('#sign-in-message').fadeOut(5000)
}

const resetDisplayProfiles = function () {
  $('#user-tag').text('')
  $('#user-name').text('')
  $('#user-age-gender').text('')
  $('#user-location').text('')
  $('#user-about').text('')
}

const displayProfiles = function (profiles, num) {
  $('#user-tag').text(profiles[num].tag)
  $('#user-name').text(profiles[num].name)
  $('#user-age-gender').text(`${profiles[num].age}, ${profiles[num].gender}`)
  $('#user-location').text(profiles[num].location)
  $('#user-about').text(profiles[num].description)
}

const signOutSuccess = function () {
  $('#settings').hide()
  $('#sign-in-page').show()
  $('#sign-out-message').show()
  $('#sign-out-message').html('<p class=text-success>Signed Out Successfully</p>')
  $('sign-out-message').fadeOut(5000)
}

const signOutFailure = function () {
  $('#sign-out-message').text('Sign out failed')
  $('#sign-out-message').removeClass()
  $('#sign-out-message').addClass('text-danger')
  $('#sign-out-message').fadeOut(5000)
}

const changePasswordSuccess = function () {
  $('#change-password-message').text('Password Changed Successfully!')
  $('#change-password-message').removeClass()
  $('#change-password-message').addClass('text-success')
  $('#change-password-message').fadeOut(5000)

  $('form').trigger('reset')
}

const changePasswordFailure = function () {
  $('#change-password-message').text('Password Change Failed')
  $('#change-password-message').removeClass()
  $('#change-password-message').addClass('text-danger')
  $('#change-password-message').fadeOut(5000)
}

const profilePage = function () {
  $('#settings').hide()
  $('#profile-page').show()
  $('#profile-display-name').val(store.profile[0])
  $('#profile-description').val(store.profile[1])
  $('#profile-location').val(store.profile[2])
  $('#profile-tag').val(store.profile[3])
  $('#profile-age').val(store.profile[4])
  $('#profile-gender').val(store.profile[5])
}

const updateProfileSuccess = function () {
  $('#update-profile-message').text('Profile Updated Successfully!')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-success')
  $('#update-profile-message').fadeOut(5000)
}

const updateProfileFailure = function () {
  $('#update-profile-message').text('Profile Update Failed')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-danger')
  $('#update-profile-message').fadeOut(5000)
}

const settingsPage = function () {
  // $('#settings').hide()
  $('#settings-page').show()
}

const noMoreProfiles = function () {
  console.log('No More Profiles')
  resetDisplayProfiles()
}

const likeOrDislikeMessage = function (likeOrDislike) {
  $('#like-dislike-message').removeClass()
  $('#like-dislike-message').text(`You have ${likeOrDislike} this profile!`)
  $('#like-dislike-message').addClass('text-success')
  $('#like-dislike-message').fadeOut(5000)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  resetDisplayProfiles,
  displayProfiles,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  profilePage,
  settingsPage,
  updateProfileSuccess,
  updateProfileFailure,
  noMoreProfiles,
  likeOrDislikeMessage
}
