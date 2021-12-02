'use strict'

// pull the pre-written getFormFields function
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('../profiles/ui')

const onNewProfile = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  api.createProfile(formData)
    .then(ui.updateProfileSuccess)
    .catch(ui.updateProfileFailure)
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
  onNewProfile,
  onUpdateProfile
}
