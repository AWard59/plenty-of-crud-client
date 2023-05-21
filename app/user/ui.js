'use strict'

// Show sign-up section, hide sign-in section
const signUpDisplay = function () {
  $('#sign-in').hide()
  $('#sign-up').show()
}

// Show sign-in section, hide sign-up section
const signInDisplay = function () {
  $('#sign-up').hide()
  $('#sign-in').show()
}

// Display sign-up success message
const signUpSuccess = function () {
  $('#sign-up-message').html(
    '<p>Signed up successfully!</p> <br> <p>Sign In to continue</p>'
  )
  $('#sign-up-message').removeClass()
  $('#sign-up-message').addClass('text-success')
  $('#sign-up-message').fadeOut(5000)

  $('form').trigger('reset')
  signInDisplay()
}

// Display sign-up failure message
const signUpFailure = function () {
  $('#sign-up-message').text('Sign up failed')
  $('#sign-up-message').removeClass()
  $('#sign-up-message').addClass('text-danger')
  $('#sign-up-message').fadeOut(5000)
}

// Display sign-in success message and navigate to the home page
const signInSuccess = function (isNew) {
  $('#sign-in-message').text('Signed in successfully!')
  $('#sign-in-message').removeClass()
  $('#sign-in-message').addClass('text-success')
  $('#sign-in-message').fadeOut(3000)
  $('form').trigger('reset')

  $('#sign-in-page').hide()
  $('.navbar').show()
  $('#home-page').show()
  $('#home').text('Signed in successfully!')
  $('#home').addClass('text-success')
  $('#home').fadeOut(2000)

  if (isNew === 'new') {
    $('.navbar').hide()
    $('#home-page').hide()
    $('#edit-profile').addClass('create-profile')
    $('#update-profile').hide()
    $('#create-profile').hide()
  }
}

// Display sign-in failure message
const signInFailure = function () {
  $('#sign-in-message').text('Sign in failed')
  $('#sign-in-message').removeClass()
  $('#sign-in-message').addClass('text-danger')
  $('#sign-in-message').fadeOut(5000)
}

// Perform sign-out success actions
const signOutSuccess = function () {
  $('#settings-page').hide()
  $('.navbar').hide()
  $('#sign-in-page').show()
  $('#sign-out-message').show()
  $('#sign-out-message').html(
    '<p class=text-success>Signed Out Successfully</p>'
  )
  $('sign-out-message').fadeOut(5000)
}

// Display sign-out failure message
const signOutFailure = function () {
  $('#sign-out-message').text('Sign out failed')
  $('#sign-out-message').removeClass()
  $('#sign-out-message').addClass('text-danger')
  $('#sign-out-message').fadeOut(5000)
}

// Display change password success message
const changePasswordSuccess = function () {
  $('#change-password-message').text('Password Changed Successfully!')
  $('#change-password-message').removeClass()
  $('#change-password-message').addClass('text-success')
  $('#change-password-message').fadeOut(5000)

  $('form').trigger('reset')
}

// Display change password failure message
const changePasswordFailure = function () {
  $('#change-password-message').text('Password Change Failed')
  $('#change-password-message').removeClass()
  $('#change-password-message').addClass('text-danger')
  $('#change-password-message').fadeOut(5000)
}

module.exports = {
  signUpDisplay,
  signInDisplay,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
