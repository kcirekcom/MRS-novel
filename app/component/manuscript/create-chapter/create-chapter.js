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
    browser_spellcheck: true,
    plugins: 'link code autoresize',
    autoresize_min_height: 300,
    menu: {
      file: {title: 'File', items: 'newdocument'},
      edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
      insert: {title: 'Insert', items: 'link media | template hr'},
      tools: {title: 'Tools', items: 'code'}
    }
  };

  this.createChapter = function() {
    chapterService.createChapter(this.manuscript, this.chapter)
    .then(() => {
      this.chapter.title = null;
      this.chapter.body = null;
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
