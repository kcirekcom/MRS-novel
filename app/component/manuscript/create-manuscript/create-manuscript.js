'use strict';

module.exports = {
  template: require('./create-manuscript.html'),
  controller: ['$log', 'manuscriptService', CreateManuscriptController],
  controllerAs: 'createManuscriptCtrl',
};

function CreateManuscriptController($log, manuscriptService) {
  $log.debug('CreateManuscriptController');

  this.manuscript = {};

  this.createManuscript = function() {
    manuscriptService.createManuscript(this.manuscript)
    .then(() => {
      this.manuscript.title = null;
      this.manuscript.desc = null;
      this.manuscript.userID = null;
    });
  };
}
