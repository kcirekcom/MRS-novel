'use strict';

require('./scss/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');
const uiTinymce = require('ui.tinymce');

const mrsnovel = angular.module('mrsnovel', [ngTouch, ngAnimate, uiRouter, uiTinymce]);

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
