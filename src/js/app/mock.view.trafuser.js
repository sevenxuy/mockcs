define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view');

    $.widget('mock.trafuser', _view, {
        options: {
            url: '',
            ps: 30
        },
        render: function(opt) {
            var options = this.options;
            _.extend(options, opt);
            this._createWrapperElem();
        },
        reRender: function(opt) {
            var options = this.options;
            _.extend(options, opt);
            this.renderContent();
        },
        renderContent: function() {
            var self = this,
                options = this.options;
            this._updateWrapperElemStatus(options.stype);
            this._updateWrapperElemStatus(options.stype);
            // $.ajax({
            //     url: options.url,
            //     crossDomain: true,
            //     dataType: 'jsonp',
            //     data: {
            //         stype: options.stype,
            //         pn: options.pn,
            //         ps: options.ps
            //     }
            // }).done(function(res) {
            self._updateOverallElem();
            self._updateDetailElem();

            // });
        },
        _createWrapperElem: function() {
            var h = [];
            h.push('<div class="mock-hd">用户流量数据分析</div>');
            h.push('<div class="page-content">');
            h.push('<ul class="tabs-nav">');
            h.push('<li class="tab-nav-item" data-type="0"><a>个人主页</a></li>');
            h.push('<li class="tab-nav-item" data-type="1"><a>原创吐槽内容</a></li></ul>');
            h.push('<div class="tabs-content">');
            h.push('<div class="mock-title">总指标</div>');
            h.push('<ul class="traf-overall" id="trafuser-overall"></ul>');
            h.push('<ul class="tabs-period">');
            h.push('<li class="tab-period-item tab-period-item-selected">最近7天</li>');
            h.push('<li class="tab-period-item">最近14天</li>');
            h.push('<li classw="tab-period-item">最近30天</li>');
            h.push('<li><input type="text" class="form-control traf-period-date"/>至<input type="text" class="form-control traf-period-date"/></li>')
            h.push('</ul>');
            h.push('<div id="trafuser-figure">Figure</div>');
            h.push('<div class="mock-title">详情数据</div>');
            h.push('<table class="table table-bordered" id="trafuser-detail"></table>');
            h.push('</div>');
            h.push('<div class="paging hide">');
            h.push('<div class="mock-btn mock-btn-white page_pre hide">&lt;</div>');
            h.push('<div class="page_num"><span class="page_current"></span><span class="num_gap">/</span><span class="page_total"></span></div>');
            h.push('<div class="mock-btn mock-btn-white page_next hide">&gt;</div>');
            h.push('<input type="text" class="form-control goto_page">');
            h.push('<div class="mock-btn mock-btn-white page-go">跳转</div>');
            h.push('</div>');
            h.push('</div>');
            this.element.append(h.join(''));
            this.renderContent();
            this.element.find('input.traf-period-date').datetimepicker({
                format: 'Y-m-d',
                timepicker: false,
                lang: 'ch'
            });
        },
        _updateOverallElem: function(data) {
            var options = this.options,
                stype = options.stype,
                h = [];
            switch (stype) {
                case '0': //个人主页
                    h.push('<li class="traf-overall-item"><div>个人主页PV</div><div class="traf-count">120000</div><div>日:<span class="traf-count-up">⬆</span></div><div>周:<span class="traf-count-up">⬆</span></div><div>月:<span class="traf-count-down">⬇</span></div></li>');
                    h.push('<li class="traf-overall-item"><div>个人主页UV</div><div class="traf-count">20000</div><div>日:<span class="traf-count-up">⬆</span></div><div>周:<span class="traf-count-up">⬆</span></div><div>月:<span class="traf-count-down">⬇</span></div></li>');
                    h.push('<li class="traf-overall-item"><div>总粉丝数</div><div class="traf-count">1000</div><div>日:<span class="traf-count-up">⬆</span></div><div>周:<span class="traf-count-up">⬆</span></div><div>月:<span class="traf-count-down">⬇</span></div></li>');
                    break;
                case '1': //原创吐槽内容
                    h.push('<li class="traf-overall-item"><div>吐槽原创内容PV</div><div class="traf-count">120000</div><div>日:<span class="traf-count-up">⬆</span></div><div>周:<span class="traf-count-up">⬆</span></div><div>月:<span class="traf-count-down">⬇</span></div></li>');
                    h.push('<li class="traf-overall-item"><div>吐槽原创内容UV</div><div class="traf-count">20000</div><div>日:<span class="traf-count-up">⬆</span></div><div>周:<span class="traf-count-up">⬆</span></div><div>月:<span class="traf-count-down">⬇</span></div></li>');
                    h.push('<li class="traf-overall-item"><div>吐槽原创内容总参与数</div><div class="traf-count">1000</div><div>日:<span class="traf-count-up">⬆</span></div><div>周:<span class="traf-count-up">⬆</span></div><div>月:<span class="traf-count-down">⬇</span></div></li>');
                    break;
            }
            $('#trafuser-overall').empty().append(h.join(''));
        },
        _updateDetailElem: function(data) {
            var options = this.options,
                stype = options.stype,
                h = [];
            switch (stype) {
                case '0': //个人主页
                    h.push('<thead><tr><th>日期</th><th>PV</th><th>UV</th><th>新增粉丝数</th><th>总粉丝数</th></tr></thead><tbody>');
                    h.push('<tr><td>2015-06-10</td><td>1200</td><td>800</td><td>10</td><td>200</td></tr>')
                    h.push('</tbody>');
                    break;
                case '1': //原创吐槽内容
                    h.push('<thead><tr><th>内容标题</th><th>上线时间</th><th>PV</th><th>UV</th><th>吐槽数</th><th>参与数</th></tr></thead><tbody>');
                    h.push('<tr><td>hello world</td><td>2015-06-10</td><td>1200</td><td>800</td><td>10</td><td>200</td></tr>')
                    h.push('</tbody>');
                    break;
            }
            $('#trafuser-detail').empty().append(h.join(''));
        },
        _bindEvents: function() {
            this._on(this.element, {
                'click li.tab-nav-item': this._goPage,
                'click div.page_pre': this._preGoSiblingPage,
                'click div.page_next': this._preGoSiblingPage,
                'click div.page_go': this._preGoSiblingPage
            });
        },
        _goPage: function(event) {
            var stype = $(event.target).closest('li.tab-nav-item').attr('data-type');
            var router = new Backbone.Router;
            router.navigate('trafuser/' + stype, {
                trigger: true
            });
            return false;
        }
    });
    module.exports = $.mock.trafuser;
});
