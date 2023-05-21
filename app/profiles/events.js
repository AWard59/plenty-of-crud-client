'use strict'

// Importing necessary modules and functions
const store = require('../store') // Store module for storing data
const ui = require('../profiles/ui') // UI module for profile-related UI functions
const api = require('../auth-user/api') // API module for user authentication
const authProfileApi = require('../auth-profiles/api') // API module for user profiles
const shuffle = require('knuth-shuffle').knuthShuffle // Shuffle function for array randomization

let profileNumber = 0 // Counter for the current profile being displayed
let profileNumberMax // Maximum number of profiles
let profilesFiltered // Filtered array of profiles

// Function to get user profile data and filter out profiles
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
  profilesFiltered = shuffle(filterMatched.slice(0)) // Randomize and store the filtered profiles
  store.profileArray = profilesFiltered
  store.profileNumber = profileNumber
  ui.displayProfiles(profilesFiltered, profileNumber) // Display the profiles on the UI
  profileNumberMax = profilesFiltered.length
  return (profileNumberMax, profilesFiltered)
}

// Function to like a profile
const likeProfile = function () {
  const profile = store.profileArray
  const userId = profile[profileNumber]._id
  const matchData = {
    id: userId,
    data: 'Like'
  }
  authProfileApi.likeOrDislike(matchData) // Call the likeOrDislike function from the authProfileApi module
    .then(() => {
      profileNumber++
      nextProfile('liked') // Move to the next profile and display a like message on the UI
      return profileNumber
    })
    .catch(console.error())
}

// Function to dislike a profile
const dislikeProfile = function () {
  const profile = store.profileArray
  const userId = profile[profileNumber]._id
  const matchData = {
    id: userId,
    data: 'Dislike'
  }
  api.likeOrDislike(matchData) // Call the likeOrDislike function from the API module
    .then(() => {
      profileNumber++
      store.profileNumber = profileNumber
      nextProfile('disliked') // Move to the next profile and display a dislike message on the UI
      return profileNumber
    })
    .catch(console.error())
}

// Function to move to the next profile
const nextProfile = function (likeOrDislike) {
  ui.likeOrDislikeMessage(likeOrDislike) // Display a like or dislike message on the UI
  isLastProfile() // Check if it's the last profile
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
      doesSomebodyLikeMe(matchData) // Check if there is a match with the current profile
    })
}

const isLastProfile = function () {
  if (profileNumber >= profileNumberMax) {
    ui.noMoreProfiles() // Display a message indicating there are no more profiles
  } else {
    ui.displayProfiles(profilesFiltered, profileNumber) // Display the next profile on the UI
  }
}

// Function to check if there is a mutual match with the current profile
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
  // Check if there is a match and display appropriate message on the UI
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
