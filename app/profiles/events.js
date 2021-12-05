'use strict'

const store = require('../store')
const ui = require('../profiles/ui')
const api = require('../auth-user/api')
const authProfileApi = require('../auth-profiles/api')
const shuffle = require('knuth-shuffle').knuthShuffle

let profileNumber = 0
let profileNumberMax
let filteredAndShuffledProfiles

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
  authProfileApi.likeOrDislike(matchData)
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
  const likes = matchData[0]
  const likedBy = matchData[1]
  let match
  const newLikedBy = likedBy
  const newLikes = likes

  if (likes.length === 0) likes.push('')
  if (likedBy.length === 0) likedBy.push('')
  console.log('likedby', likedBy)
  for (let i = 0; i <= likedBy.length; i++) {
    if (likes.includes(likedBy[i])) {
      match.push(likedBy[i])
      newLikedBy.splice(likedBy.indexOf([i]), 1)
    }
  }
  console.log('match', match)
  // for (let j = 0; j <= match.length; j++) {
  //   const k = match[j]
  //   newLikes.splice(likes.indexOf([k]), 1)
  // }
}

// match prompt
// replace old arrays with new arrays in api

module.exports = {
  getUserData,
  nextProfile,
  likeProfile,
  dislikeProfile,
  doesSomebodyLikeMe
}
