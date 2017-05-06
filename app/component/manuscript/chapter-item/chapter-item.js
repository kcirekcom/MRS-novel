'use strict';

module.exports = {
  template: require('./chapter-item.html'),
  controller: ['$log', 'chapterService', ChapterItemController],
  controllerAs: 'chapterItemCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<'
  }
};

function ChapterItemController($log, chapterService) {
  $log.debug('ChapterItemController');

  this.showEditChapter = false;

  this.showReadMore = false;

  this.numLimit;

  this.words;

  this.readLess = function() {
    let str = this.chapter.body;
    this.words = str.trim().split(' ').length;
    this.numLimit = this.words;
    console.log(this.numLimit);
  };

  this.readMore = function() {
    this.numLimit = 100000;
  };

  this.deleteChapter = function() {
    $log.debug('chapterItemCtrl.deleteChapter()');

    chapterService.deleteChapter(this.manuscript, this.chapter)
    .then(() => {
      $log.log('chapter deleted');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
