'use strict'

const store = require('../store')
const ui = require('../profiles/ui')
const api = require('../auth-user/api')
const authProfileApi = require('../auth-profiles/api')
const shuffle = require('knuth-shuffle').knuthShuffle

let profileNumber = 0
let profileNumberMax
let profilesFiltered

const getUserData = function (userData) {
  const profiles = userData.userProfile
  const filterOwner = profiles.filter(filteredProfiles =>
    filteredProfiles.owner !== store.user._id
  )
  const filterLikes = filterOwner.filter(filteredProfiles =>
    filteredProfiles._id !== store.user.likeOrDislike
  )
  const filterDislikes = filterLikes.filter(filteredProfiles =>
    filteredProfiles._id !== store.user.dislikes
  )
  const filterMatched = filterDislikes.filter(filteredProfiles =>
    filteredProfiles._id !== store.user.matched
  )
  profilesFiltered = shuffle(filterMatched.slice(0))
  store.profileArray = profilesFiltered
  store.profileNumber = profileNumber
  ui.displayProfiles(profilesFiltered, profileNumber)
  profileNumberMax = profilesFiltered.length
  return (profileNumberMax, profilesFiltered)
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
      store.profileNumber = profileNumber
      nextProfile('disliked')
      return profileNumber
    })
    .catch(console.error())
}

const nextProfile = function (likeOrDislike) {
  ui.likeOrDislikeMessage(likeOrDislike)
  isLastProfile()
  authProfileApi.getUserData()
    .then((data) => {
      const profile = data.userProfile
      let profileId
      for (let i = 0; i < profile.length; i++) {
        if (profile[i]._id === store.profile[6]) {
          profileId = profile[i]
          break
        }
      }
      const matchData = [
        profileId.likes,
        profileId.likedBy
      ]
      doesSomebodyLikeMe(matchData)
    })
}

const isLastProfile = function () {
  if (profileNumber >= profileNumberMax) {
    ui.noMoreProfiles()
  } else {
    ui.displayProfiles(profilesFiltered, profileNumber)
  }
}

const doesSomebodyLikeMe = function (matchData) {
  const likes = matchData[0]
  const likedBy = matchData[1]
  const newMatch = []
  const newLikedBy = likedBy
  const newLikes = likes

  if (likes.length === 0) likes.push('')
  if (likedBy.length === 0) likedBy.push('')
  for (let i = 0; i <= likedBy.length; i++) {
    if (likes !== '' && likes.includes(likedBy[i])) {
      newMatch.push(likedBy[i])
      newLikedBy.splice(likedBy.indexOf([i]), 1)
    }
  }
  for (let j = 0; j <= newMatch.length; j++) {
    const k = newMatch[j]
    newLikes.splice(likes.indexOf([k]), 1)
  }
  // match prompt
  if (newMatch[0] !== '' && newMatch.length > 0) {
    authProfileApi.addMatches(newMatch, newLikes, newLikedBy)
      .then(() => {
        for (let i = 0; i < newMatch.length; i++) {
          $('#match-modal').show()
          $('#modal-match-text').text('Congrats, You have matched with somebody!')
        }
        $('#matches-link').show()
      })
  }
}

module.exports = {
  getUserData,
  nextProfile,
  likeProfile,
  dislikeProfile,
  doesSomebodyLikeMe
}
