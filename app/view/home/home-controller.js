'use strict';

// travis test

module.exports = ['$log', HomeController];

function HomeController($log) {
  $log.debug('HomeController');
}
