'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('admin', '/admin#signin');

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
      name: 'admin',
      url: '/admin',
      template: require('../view/admin/admin.html'),
      controller: 'AdminController',
      controllerAs: 'adminCtrl'
    }
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
