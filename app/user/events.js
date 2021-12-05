'use strict'

const store = require('../store')
const profileEvents = require('../profiles/events')
const profileUI = require('../profiles/ui')

const setUserData = function (data, num) {
  if (data.userProfile[num] === undefined) {
    profileUI.profilePage('new')
  } else {
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
    store.profile = profileInfo

    const likes = profile.likes
    const likedBy = profile.likedBy
    const matchData = [
      likes, likedBy
    ]
    profileEvents.doesSomebodyLikeMe(matchData)
  }
}

const changeProfile = function (event) {
  event.preventDefault()
  const profileIndex = $(event.target).data('index')
  setUserData(store.user, profileIndex)
  profileUI.profilePage()
}

module.exports = {
  setUserData,
  changeProfile
}
