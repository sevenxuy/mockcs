define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view'),
        _util = require('mock.util'),
        notify = require('mock.plugin.notify'),
        apihost = 'http://' + _util.getApiHost(),
        topAudiNewsUrl = function(id) {
            return _util.getApiUrl({
                "name": "topaudinews",
                "params": {
                    "id": id
                }
            });
        },
        topAudiNews = function(id) {
            var squareInstance = this;
            return $.ajax({
                url: topAudiNewsUrl(id),
                crossDomain: true,
                dataType: 'jsonp',
            }).done;
        };

    $.widget('mock.raws', _view, {
        options: {
            getaudinewsbyvid: apihost + '/mock/getaudinewsbyvid?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            audinewsdo: apihost + '/mock/audinewsdo?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            deleteaudinews: apihost + '/mock/deleteaudinews?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            getaudinews: apihost + '/mock/getaudinews?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            ps: 100,
            tp_audit: 3
        },
        render: function(opt) {
            var options = this.options;
            _.extend(options, opt);
            this._createWrapperElem();
        },
        renderTable: function() {
            var self = this,
                options = this.options;
            this._updateWrapperElemStatus(options.type);
            $.ajax({
                url: options.getaudinewsbyvid,
                crossDomain: true,
                dataType: 'jsonp',
                data: {
                    type: options.type,
                    pn: options.pn,
                    ps: options.ps
                }
            }).done(function(res) {
                if (!res.errno) {
                    options.allcount = res.data.allcount;
                    options.totalpage = Math.ceil(options.allcount / options.ps);
                    self._updatePagingStatus();
                    $('#raws-table').addClass('hide').empty().append(self._createTableElem(res.data.list)).removeClass('hide');
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    })
                }
            });
        },
        reRender: function(opt) {
            var options = this.options;
            _.extend(options, opt);
            this.renderTable();
        },
        _bindEvents: function() {
            this._on(this.element, {
                'click li.tab-nav-item': this._goPage,
                'click div.data-edit': this._editRaw,
                'click div.data-audit': this._auditRaw,
                'click div.page_pre': this._preGoSiblingPage,
                'click div.page_next': this._preGoSiblingPage,
                'click div.page_go': this._preGoSiblingPage,
                'click #raws-table input[name=adsettop]': this._setTop,
                'click #adpage_settop .btn-primary': this._submitSetTop,
                'click a.raw-view': this._showRawModal
            });
        },
        _createWrapperElem: function() {
            var options = this.options,
                h = [];
            h.push('<div class="mock-hd">原始内容管理</div>');
            h.push('<div class="page-content">');
            h.push('<ul class="tabs-nav">');
            h.push('<li class="tab-nav-item" data-type="2"><a>已上线</a></li>');
            h.push('<li class="tab-nav-item" data-type="1"><a>待审核</a></li>');
            h.push('<li class="tab-nav-item" data-type="0"><a>已保存</a></li>');
            h.push('<li class="tab-nav-item" data-type="4"><a>未通过审核</a></li>');
            h.push('<li class="tab-nav-item" data-type="3"><a>已删除</a></li>');
            h.push('</ul>');
            h.push('<div class="tabs-content">');
            h.push('<table class="table table-bordered table-hover" id="raws-table">');
            h.push('</table>');
            h.push('<div class="paging hide">');
            h.push('<div class="mock-btn mock-btn-white page_pre hide">&lt;</div>');
            h.push('<div class="page_num"><span class="page_current"></span><span class="num_gap">/</span><span class="page_total"></span></div>');
            h.push('<div class="mock-btn mock-btn-white page_next hide">&gt;</div>');
            h.push('<input type="text" class="form-control goto_page">');
            h.push('<div class="mock-btn mock-btn-white page_go">跳转</div>');
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            h.push('<div class="modal fade" id="raw-modal" tabindex="-1" role="dialog" aria-hidden="true">');
            h.push('<div class="modal-dialog">');
            h.push('<div class="modal-content">');
            h.push('<div class="modal-header">');
            h.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            h.push('<h4 class="modal-title" id="myModalLabel">资讯</h4>');
            h.push('</div>');
            h.push('<div class="modal-body">');
            h.push('<div id="raw-modal-loading" class="mock-loading"><div class="mock-loadingico"></div><span>正在加载 ...</span></div>');
            h.push('<div id="raw-modal-content"></div>');
            h.push('</div>');
            h.push('<div class="modal-footer">');
            h.push('<button type="button" class="btn btn-default data-cancel" data-dismiss="modal">关闭</button>');
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            h.push('</div>');
            this.element.append(h.join(''));
            this.renderTable();
            this.element.append(
                '<div class="modal fade shortmsg" id="adpage_settop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog" style="">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×' +
                '</button>' +
                '<h4 class="modal-title" id="myModalLabel">提示</h4>' +
                '</div>' +
                '<div class="modal-body">是否置顶该资讯</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
                '<button type="button" class="btn btn-primary">' +
                '确认' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
        },
        _goSiblingPage: function(pn) {
            var router = new Backbone.Router;
            router.navigate('raws/' + this.options.type + '/' + pn, {
                trigger: true
            });
            return false;
        },
        _createTableElem: function(data) {
            var options = this.options;
            switch (options.type) {
                case '0':
                case '4':
                    return this._createSaveTable(data);
                    break;
                case '1':
                case '3':
                    return this._createCommonTable(data);
                    break;
                case '2':
                    return this._createOnlineTable(data);
                    break;
            }
        },
        _createSaveTable: function(data) {
            var h = [];
            h.push('<thead><tr><th>id</th><th>内容标题</th><th>上线时间</th><th>操作</th></tr></thead>');
            h.push('<tbody>');
            if (!_.isEmpty(data)) {
                _.each(data, function(item, index) {
                    h.push('<tr><td>' + item.id + '</td><td><a class="raw-view" data-id="' + item.id + '"  data-toggle="modal" data-target="#raw-modal">' + item.title + '</a></td><td>' + _util.dateFormat(item.uptime * 1000, 'yyyy-MM-dd hh:mm') + '</td><td>');
                    h.push('<div class="mock-btn mock-btn-red  mock-btn-s data-audit" data-id="' + item.id + '">提交</div>');
                    h.push('<div class="mock-btn mock-btn-red  mock-btn-s data-edit" data-id="' + item.id + '">修改</div>');
                    h.push('</td></tr>');
                });
            } else {
                h.push('<tr><td colspan="4">没有数据</td></tr>');
            }
            h.push('</tbody>');
            return h.join('');
        },
        _createOnlineTable: function(data) {
            var h = [];
            h.push('<thead><tr><th>id</th><th>内容标题</th><th>上线时间</th><th>是否置顶</th></tr></thead>');
            h.push('<tbody>');
            if (!_.isEmpty(data)) {
                _.each(data, function(item, index) {
                    h.push('<tr><td>' + item.id + '</td><td><a class="raw-view" data-id="' + item.id + '"  data-toggle="modal" data-target="#raw-modal">' + item.title + '</a></td><td>' + _util.dateFormat(item.uptime * 1000, 'yyyy-MM-dd hh:mm') + '</td><td><input name="adsettop" type="radio" data-toggle="modal" data-target="#adpage_settop"></td></tr>');
                });
            } else {
                h.push('<tr><td colspan="4">没有数据</td></tr>');
            }
            h.push('</tbody>');
            return h.join('');
        },
        _createCommonTable: function(data) {
            var h = [];
            h.push('<thead><tr><th>id</th><th>内容标题</th><th>上线时间</th></tr></thead>');
            h.push('<tbody>');
            if (!_.isEmpty(data)) {
                _.each(data, function(item, index) {
                    h.push('<tr><td>' + item.id + '</td><td><a class="raw-view" data-id="' + item.id + '"  data-toggle="modal" data-target="#raw-modal">' + item.title + '</a></td><td>' + _util.dateFormat(item.uptime * 1000, 'yyyy-MM-dd hh:mm') + '</td></tr>');
                });
            } else {
                h.push('<tr><td colspan="3">没有数据</td></tr>');
            }
            h.push('</tbody>');
            return h.join('');
        },
        _goPage: function(event) {
            var type = $(event.target).closest('li.tab-nav-item').attr('data-type');
            var router = new Backbone.Router;
            router.navigate('raws/' + type, {
                trigger: true
            });
            return false;
        },
        _editRaw: function(event) {
            var id = $(event.target).attr('data-id'),
                router = new Backbone.Router;
            router.navigate('rawedit/' + id, {
                trigger: true
            });
            return false;
        },
        _auditRaw: function(event) {
            var options = this.options,
                id = $(event.target).attr('data-id');
            $.ajax({
                url: options.audinewsdo,
                crossDomain: true,
                dataType: 'jsonp',
                data: {
                    id: id,
                    tp: options.tp_audit
                }
            }).done(function(res) {
                if (!res.errno) {
                    $(event.target).closest('tr').remove();
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    });
                }
            });
            return false;
        },
        _setTop: function(e) {
            var title = $(e.currentTarget).closest('tr').find('td')[1].innerHTML;
            this.element.find("#adpage_settop").find('modal-body').html('是否置顶' + title);
        },
        _submitSetTop: function(e) {
            var currentTr = $('#raws-table').find('input[type=radio]:checked').closest('tr'),
                tds = currentTr.find('td'),
                id = tds[0].innerHTML,
                title = tds[1].innerHTML;
            topAudiNews(id)(function(result) {
                var data = [];
                if (!result.errno) {
                    notify({
                        text: title + '已置顶'
                    });
                    $(e.currentTarget).parent().find('button[data-dismiss=modal]').trigger('click');
                    var trs = currentTr.parent().find('tr');
                    if (trs.length > 0) {
                        currentTr[0].parentNode.insertBefore(currentTr[0], trs[0])
                    }
                } else {
                    notify({
                        tmpl: 'error',
                        text: _title + '提交置顶失败'
                    });
                }
            });

        },
        _showRawModal: function(event) {
            $('#raw-modal-content').empty();
            if ($('#raw-modal-loading').hasClass('hide')) {
                $('#raw-modal-loading').removeClass('hide');
            }
            var self = this,
                options = this.options,
                $a = $(event.target),
                id = $a.attr('data-id');
            $.ajax({
                url: options.getaudinews,
                crossDomain: true,
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(res) {
                if (!res.errno) {
                    self._createRawModalContentElem(res.data);
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    });
                }
            });
        },
        _createRawModalContentElem: function(item) {
            var h = [];
            h.push('<div class="mock-title">吐槽能量池</div>');
            h.push('<table class="table table-bordered mock-upload-table"><tbody>');
            h.push('<tr><td>标题</td><td>' + item.title + '</td></tr>');
            if (!!item.simg) {
                h.push('<tr><td>广场图</td><td><div class="upload-img-preivew mt10 ml0 hide"><img src="' + item.simg + '"></div></td></tr>');
            }
            h.push('<tr><td>摘要</td><td>' + item.desc + '</td></tr>');
            h.push('</tbody></table>');
            h.push('<div class="mock-title">吐槽放大镜</div>');
            h.push('<table class="table table-bordered mock-upload-table"><tbody>');
            if (!!item.img) {
                h.push('<tr><td>主图</td><td><div class="upload-img-preivew mt10 ml0 hide"><img src="' + item.simg + '"></div></td></tr>');
            }
            h.push('<tr><td>正文</td><td>' + _.unescape(item.content) + '</td></tr>');
            h.push('<tr><td>内容类型</td><td>');
            switch (item.type) {
                case '0':
                    h.push('<div>资讯</div>');
                    break;
                case '1':
                    h.push('<div>PK</div>');
                    if ((!!item.ext) && (!_.isEmpty(JSON.parse(item.ext)))) {
                        var ext = JSON.parse(item.ext);
                        h.push('<div class="upload-pk">');
                        h.push('<div class="upload-pk-item">甲方文案: ' + ext[0]['title'] + '</div>');
                        h.push('<div class="upload-pk-item">乙方文案: ' + ext[1]['title'] + '</div>');
                        h.push('</div>');
                    }
                    break;
                case '2':
                    h.push('<div>投票</div>');
                    if ((!!item.ext) && (!_.isEmpty(JSON.parse(item.ext)))) {
                        var ext = JSON.parse(item.ext);
                        h.push('<div class="upload-vote-box">');
                        _.each(ext, function(vote, index) {
                            h.push('<div class="upload-vote-item">' + vote.title + '</div>');
                            if (!!vote.img) {
                                h.push('<div class="upload-img-preivew"><img src="' + vote.img + '"/></div>');
                            }
                        });
                        h.push('</div>');
                    }
                    break;
            }
            h.push('</td></tr>');
            h.push('<tr><td>上线时间</td><td>' + _util.dateFormat(item.uptime * 1000, 'yyyy-MM-dd hh:mm') + '</td></tr>');
            h.push('</tbody></table>');
            h.push('');
            $('#raw-modal-loading').addClass('hide');
            $('#raw-modal-content').append(h.join(''));
        }
    });
    module.exports = $.mock.raws;
});
