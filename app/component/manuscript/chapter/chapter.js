'use strict';

module.exports = {
  template: require('./chapter.html'),
  controller: ['$log', ChapterController],
  controllerAs: 'chapterCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<'
  }
};

function ChapterController($log) {
  $log.debug('ChapterController');

  this.showReadMore = false;

  this.numLimit = 2000;

  this.readLess = function() {
    this.numLimit = 2000;
  };

  this.readMore = function() {
    this.numLimit = 100000;
  };
}
