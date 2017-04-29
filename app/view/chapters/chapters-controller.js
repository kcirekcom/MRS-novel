'use strict';

module.exports = ['$log', '$rootScope','chapterService', ChaptersController];

function ChaptersController($log, $rootScope, chapterService){
  $log.debug('ChaptersController');

  this.chaptersArray = [];

  this.fetchAllChaptersFromDB = () => {
    chapterService.fetchAllChaptersFromDB()
    .then(chapters => {
      chapters.data.forEach(chapter => {
        this.chaptersArray.unshift(chapter);
      });
      $log.log('all chapters retrieved');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };

  this.fetchAllChaptersFromDB();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchAllChaptersFromDB();
  });
}
