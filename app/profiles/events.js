'use strict'

const store = require('../store')
const ui = require('../profiles/ui')
const api = require('../auth-user/api')
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
  // const likes = matchData.likes
  // const likedBy = matchData.likedBy
  // let match
  // const newLikedBy = likedBy
  // const newLikes = likes

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

module.exports = {
  getUserData,
  nextProfile,
  likeProfile,
  dislikeProfile,
  doesSomebodyLikeMe
}
