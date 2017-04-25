'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl'
};

function LoginController($log, $location, authService) {
  $log.debug('LoginController');

  authService.getToken()
  .then(() => {
    $location.url('/home');
  }, function() {});

  this.login = function() {
    $log.log('loginCtrl.login()');

    authService.adminLogin(this.user)
    .then(() => {
      $location.url('/home');
    });
  };
}
