'use strict';

module.exports = {
  template: require('./chapter.html'),
  controller: ['$log', '$window', ChapterController],
  controllerAs: 'chapterCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<'
  }
};

function ChapterController($log, $window) {
  $log.debug('ChapterController');

  this.scrollUp = function() {
    $window.scrollTo(100, 0);
  };
}
