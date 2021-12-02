'use strict'

const store = require('../store')

const resetDisplayProfiles = function () {
  $('#user-tag').text('')
  $('#user-name').text('')
  $('#user-age-gender').text('')
  $('#user-location').text('')
  $('#user-about').text('')
}

const displayProfiles = function (profiles, num) {
  $('#user-tag').text(profiles[num].tag)
  $('#user-name').text(profiles[num].name)
  $('#user-age-gender').text(`${profiles[num].age}, ${profiles[num].gender}`)
  $('#user-location').text(profiles[num].location)
  $('#user-about').text(profiles[num].description)
}

const homePage = function () {
  $('#settings-page').hide()
  $('#profile-page').hide()
  $('#home-page').show()
}

const profilePage = function () {
  $('#settings-page').hide()
  $('#home-page').hide()
  $('#profile-page').show()
  $('#profile-display-name').val(store.profile[0])
  $('#profile-description').val(store.profile[1])
  $('#profile-location').val(store.profile[2])
  $('#profile-tag').val(store.profile[3])
  $('#profile-age').val(store.profile[4])
  $('#profile-gender').val(store.profile[5])
  displayMultipleProfiles()
}

const displayMultipleProfiles = function () {
  const profiles = store.user.userProfile
  $('.multiple-profile-display').remove()
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i] === null) break
    $('#profile-container').append(`
      <div class="multiple-profile-display border col col-xs-5 shadow" id="profile-display-${i}">
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

const updateProfileSuccess = function () {
  $('#update-profile-message').text('Profile Updated Successfully!')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-success')
  $('#update-profile-message').fadeOut(5000)
}

const updateProfileFailure = function () {
  $('#update-profile-message').text('Profile Update Failed')
  $('#update-profile-message').removeClass()
  $('#update-profile-message').addClass('text-danger')
  $('#update-profile-message').fadeOut(5000)
}

const settingsPage = function () {
  $('#profile-page').hide()
  $('#home-page').hide()
  $('#settings-page').show()
}

const noMoreProfiles = function () {
  console.log('No More Profiles')
  resetDisplayProfiles()
}

const likeOrDislikeMessage = function (likeOrDislike) {
  $('#like-dislike-message').removeClass()
  $('#like-dislike-message').text(`You have ${likeOrDislike} this profile!`)
  $('#like-dislike-message').addClass('text-success')
  $('#like-dislike-message').fadeOut(5000)
}

module.exports = {
  resetDisplayProfiles,
  displayProfiles,
  homePage,
  profilePage,
  settingsPage,
  updateProfileSuccess,
  updateProfileFailure,
  noMoreProfiles,
  likeOrDislikeMessage
}
