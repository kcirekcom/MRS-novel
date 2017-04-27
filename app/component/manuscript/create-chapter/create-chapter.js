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
    resize: false,
    height: 300,
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };

  this.createChapter = function() {
    console.log(this.manuscript);
    chapterService.createChapter(this.manuscript, this.chapter)
    .then(() => {
      this.chapter.title = null;
      this.chapter.body = null;
    });
  };
}
