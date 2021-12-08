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

  api
    .createProfile(formData)
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

  api
    .updateProfile(formData)
    .then(() => {
      const profile = formData.userProfile
      const profileDisplayName = profile.name
      const profileLocation = profile.location
      const profileDescription = profile.description
      const profileTag = profile.tag
      const profileAge = parseInt(profile.age)
      const profileGender = profile.gender
      const profileId = store.profile[6]
      const profileImg = store.profile[7]
      const profileInfo = [
        profileDisplayName,
        profileDescription,
        profileLocation,
        profileTag,
        profileAge,
        profileGender,
        profileId,
        profileImg
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

  api
    .deleteProfile(profileID)
    .then(() => {
      authUserEvents.getUserData()
      ui.deleteProfileSuccess()
    })
    .catch(ui.deleteProfileFailure)
}

const onGetMatches = function () {
  api.getMatches()
    .then((data) => {
      const filterNull = data.matches.filter(
        (filteredMatches) => filteredMatches !== null
      )
      const uniqueMatches = [...new Set(filterNull)]
      const filteredArray = []
      for (let i = 0; i < uniqueMatches.length; i++) {
        if (uniqueMatches[i].length === 24) {
          filteredArray.push(uniqueMatches[i])
        }
      }
      getMatchesData(filteredArray)
    })
}

const getMatchesData = async function (matchData) {
  const userMatchData = []
  for (let i = 0; i < matchData.length; i++) {
    await api.getMatchProfileData(matchData[i]).then((returnUser) => {
      userMatchData[i] = returnUser
    })
  }
  ui.displayMultipleMatches(userMatchData)
  ui.matchesPage()
}

module.exports = {
  onNewProfile,
  onUpdateProfile,
  onDeleteProfile,
  onGetMatches
}
