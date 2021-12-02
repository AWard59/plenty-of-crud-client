'use strict'

// pull the pre-written getFormFields function
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('../user/ui')
const events = require('../user/events')
const store = require('../store')

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
    .then(data => {
      events.setUserData(data.user, 0)
      store.user = data.user
      // store.userProfile = data.user.userProfile[0]
      ui.signInSuccess()
      onGetUserData(data, 0)
    })
    .catch(ui.signInFailure)
}

const onGetUserData = function () {
  api.getUserData()
    .then(userData => events.getUserData(userData))
}

const onSignOut = function () {
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.changePassword(formData)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword
}
