var ServerActions = require('../actions/user_server_actions.js');

module.exports = {
  fetchCurrentUser: function() {
    $.ajax({
      method: 'GET',
      url: 'api/session',
      success: function(object) {
        if (object.username) {
          ServerActions.fetchCurrentUser(object);
        } else {
          ServerActions.receiveError(object);
        }
      },
      statusCode: {
        299: function(response) {}
      }
    });
  },

  loginUser: function(loginData) {
    $.ajax({
      method: 'POST',
      url: 'api/session',
      data: loginData,
      success: function(user) {
        ServerActions.login(user);
      },
      error: function(error) {
        ServerActions.receiveError(error);
      }
    });
  },

  createUser: function(userData) {
    $.ajax({
      method: 'POST',
      url: 'api/users',
      data: userData,
      success: function(user) {
        if (user.username) {
        ServerActions.login(user);
        } else {
          ServerActions.receiveError(user);
        }
      },
      error: function(error) {
        ServerActions.receiveError(error);
      }
    });
  },

  logoutUser: function(user) {
    $.ajax({
      method: 'DELETE',
      url: 'api/session',
      success: function(user) {
        ServerActions.logout(user);
      }
    });
  }
};
