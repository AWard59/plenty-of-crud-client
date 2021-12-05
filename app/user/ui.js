'use strict'

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
const signInSuccess = function (isNew) {
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

  if (isNew === 'new') {
    $('#edit-profile').addClass('create-profile')
    $('#update-profile').hide()
    $('#create-profile').hide()
  }
}

const signInFailure = function () {
  $('#sign-in-message').text('Sign in failed')
  $('#sign-in-message').removeClass()
  $('#sign-in-message').addClass('text-danger')
  $('#sign-in-message').fadeOut(5000)
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

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
