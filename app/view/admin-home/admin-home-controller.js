'use strict';

module.exports = ['$log', '$rootScope', 'manuscriptService', AdminHomeController];

function AdminHomeController($log, $rootScope, manuscriptService) {
  $log.debug('AdminHomeController');

  this.manuscripts = [];
  this.chapters = [];

  this.fetchManuscripts = function() {
    manuscriptService.fetchManuscripts()
    .then(manuscripts => {
      this.manuscripts = manuscripts.reverse();
      this.currentManuscript = manuscripts[0];
      return this.manuscripts;
    })
    .then(manuscripts => {
      console.log(manuscripts);
      this.chapters = [];
      manuscripts.forEach(manuscript => {
        manuscript.chapters.forEach(chapter => {
          this.chapters.push(chapter);
        });
      });
      console.log(this.chapters);
      return this.chapters.reverse();
    });
  };

  this.manuscriptDeleteDone = function(manuscript) {
    if (this.currentManuscript._id === manuscript._id) {
      this.currentManuscript = null;
    }
  };

  this.fetchManuscripts();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchManuscripts();
  });
}
