'use strict';

module.exports = {
  template: require('./fb-comments.html'),
  controller: ['$log', fbCommentsController],
  controllerAs: 'fbCommentsCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<',
    fbcModal: '='
  }
};

function fbCommentsController($log) {
  $log.debug('fbCommentsController');
}
