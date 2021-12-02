'use strict'

const store = require('./store')
const ui = require('./ui')
const api = require('./auth/api')
const shuffle = require('knuth-shuffle').knuthShuffle

let profileNumber = 0
let profileNumberMax
let filteredAndShuffledProfiles

const setUserData = function (data, num) {
  const profile = data.userProfile[num]
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
  const likes = profile.likes
  const likedBy = profile.likedBy
  const matchData = [
    likes, likedBy
  ]
  doesSomebodyLikeMe(matchData)
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

const doesSomebodyLikeMe = function (matchData) {
  const likes = matchData.likes
  const likedBy = matchData.likedBy
  let match
  const newLikedBy = likedBy
  const newLikes = likes

  // for (let i = 0; i <= likedBy.length; i++) {
  //   if (likes.includes(likedBy[i])) {
  //     match.push(likedBy[i])
  //     newLikedBy.splice(likedBy.indexOf([i]), 1)
  //   }
  // }
  // for (let i = 0; i <= likes.length; i++) {
  //   if (match.includes(likes[i])) {
  //     newLikes.splice(likes.indexOf([i]), 1)
  //   }
  // }

  // match prompt
  // replace old arrays with new arrays in api
}

const changeProfile = function (event) {
  event.preventDefault()
  const profileIndex = $(event.target).data('index')
  setUserData(store.user, profileIndex)
  console.log(store)
  ui.profilePage()
}

module.exports = {
  setUserData,
  getUserData,
  nextProfile,
  likeProfile,
  dislikeProfile,
  changeProfile
}
