'use strict';

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('NavbarController');

  this.checkPath = function() {
    let path = $location.path();

    this.hideNavbarAdmin = true;

    if (path === '/admin') {
      this.hideNavbarAdmin = false;
      authService.getToken()
      .catch(() => {
        $location.url('/');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.log('navbarCtrl.logout()');

    this.hideNavbarAdmin = true;
    authService.logout()
    .then(() => {
      $location.url('/login');
    });
  };
}
