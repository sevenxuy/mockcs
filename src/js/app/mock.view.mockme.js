define(["mock.util", "mock.view.titleBarPagecontent", "widget.search"], function(util, _view, search) {
  'use strict';
  $.widget('mock.mockme', _view, {
    title:"快速吐槽",
    data: [
      {"key": "me","value": "我"}, 
      {"key": "square","value": "广场"}
    ],
    renderContent:function(){
        this.$searchbox = $('<div class="mock-search-box"></div>').appendTo(this.$tabsContent).search();
    }
  });
  return $.mock.mockme;
});