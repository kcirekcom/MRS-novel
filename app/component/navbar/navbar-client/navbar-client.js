'use strict';

module.exports = {
  template: require('./navbar-client.html'),
  controller: ['$log', '$location', 'authService', NavbarClientController],
  controllerAs: 'navbarClientCtrl'
};

function NavbarClientController() {

}
