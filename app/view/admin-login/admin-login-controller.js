'use strict';

module.exports = ['$log', '$location', AdminLoginController];

function AdminLoginController($log, $location) {
  let url = $location.url();
  this.showLogin = url === '/login';
}
