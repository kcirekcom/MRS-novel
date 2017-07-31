'use strict';

module.exports = {
  template: require('./chapter.html'),
  controller: ['$log', '$window', '$sce', ChapterController],
  controllerAs: 'chapterCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<'
  }
};

function ChapterController($log, $window, $sce) {
  $log.debug('ChapterController');

  this.hideComments = true;

  this.fbcModal = {
    closeComments: true
  };

  this.trustAsHtml = function(body) {
    return $sce.trustAsHtml(body);
  };

  this.scrollUp = function() {
    $window.scrollTo(100, 0);
  };
}
