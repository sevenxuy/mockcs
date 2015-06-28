define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view');

    $.widget('mock.trafad', _view, {
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
            self._updateFigure()
            self._updateDetailElem();

            // });
        },
        _createWrapperElem: function() {
            var h = [];
            h.push('<div class="mock-hd">用户流量数据分析</div>');
            h.push('<div class="page-content">');
            h.push('<ul class="tabs-nav">');
            h.push('<li class="tab-nav-item" data-type="0"><a>个人主页</a></li>');
            h.push('<li class="tab-nav-item" data-type="1"><a>详情页</a></li></ul>');
            h.push('<div class="tabs-content">');
            h.push('<ul class="tabs-period">');
            h.push('<li class="tab-period-item tab-period-item-selected">最近7天</li>');
            h.push('<li class="tab-period-item">最近14天</li>');
            h.push('<li class="tab-period-item">最近30天</li>');
            h.push('<li><input type="text" class="form-control traf-period-date"/>至<input type="text" class="form-control traf-period-date"/></li>')
            h.push('</ul>');
            h.push('<div class="traf-overall-item traf-overall-ad"><div class="traf-count">120000</div><div>总点击数</div></div>');
            h.push('<div id="trafuser-figure"></div>');
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
        _updateFigure: function() {
            //ref: http://bl.ocks.org/mbostock/3883245
            $('#trafuser-figure').empty();
            var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 50
                },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var parseDate = d3.time.format("%Y-%m-%d").parse;

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            var line = d3.svg.line()
                .x(function(d) {
                    return x(d.date);
                })
                .y(function(d) {
                    return y(d.hits);
                });

            var svg = d3.select('#trafuser-figure').append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            //d3.json('../../data/ad.json', function(error, data) {
            d3.json('/mis/video/mockcs/data/ad.json', function(error, data) {
                if (error) throw error;

                data.forEach(function(d) {
                    d.date = parseDate(d.date);
                    d.hits = +d.hits;
                });

                x.domain(d3.extent(data, function(d) {
                    return d.date;
                }));
                y.domain(d3.extent(data, function(d) {
                    return d.hits;
                }));

                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                svg.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis)
                    .append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 6)
                    .attr('dy', '.71em')
                    .style('text-anchor', 'end')
                    .text('点击数');

                svg.append('path')
                    .datum(data)
                    .attr('class', 'line')
                    .attr('d', line);
            });
        },
        _updateDetailElem: function(data) {
            var options = this.options,
                stype = options.stype,
                h = [];
            switch (stype) {
                case '0': //个人主页
                    h.push('<thead><tr><th>日期</th><th>广告图片</th><th>广告链接</th><th>上线时间</th><th>点击数</th><th>个人主页PV</th><th>点展比</th></tr></thead><tbody>');
                    h.push('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>')
                    h.push('</tbody>');
                    break;
                case '1': //原创吐槽内容
                    h.push('<thead><tr><th>内容标题</th><th>上线时间</th><th>PV</th><th>UV</th><th>点赞数</th><th>吐槽数</th></tr></thead><tbody>');
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
            router.navigate('trafad/' + stype, {
                trigger: true
            });
            return false;
        }
    });
    module.exports = $.mock.trafad;
});
