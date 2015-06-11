define(function(require, exports, module) {
  'use strict';

  $.widget('mock.view', {
    options: {},
    _create: function() {
      this.render();
      this._bindEvents();
      this.element.data('widgetCreated', true);
    },
    render: function() {
      this.element.append(this._createElem());
      if (this.element.hasClass('hide')) {
        this.element.removeClass('hide').addClass('current');
      }
    },
    reRender: function() {
      this.element.addClass('hide').empty();
      this.render();
    },
    _bindEvents: function() {},
    _createElem: function() {},
    _updateWrapperElemStatus: function() {
      var options = this.options,
        $nav = this.element.find('ul.tabs-nav:eq(0)');
      $nav.children('li.tab-nav-item-selected').removeClass('tab-nav-item-selected');
      $nav.children('li[data-type=' + options.type + ']').addClass('tab-nav-item-selected');
      if (options.totalpage > 1) {
        this.element.find('div.paging').removeClass('hide');
      }
    }
  });
  module.exports = $.mock.view;
});
