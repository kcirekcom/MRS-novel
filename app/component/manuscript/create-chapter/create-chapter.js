'use strict';

module.exports = {
  template: require('./create-chapter.html'),
  controller: ['$log', 'chapterService', CreateChapterController],
  controllerAs: 'createChapterCtrl',
  bindings: {
    manuscript: '<'
  }
};

function CreateChapterController($log, chapterService) {
  $log.debug('CreateChapterController');

  this.chapter = {};

  this.tinymceOptions = {
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright justify | code'
  };

  this.createChapter = function() {
    chapterService.createChapter(this.chapter)
    .then(() => {
      this.chapter.title = null;
      this.chapter.body = null;
    });
  };
}
