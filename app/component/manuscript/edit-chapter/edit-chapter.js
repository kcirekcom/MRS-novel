'use strict';

module.exports = {
  template: require('./edit-chapter.html'),
  controller: ['$log', 'chapterService', EditChapterController],
  controllerAs: 'editChapterCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<',
    changeEdit: '=',
    updateChapter: '&'
  }
};

function EditChapterController($log, chapterService) {
  $log.debug('EditChapterController');

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
}
