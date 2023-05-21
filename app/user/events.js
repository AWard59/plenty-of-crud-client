'use strict'

const store = require('../store')
const profileEvents = require('../profiles/events')
const profileUI = require('../profiles/ui')

// Set user data based on the profile number
const setUserData = function (data, num) {
  if (data.userProfile[num] === undefined) {
    // If the profile doesn't exist, navigate to the new profile page
    profileUI.profilePage('new')
  } else {
    // If the profile exists, set the profile information
    const profile = data.userProfile[num]
    const profileDisplayName = profile.name
    const profileLocation = profile.location
    const profileDescription = profile.description
    const profileTag = profile.tag
    const profileAge = profile.age
    const profileGender = profile.gender
    const profileId = profile._id
    const profileInfo = [
      profileDisplayName,
      profileDescription,
      profileLocation,
      profileTag,
      profileAge,
      profileGender,
      profileId
    ]
    // Check for undefined values and replace them with an empty string
    for (let i = 0; i < profileInfo.length; i++) {
      if (profileInfo[i] === undefined) {
        profileInfo[i] = ''
      }
    }
    store.profile = profileInfo

    setTimeout(() => {
      // Retrieve likes and likedBy data for the profile
      const likes = profile.likes
      const likedBy = profile.likedBy
      const matchData = [likes, likedBy]
      // Check if there are any matches with the current profile
      profileEvents.doesSomebodyLikeMe(matchData)
    }, 5000)
  }
}

// Change the profile based on the selected index
const changeProfile = function (event) {
  event.preventDefault()
  const profileIndex = $(event.target).data('index')
  // Set user data for the selected profile and navigate to the profile page
  setUserData(store.user, profileIndex)
  profileUI.profilePage()
  profileEvents.getUserData(store.user)
}

module.exports = {
  setUserData,
  changeProfile
}
