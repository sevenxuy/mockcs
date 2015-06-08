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
    _bindEvents:function(){},
    _createElem: function() {},
    _toggleTop: function(event) {
      var
        $i = $(event.target);
      if ($i.hasClass('fa-toggle-on')) {
        $i.removeClass('fa-toggle-on');
      } else {
        $i.addClass('fa-toggle-on');
      }
    },
  });
  module.exports = $.mock.view;
});
