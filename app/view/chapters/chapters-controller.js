'use strict';

module.exports = ['$log', '$rootScope','chapterService', ChaptersController];

function ChaptersController($log, $rootScope, chapterService){
  $log.debug('ChaptersController');

  this.chaptersArray = [];

  this.fetchAllChaptersFromDB = () => {
    chapterService.fetchAllChaptersFromDB()
    .then(chapters => {
      this.chaptersArray.push(chapters);
      console.log(this.chaptersArray);
    });
    return this.chaptersArray.reverse();
  };

  // this.chapters = chapters.reverse();
  // this.currentChapter = chapters[0];
  //
  // this.chapterDeleteDone = function(chapter) {
  //   if (this.currentChapter._id === chapter._id) {
  //     this.currentChapter = null;
  //   }
  // };

  this.fetchAllChaptersFromDB();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchAllChaptersFromDB();
  });
}
