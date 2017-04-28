'use strict';

module.exports = {
  template: require('./edit-manuscript.html'),
  controller: ['$log', 'manuscriptService', EditManuscriptController],
  controllerAs: 'editManuscriptCtrl',
  bindings: {
    manuscript: '<'
  }
};

function EditManuscriptController($log, manuscriptService) {
  $log.debug('EditManuscriptController');

  this.updateManuscript = function() {
    $log.debug('editManuscriptCtrl.updateManuscript()');
    manuscriptService.updateManuscript(this.manuscript)
    .then(() => {
      $log.log('manuscript updated');
    })
    .catch( err => {
      $log.error(err.message);
    });
  };
}
