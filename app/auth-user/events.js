'use strict'

// pull the pre-written getFormFields function
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const profileApi = require('../auth-profiles/api')
const ui = require('../user/ui')
const profileUI = require('../profiles/ui')
const userEvents = require('../user/events')
const store = require('../store')
const profileEvents = require('../profiles/events')

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
      store.user = data.user
      let isNew = 'notNew'
      if (data.user.userProfile[0] === undefined) {
        isNew = 'new'
      }
      userEvents.setUserData(data.user, 0)
      onGetUserProfileData()
      ui.signInSuccess(isNew)
    })
    .catch(ui.signInFailure)
}

const onGetUserProfileData = function (num) {
  profileApi.getUserData()
    .then((userData) => profileEvents.getUserData(userData, num))
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

const getUserData = function () {
  api.getUser()
    .then(data => {
      store.user = data.user
    })
    .then(profileUI.profilePage)
}

module.exports = {
  onSignUp,
  onSignIn,
  onGetUserProfileData,
  onSignOut,
  onChangePassword,
  getUserData
}
