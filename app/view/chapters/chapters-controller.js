'use strict';

module.exports = ['$log', '$rootScope','chapterService', ChaptersController];

function ChaptersController($log, $rootScope, chapterService){
  $log.debug('ChaptersController');

  this.chaptersArray = [];

  this.fetchAllChaptersFromDB = () => {
    chapterService.fetchAllChaptersFromDB()
    .then(chapters => {
      this.chaptersArray = [];
      chapters.data.forEach(chapter => {
        this.chaptersArray.push(chapter);
      });
      console.log(this.chaptersArray);
      return this.chaptersArray.reverse();
    });
  };

  this.fetchAllChaptersFromDB();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchAllChaptersFromDB();
  });
}
