'use strict'

// pull the pre-written getFormFields function
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')
const events = require('../events')
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
      events.setUserData(data)
      store.user = data.user
      store.userProfile = data.user.userProfile[0]
      console.log(store)
      ui.signInSuccess()
    })
    .catch(ui.signInFailure)
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

const onUpdateProfile = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.updateProfile(formData)
    .then(ui.updateProfileSuccess)
    .catch(ui.updateProfileFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onUpdateProfile
}
