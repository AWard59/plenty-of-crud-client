const config = require('../config') // Importing the configuration module.
const store = require('../store') // Importing the store module.

// Function to create a user profile.
const createProfile = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/userProfile/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.user.token}` // Attaching the user's token to the request headers for authentication.
    },
    data: formData // Passing the form data to the API.
  })
}

// Function to update a user profile.
const updateProfile = function (formData) {
  const profileId = store.profile[6] // Extracting the profile ID from the store.
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${profileId}`,
    method: 'PATCH',
    data: formData,
    headers: {
      Authorization: `Bearer ${store.user.token}` // Attaching the user's token to the request headers for authentication.
    }
  })
}

// Function to delete a user profile.
const deleteProfile = function (id) {
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.user.token}` // Attaching the user's token to the request headers for authentication.
    }
  })
}

// Function to like or dislike another user's profile.
const likeOrDislike = function (matchData) {
  const profileId = store.profile[6] // Extracting the profile ID from the store.
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${profileId}/likeOrDislike`,
    method: 'PATCH',
    data: matchData,
    headers: {
      Authorization: `Bearer ${store.user.token}` // Attaching the user's token to the request headers for authentication.
    }
  })
}

// Function to get the user's profile data.
const getUserData = function () {
  return $.ajax({
    url: `${config.apiUrl}/userProfile`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.user.token}` // Attaching the user's token to the request headers for authentication.
    }
  })
}

// Function to add matches to the user's profile.
const addMatches = function (matchIds, newLikes, newLikedBy) {
  const profileId = store.profile[6] // Extracting the profile ID from the store.
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${profileId}/matches`,
    method: 'PATCH',
    data: {
      matchIds: matchIds,
      newLikes: newLikes,
      newLikedBy: newLikedBy
    },
    headers: {
      Authorization: `Bearer ${store.user.token}` // Attaching the user's token to the request headers for authentication.
    }
  })
}

// Function to get the user's matches.
const getMatches = function () {
  const profileId = store.profile[6] // Extracting the profile ID from the store.
  return $.ajax({
    url: `${config.apiUrl}/userProfile/${profileId}/matches`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.user.token}` // Attaching the user's token to the request headers for authentication.
    }
  })
}

// Function to get profile data of a specific match.
const getMatchProfileData = function (matchID) {
  return $.ajax({
    url: `${config.apiUrl}/userProfile/matches/userData/${matchID}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.user.token}` // Attaching the user's token to the request headers for authentication.
    }
  })
}

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  likeOrDislike,
  getUserData,
  addMatches,
  getMatches,
  getMatchProfileData
}

// Exporting the functions to be used by other modules. Each function corresponds to a specific API request related to user profiles. The functions handle making HTTP requests to the API endpoints with the necessary headers and data. They also utilize the configuration and store modules for accessing API URLs and user authentication information.
