'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/home');

  let states = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    },
    {
      name: 'chapters',
      url: '/chapters',
      template: require('../view/chapters/chapters.html'),
      controller: 'ChaptersController',
      controllerAs: 'chaptersCtrl'
    },
    {
      name: 'admin-login',
      url: '/admin-login',
      template: require('../view/admin-login/admin-login.html'),
      controller: 'AdminLoginController',
      controllerAs: 'adminLoginCtrl'
    },
    {
      name: 'admin-home',
      url: '/admin-home',
      template: require('../view/admin-home/admin-home.html'),
      controller: 'AdminHomeController',
      controllerAs: 'adminHomeCtrl'
    }
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
