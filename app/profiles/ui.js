'use strict'

const store = require('../store')

const resetDisplayProfiles = function () {
  $('#user-tag').text('')
  $('#user-name').text('')
  $('#user-age-gender').text('')
  $('#user-location').text('')
  $('#user-about').text('')
  $('#user-image').attr('src', '')
}

const displayProfiles = function (profiles, num) {
  if (num === undefined) {
    profiles = store.userProfile
    num = store.profileNumber
  }
  console.log(store)
  $('#user-name').text(profiles[num].name)
  $('#user-age-gender').text(`${profiles[num].age}, ${profiles[num].gender}`)
  $('#user-location').text(profiles[num].location)
  $('#user-about').text(profiles[num].description)
  if (profiles[num].tag !== undefined) {
    $('#user-tag').text(profiles[num].tag)
  }
  if (profiles[num].image === undefined) {
    $('#user-image').attr('src', 'https://i.imgur.com/n7FH6re.png')
  }
}

const homePage = function () {
  $('#settings-page').hide()
  $('#profile-page').hide()
  $('#matches-page').hide()
  $('#home-page').show()
}

const profilePage = function (isNew) {
  console.log(store.profile)
  if (isNew === 'new') {
    $('#home-page').hide()
    $('#profile-page').show()
  } else {
    $('#home-page').hide()
    $('#settings-page').hide()
    $('#matches-page').hide()
    $('#profile-page').show()
    $('#profile-display-name').val(store.profile[0])
    $('#profile-description').val(store.profile[1])
    $('#profile-location').val(store.profile[2])
    $('#profile-tag').val(store.profile[3])
    $('#profile-age').val(store.profile[4])
    $('#profile-gender').val(store.profile[5])
    $('#edit-profile').hide()
    displayMultipleProfiles()
  }
}

const settingsPage = function () {
  $('#profile-page').hide()
  $('#home-page').hide()
  $('#matches-page').hide()
  $('#settings-page').show()
}

const matchesPage = function () {
  $('#match-modal').hide()
  $('#settings-page').hide()
  $('#profile-page').hide()
  $('#home-page').hide()
  $('#matches-page').show()
}

const displayMultipleProfiles = function () {
  const profiles = store.user.userProfile
  $('.multiple-profile-display').remove()
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i] === null) continue
    $('#profile-container').append(`
      <div class="multiple-profile-display border col col-xs-5 col-m-3 shadow" id="profile-display-${i}">
        <p>${profiles[i].name} <br>
          ${profiles[i].age}, ${profiles[i].gender} <br>
          ${profiles[i].location} <br>
          ${profiles[i].description}</p>
        <div class="multiple-profiles-buttons">
          <button class="btn btn-success col-xs-2 select-profile" data-index="${i}">Select</button>
          <button class="btn btn-danger col-xs-2 delete-profile" data-id="${profiles[i]._id}"">Delete</button>
        </div>
      </div>`)
    if (profiles[i]._id === store.profile[6]) {
      $(`#profile-display-${i}`).append('<div>✅</div>')
    }
  }
}

const enableUpdate = function () {
  $('#edit-profile').show()
  $('#edit-profile').removeClass('create-profile')
  $('#edit-profile').addClass('update-profile')
}

const enableCreate = function () {
  $('#edit-profile').show()
  $('#edit-profile').removeClass('update-profile')
  $('#edit-profile').addClass('create-profile')
}

const updateProfileSuccess = function () {
  $('#update-profile-message').text('Profile Updated Successfully!')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-success')
  $('#update-profile-message').fadeOut(5000)
  $('#edit-profile').hide()
  $('#edit-profile').removeClass('update-profile')
  profilePage()
}

const updateProfileFailure = function () {
  $('#update-profile-message').text('Profile Update Failed')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-danger')
  $('#update-profile-message').fadeOut(5000)
}

const createProfileSuccess = function () {
  $('#update-profile-message').text('Profile Created Successfully!')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-success')
  $('#update-profile-message').fadeOut(5000)
  $('#edit-profile').hide()
  $('#edit-profile').removeClass('create-profile')
  profilePage()
  displayProfiles(store.userProfile, store.profileNumber)
  $('@update-profile').show()
  $('#create-profile').show()
}

const createProfileFailure = function () {
  $('#update-profile-message').text('Profile Create Failed')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-danger')
  $('#update-profile-message').fadeOut(5000)
}

const deleteProfileSuccess = function () {
  $('#update-profile-message').text('Profile Deleted Successfully!')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-success')
  $('#update-profile-message').fadeOut(5000)
  displayMultipleProfiles()
}

const deleteProfileFailure = function () {
  $('#update-profile-message').text('Profile did not delete')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-danger')
  $('#update-profile-message').fadeOut(5000)
}

const clearFormFields = function () {
  $('#profile-display-name').val('')
  $('#profile-description').val('')
  $('#profile-location').val('')
  $('#profile-tag').val('')
  $('#profile-age').val('')
  $('#profile-gender').val('')
}

const noMoreProfiles = function () {
  $('#user-no').hide()
  $('#user-yes').hide()
  resetDisplayProfiles()
  $('#no-more-profiles').text('🚫  No more profiles to view!')
}

const likeOrDislikeMessage = function (likeOrDislike) {
  $('#like-dislike-message').removeClass().stop(true, true).show()
  $('#like-dislike-message').text(`You have ${likeOrDislike} this profile!`)
  $('#like-dislike-message').addClass('text-success')
  $('#like-dislike-message').fadeOut(5000)
}

const displayMultipleMatches = function (matches) {
  $('.multiple-matches-display').remove()
  for (let i = 0; i < matches.length; i++) {
    $('#matches-container').append(`
      <div class="multiple-matches-display border col col-xs-5 col-m-3 shadow" id="matches-display-${i}">
        <p>${matches[i].data.name} <br>
          ${matches[i].data.age}, ${matches[i].data.gender} <br>
          ${matches[i].data.location} <br>
          ${matches[i].data.description}</p>
        <div class="multiple-matches-buttons">
          <button class="btn btn-danger col-xs-2 delete-profile" data-id="${matches[i].data._id}"">Delete</button>
        </div>
      </div>`)
  }
}

const modalClose = function () {
  $('#match-modal').hide()
}

module.exports = {
  resetDisplayProfiles,
  displayProfiles,
  homePage,
  profilePage,
  settingsPage,
  matchesPage,
  enableUpdate,
  enableCreate,
  updateProfileSuccess,
  updateProfileFailure,
  createProfileSuccess,
  createProfileFailure,
  deleteProfileSuccess,
  deleteProfileFailure,
  clearFormFields,
  noMoreProfiles,
  likeOrDislikeMessage,
  displayMultipleMatches,
  modalClose
}
