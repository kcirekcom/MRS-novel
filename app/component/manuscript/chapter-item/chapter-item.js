'use strict';

module.exports = {
  template: require('./chapter-item.html'),
  controller: ['$log', '$window', 'chapterService', ChapterItemController],
  controllerAs: 'chapterItemCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<'
  }
};

function ChapterItemController($log, $window, chapterService) {
  $log.debug('ChapterItemController');

  this.changeEdit = {
    showEditChapter: false
  };

  this.showReadMore = false;

  this.numLimit = 2000;

  this.words;

  this.readLess = function() {
    this.numLimit = 2000;
  };

  this.readMore = function() {
    this.numLimit = 100000;
  };

  this.wordCount = function() {
    $log.debug('chapterItemCtrl.wordCount()');
    let str = this.chapter.body.replace(/<\/?[a-z][^>]*>/gi, '');
    this.words = str.split(/\s+/).length;
  };

  this.deleteChapter = function() {
    $log.debug('chapterItemCtrl.deleteChapter()');

    let confirmed = $window.confirm('Are you sure that you want to delete this chapter?');

    if (confirmed) {
      $window.alert('This chapter has been deleted.');
    }

    if (!confirmed) {
      $log.log('chapter not deleted');
      return false;
    }

    chapterService.deleteChapter(this.manuscript, this.chapter)
    .then(() => {
      $log.log('chapter deleted');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
