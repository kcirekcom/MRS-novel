'use strict';

module.exports = ['$log', '$location', '$rootScope', 'authService', AdminLoginController];

function AdminLoginController($log, $location, authService) {
  let url = $location.url();
  this.showLogin = url === '/admin#login' || url === '/admin';
}
