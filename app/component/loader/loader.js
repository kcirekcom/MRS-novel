'use strict';

module.exports = {
  template: require('./loader.html'),
  controller: ['$log', LoaderController],
  controllerAs: 'loaderCtrl'
};

function LoaderController($log) {
  $log.debug('LoaderController');
}
