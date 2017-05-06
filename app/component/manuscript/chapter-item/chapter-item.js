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

  this.numLimit = 2000;

  this.words;

  this.wordCount = function() {
    $log.debug('chapterItemCtrl.wordCount()');
    let str = this.chapter.body.replace(/<\/?[a-z][^>]*>/gi, '');
    this.words = str.split(/\s+/).length;
  };

  this.readLess = function() {
    this.numLimit = 2000;
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
