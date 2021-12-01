'use strict'

const store = require('./store')
const ui = require('./ui')
const api = require('./auth/api')
const shuffle = require('knuth-shuffle').knuthShuffle

let profileNumber = 0
let profileNumberMax
let filteredAndShuffledProfiles

const setUserData = function (data) {
  // profileNumber = 0
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
  filteredAndShuffledProfiles = shuffle(filterAll.slice(0))
  ui.displayProfiles(filteredAndShuffledProfiles, profileNumber)
  store.profileArray = filteredAndShuffledProfiles
  profileNumberMax = filteredAndShuffledProfiles.length
  return (profileNumberMax, filteredAndShuffledProfiles)
}

const likeProfile = function () {
  const profile = store.profileArray
  const userId = profile[profileNumber]._id
  const matchData = {
    id: userId,
    data: 'Like'
  }
  api.likeOrDislike(matchData)
    .then(() => {
      profileNumber++
      nextProfile('liked')
      return profileNumber
    })
    .catch(console.error())
}

const dislikeProfile = function () {
  const profile = store.profileArray
  const userId = profile[profileNumber]._id
  const matchData = {
    id: userId,
    data: 'Dislike'
  }
  api.likeOrDislike(matchData)
    .then(() => {
      profileNumber++
      nextProfile('disliked')
      return profileNumber
    })
    .catch(console.error())
}

const nextProfile = function (likeOrDislike) {
  console.log(filteredAndShuffledProfiles, profileNumber, profileNumberMax)
  ui.likeOrDislikeMessage(likeOrDislike)
  isLastProfile()
}

const isLastProfile = function () {
  if (profileNumber >= profileNumberMax) {
    ui.noMoreProfiles()
  } else {
    ui.displayProfiles(filteredAndShuffledProfiles, profileNumber)
  }
}

module.exports = {
  setUserData,
  getUserData,
  nextProfile,
  likeProfile,
  dislikeProfile
}
