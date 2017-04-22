'use strict';

module.exports = {
  template: require('./chapter.html'),
  controller: ['$log', ChapterController],
  controllerAs: 'chapterCtrl'
};

function ChapterController($log) {
  $log.debug('chapterCtrl()');

}
