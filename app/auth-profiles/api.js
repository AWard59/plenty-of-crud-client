const config = require('../config')
const store = require('../store')

const createProfile = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/userProfile/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: formData
  })
}

const updateProfile = function (formData) {
  const profileId = store.profile[6]
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${profileId}`,
    method: 'PATCH',
    data: formData,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const deleteProfile = function (id) {
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const likeOrDislike = function (matchData) {
  const profileId = store.profile[6]
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${profileId}/likeOrDislike`,
    method: 'PATCH',
    data: matchData,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const getUserData = function () {
  return $.ajax({
    url: `${config.apiUrl}/userProfile`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  likeOrDislike,
  getUserData
}
