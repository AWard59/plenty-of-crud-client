const config = require('../config')
const store = require('../store')

const createProfile = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/userProfile/`,
    method: 'POST',
    data: formData,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const updateProfile = function (formData) {
  const profileId = store.userProfile._id
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${profileId}`,
    method: 'PATCH',
    data: formData,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const likeOrDislike = function (matchData) {
  const profileId = store.userProfile._id
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${profileId}/likeOrDislike`,
    method: 'PATCH',
    data: matchData,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

module.exports = {
  createProfile,
  updateProfile,
  likeOrDislike
}
