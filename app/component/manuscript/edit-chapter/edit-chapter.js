'use strict';

module.exports = {
  template: require('./edit-chapter.html'),
  controller: ['$log', 'chapterService', EditChapterController],
  controllerAs: 'editChapterCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<'
  }
};

function EditChapterController($log, chapterService) {
  $log.debug('EditChapterController');

  this.tinymceOptions = {
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright justify | code'
  };

  this.updateChapter = function() {
    $log.debug('editChapterCtrl.updateChapter()');
    chapterService.updateChapter(this.chapter)
    .then(() => {
      $log.debug('chapter updated');
    })
    .catch( err => {
      $log.error(err.message);
    });
  };
}
