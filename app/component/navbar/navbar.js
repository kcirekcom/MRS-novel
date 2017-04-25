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

    if (path === '/admin') {
      this.hideButtons = true;
    }

    if (path !== '/admin') {
      this.hideButtons = false;
      authService.getToken()
      .catch(() => {
        $location.url('/admin#login');
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
      $location.url('/');
    });
  };
}
