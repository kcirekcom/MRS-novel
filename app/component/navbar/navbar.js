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

    if (path === '/login' || path === '/home' || path === '/chapters') {
      this.hideButtons = true;
    }

    if (path !== '/login' || path !== '/home' || path !== '/chapters') {
      this.hideButtons = false;
      authService.getToken()
      .catch(() => {
        $location.url('/admin');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function() {
    $log.log('navbarCtrl.logout()');

    this.hideButtons = true;
    authService.logout()
    .then(() => {
      $location.url('/home');
    });
  };
}
