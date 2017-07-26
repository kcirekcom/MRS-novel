'use strict';

module.exports = {
  template: require('./edit-chapter.html'),
  controller: ['$log', 'chapterService', EditChapterController],
  controllerAs: 'editChapterCtrl',
  bindings: {
    chapter: '<',
    manuscript: '<',
    changeEdit: '='
  }
};

function EditChapterController($log, chapterService) {
  $log.debug('EditChapterController');

  this.tinymceOptions = {
    resize: false,
    height: 300,
    browser_spellcheck: true,
    plugins: 'link image code',
    menu: {
      file: {title: 'File', items: 'newdocument'},
      edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
      insert: {title: 'Insert', items: 'link media | template hr'},
      view: {title: 'View', items: 'visualaid'},
      tools: {title: 'Tools', items: 'code'}
    }
  };

  this.updateChapter = function() {
    $log.debug('editChapterCtrl.updateChapter()');

    chapterService.updateChapter(this.manuscript, this.chapter)
    .then(() => {
      $log.log('chapter updated');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
