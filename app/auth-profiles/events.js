'use strict'

// pull the pre-written getFormFields function
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('../profiles/ui')
const authUserEvents = require('../auth-user/events')
const store = require('../store')

const onNewProfile = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.createProfile(formData)
    .then(() => {
      authUserEvents.getUserData()
      ui.createProfileSuccess()
    })
    .catch(ui.createProfileFailure)
}

const onUpdateProfile = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.updateProfile(formData)
    .then(() => {
      const profile = formData.userProfile
      const profileDisplayName = profile.name
      const profileLocation = profile.location
      const profileDescription = profile.description
      const profileTag = profile.tag
      const profileAge = parseInt(profile.age)
      const profileGender = profile.gender
      const profileId = store.profile[6]
      const profileInfo = [
        profileDisplayName, profileDescription, profileLocation,
        profileTag, profileAge, profileGender, profileId
      ]
      store.profile = profileInfo
    })
    .then(() => {
      authUserEvents.getUserData()
      ui.updateProfileSuccess()
    })
    .catch(ui.updateProfileFailure)
}

const onDeleteProfile = function (event) {
  event.preventDefault()
  const profileID = $(event.target).data('id')

  api.deleteProfile(profileID)
    .then(() => {
      authUserEvents.getUserData()
      ui.deleteProfileSuccess()
    })
    .catch(ui.deleteProfileFailure)
}

module.exports = {
  onNewProfile,
  onUpdateProfile,
  onDeleteProfile
}
