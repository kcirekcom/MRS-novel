'use strict';

module.exports = ['$log', '$rootScope','chapterService', ChaptersController];

function ChaptersController($log, $rootScope, chapterService){
  $log.debug('ChaptersController');

  this.loader = {
    loading: true,
  };

  this.chaptersArray = [];

  this.fetchAllChaptersFromDB = () => {
    chapterService.fetchAllChaptersFromDB()
    .then(chapters => {
      chapters.data.forEach(chapter => {
        this.chaptersArray.unshift(chapter);
      });
      $log.log('all chapters retrieved');
      this.loader.loading = false;
    })
    .catch(err => {
      $log.error(err.message);
    });
  };

  this.fetchAllChaptersFromDB();
}
