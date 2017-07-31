'use strict';

require('./scss/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');
const ngAnimate = require('angular-animate');
const ngSanitize = require('angular-sanitize');
const uiBootstrap = require('angular-ui-bootstrap');
require('angular-ui-tinymce');

const mrsnovel = angular.module('mrsnovel', [ngAnimate, uiRouter, ngSanitize, uiBootstrap, 'ui.tinymce']);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach(path => {
  mrsnovel.config(context(path));
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach(key => {
  let name = pascalcase(path.basename(key, '.js'));
  let module = context(key);
  mrsnovel.controller(name, module);
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  mrsnovel.service(name, module);
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  mrsnovel.component(name, module);
});

context = require.context('./filter/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  mrsnovel.filter(name, module);
});

context = require.context('./directive/', true, /\.js$/);
context.keys().forEach(key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  mrsnovel.directive(name, module);
});
