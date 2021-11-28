'use strict'

const ui = require('./ui')
const store = require('./store')

let profileDisplayName
let profileLocation
let profileDescription
let profileTag
let profileAge
let profileGender

const setUserData = function (data) {
  const profile = data.user.userProfile[0]
  profileDisplayName = profile.name
  profileLocation = profile.location
  profileDescription = profile.description
  profileTag = profile.tag
  profileAge = profile.age
  profileGender = profile.gender
  const profileInfo = [
    profileDisplayName, profileDescription, profileLocation,
    profileTag, profileAge, profileGender
  ]
  for (let i = 0; i < profileInfo.length; i++) {
    if (profileInfo[i] === undefined) {
      profileInfo[i] = ''
    }
  }
  store.profile = profileInfo
  console.log(store)
}

module.exports = {
  setUserData
}
