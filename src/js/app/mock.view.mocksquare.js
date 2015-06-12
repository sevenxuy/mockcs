define(function(require, module, exports) {
  'use strict';
  require("widget.table");
  var config = require("config"),
    _view = require("mock.view.titleBarPagecontent"),
    util = require("mock.util"),
    getToCaoSquareUrl = util.getApiUrl({
      "name": "square",
      "params": {
        "ua": "bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2",
        "cuid": "80000000000000000000000000000000|0",
        "fn": "?"
      }
    })
  $.widget('mock.mocksquare', _view, {
    title: "快速吐槽",
    data: [{
      "key": "me",
      "value": "我"
    }, {
      "key": "square",
      "value": "广场"
    }],
    renderContent: function() {
      $('<div class="mock-search-box"></div>').appendTo(this.$tabsContent).search();
      var $pageContent = this.$pageContent;
      $.ajax({
        url: getToCaoSquareUrl,
        crossDomain: true,
        dataType: 'jsonp',
      }).done(function(result) {
        var data = [];
        if (!result.errno && result.data && result.data.news.length) {
          data = result.data.news;
        } else {

        }

        $pageContent.table({
          data: data,
          schema: {
            cols: [{
              type: 'text',
              key: 'title',
              text: '内容标题'
            }, {
              type: 'date',
              key: 'stime',
              text: '上线时间'
            }, {
              type: 'number',
              key: 'tu_count',
              text: '吐槽数'
            }, {
              type: 'operation',
              text: '',
              btns: [{
                'type': 'button',
                'text': '展开',
                'className': 'mock-btn mock-btn-red  mock-btn-s border0'
              }]
            }]
          }
        });

      });
      // $.ajax({
      //   "url":
      // });
    }
  });
  module.exprots = $.mock.mocksquare;
});