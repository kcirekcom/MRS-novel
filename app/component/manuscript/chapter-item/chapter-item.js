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

  this.deleteChapter = function() {
    $log.debug('chapterItemCtrl.deleteChapter()');

    chapterService.deleteChapter(this.chapter)
    .then(() => {
      $log.log('chapter deleted');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
