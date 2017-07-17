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

  this.showReadMore = false;

  this.numLimit = 2000;

  this.readLess = function() {
    this.numLimit = 2000;
  };

  this.readMore = function() {
    this.numLimit = 100000;
  };

  this.scrollUp = function() {
    $window.scrollTo(100, 0);
  };
}
