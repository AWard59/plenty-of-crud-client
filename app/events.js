'use strict'

const store = require('./store')

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

module.exports = {
  setUserData
}
