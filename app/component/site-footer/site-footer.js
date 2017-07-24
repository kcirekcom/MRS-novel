'use strict';

module.exports = {
  template: require('./site-footer.html'),
  controller: ['$log', SiteFooterController],
  controllerAs: 'siteFooterCtrl'
};

function SiteFooterController($log) {
  $log.debug('SiteFooterController');

  this.toggleQuote = false;
}
