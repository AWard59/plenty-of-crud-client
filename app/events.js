'use strict'

const store = require('./store')
const ui = require('./ui')
const shuffle = require('knuth-shuffle').knuthShuffle

let profileNumber = 0

const setUserData = function (data) {
  const profile = data.user.userProfile[0]
  const profileDisplayName = profile.name
  const profileLocation = profile.location
  const profileDescription = profile.description
  const profileTag = profile.tag
  const profileAge = profile.age
  const profileGender = profile.gender
  const profileId = profile._id
  const profileInfo = [
    profileDisplayName, profileDescription, profileLocation,
    profileTag, profileAge, profileGender, profileId
  ]
  for (let i = 0; i < profileInfo.length; i++) {
    if (profileInfo[i] === undefined) {
      profileInfo[i] = ''
    }
  }
  store.profile = profileInfo
}

const getUserData = function (userData) {
  const profiles = userData.userProfile
  const filterOwner = profiles.filter(filteredProfiles =>
    filteredProfiles.owner !== store.user._id
  )
  const filterAll = filterOwner.filter(filteredProfiles =>
    filteredProfiles._id !== store.user.likes &&
    filteredProfiles._id !== store.user.dislikes
  )
  const filteredAndShuffledProfiles = shuffle(filterAll.slice(0))
  ui.displayProfiles(filteredAndShuffledProfiles, profileNumber)
}

module.exports = {
  setUserData,
  getUserData
}
