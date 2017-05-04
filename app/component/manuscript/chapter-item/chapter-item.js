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

  this.readLess = function() {
    this.numLimit = 2000;
  };

  this.readMore = function() {
    this.numLimit = 10000;
  };

  // console.log(this.chapter);
  // this.daysAgo = parseInt((new Date() - new   Date(this.chapter.timestamp))/60/60/24/1000);
  // if(this.daysAgo < 1) {
  //   this.publishStatus = '(published today)';
  // } else {
  //   this.publishStatus = this.chapter.timestamp ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  // }

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
