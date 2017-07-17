'use strict';

module.exports = {
  template: require('./manuscript-item.html'),
  controller: ['$log', '$window', 'manuscriptService', ManuscriptItemController],
  controllerAs: 'manuscriptItemCtrl',
  bindings: {
    manuscript: '<',
    chapter: '<'
  }
};

function ManuscriptItemController($log, $window, manuscriptService) {
  $log.debug('ManuscriptItemController');

  this.changeEdit = {
    showEditManuscript: false
  };

  this.deleteManuscript = function() {
    $log.debug('manuscriptItemCtrl.deleteManuscript()');

    let confirmed = $window.confirm('Are you sure that you want to delete this chapter?');

    if (confirmed) {
      $window.alert('This chapter has been deleted.');
    }

    if (!confirmed) {
      $log.log('chapter not deleted');
      return false;
    }

    manuscriptService.deleteManuscript(this.manuscript)
    .then(() => {
      $log.log('manuscript deleted');
    })
    .catch(err => {
      $log.error(err.message);
    });
  };
}
