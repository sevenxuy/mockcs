define(function(require, exports, module) {
    'use strict';
    var _view = require('mock.view'),
        notify = require('mock.plugin.notify'),
        _util = require('mock.util'),
        _currentDes = '',
        apihost = 'http://' + _util.getApiHost(),
        getAddaudiuserUrl = function(desc) {
            return _util.getApiUrl({
                "name": "addaudiuser",
                "params": {
                    "desc": desc
                }
            });
        },
        topAudiNewsUrl = function(id) {
            return _util.getApiUrl({
                "name": "topaudinews",
                "params": {
                    "id": id
                }
            });
        },
        addaudiuser = function(desc) {
            var squareInstance = this;
            return $.ajax({
                url: getAddaudiuserUrl(desc),
                crossDomain: true,
                dataType: 'jsonp',
            }).done;
        },
        topAudiNews = function(id) {
            var squareInstance = this;
            return $.ajax({
                url: topAudiNewsUrl(id),
                crossDomain: true,
                dataType: 'jsonp',
            }).done;
        };
    $.widget('mock.homepage', _view, {
        options: {
            getaudinewsbyvid: apihost + '/mock/getaudinewsbyvid?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            addaudiuser: apihost + '/mock/addaudiuser?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            getmyuserlist: apihost + '/mock/getmyuserlist?pn=0&ps=10&ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?',
            type: 2, //raw online
            ps: 4
        },
        _create: function() {
            this.render();
            this._bindEvents();
            this.element.data('widgetCreated', true);
        },
        render: function() {
            this._createWrapperElem();
            if (this.element.hasClass('hide')) {
                this.element.removeClass('hide').addClass('current');
            }

        },
        _bindEvents: function() {
            this._on(this.element, {
                'click div.page_pre': this._preGoSiblingPage,
                'click div.page_next': this._preGoSiblingPage,
                'click div.page_go': this._preGoSiblingPage,
                'click .mock-submit': this._submitUserDesc,
                'click input[name=settop]': this._setTop,
                'click #homepage_settop .btn-primary': this._submitSetTop,
                'keyup #homnepage-desc': this._onDescChange
            });
        },
        reRender: function(opt) {
            var options = this.options;
            _.extend(options, opt);
            this.renderTable();
        },
        _setTop: function(e) {
            var title = $(e.currentTarget).closest('tr').find('td')[1].innerHTML;
            this.element.find("#homepage_settop").find('modal-body').html('是否置顶' + title);
        },
        _onDescChange: function() {
            if ($('#homnepage-desc').val() == _currentDes) {
                this.element.find('#btnSubmitDes').attr('disabled', 'disabled');
            } else {
                this.element.find('#btnSubmitDes').removeAttr('disabled')
            }
        },
        _submitSetTop: function(e) {
            var currentTr = $('#hp-rawonline').find('input[type=radio]:checked').closest('tr'),
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
                    $(e.currentTarget).parent().find('button[data-dismiss=modal]').trigger('click');
                    notify({
                        tmpl: 'error',
                        text: title + '提交置顶失败'
                    });
                }
            });

        },
        _createWrapperElem: function() {
            var h = [];

            var imgBase64Url = '',
                currentUserName = '';
            if (window.$userinfo) {
                if (window.$userinfo.uc)
                    imgBase64Url = "http://himg.baidu.com/sys/portraitl/item/" + window.$userinfo.uc;
                if (window.$userinfo.uname)
                    currentUserName = window.$userinfo.uname;
            }
            h.push('<div class="mock-hd">个人主页设置</div>');
            h.push('<div class="page-content">');
            h.push('<div class="mock-title">公开信息</div>');
            h.push('<table class="table table-bordered mock-upload-table"><tbody>');
            h.push('<tr><td>头像</td><td style="position:relative;"><div class="hp-avatar"><img src="' + imgBase64Url + '?t=' + Date.now() + '"></div><a href="http://web.im.baidu.com" style="position: absolute;bottom: 3px;display: inline-block;margin-left: 10px;">修改</a></td></tr>');
            h.push('<tr><td>名称</td><td>' + currentUserName + '<a href="http://web.im.baidu.com" style="margin-left: 10px;">修改</a></td></tr>');
            h.push('<tr style="display:none;"><td>状态</td><td id="myStatus"></td></tr>');
            h.push('<tr style="display:none;"><td>修改时间</td><td id="mySubmitTime"></td></tr>');
            h.push('<tr><td>个人简介</td><td><div class="mock-textarea-box"><span class="errorinfo" for="homnepage-desc" style="display:none"></span><textarea class="form-control upload-desc" cols="3" maxlength="25" id="homnepage-desc"></textarea><span class="mock-input-tip">最多25个字符</span></div></td>');
            h.push('</tbody>');
            h.push('</table>');
            h.push('<div class="operationbar h40"><button class="mock-btn mock-btn-red mock-submit border0 fr" id="btnSubmitDes" disabled="disabled">确认提交</button></div>');
            h.push('<div class="mock-title">个人主页资讯列表</div>');
            h.push('<table class="table table-bordered table-hover" id="hp-rawonline">');
            h.push('</tbody></table>');
            h.push('<div class="paging hide">');
            h.push('<div class="mock-btn mock-btn-white page_pre hide">&lt;</div>');
            h.push('<div class="page_num"><span class="page_current"></span><span class="num_gap">/</span><span class="page_total"></span></div>');
            h.push('<div class="mock-btn mock-btn-white page_next hide">&gt;</div>');
            h.push('<input type="text" class="form-control goto_page">');
            h.push('<div class="mock-btn mock-btn-white page_go">跳转</div>');
            h.push('</div>');
            h.push('</div>');
            this.element.append(h.join(''));
            this.renderTable();
        },
        renderTable: function() {
            var self = this,
                options = this.options;
            self.element.append(
                '<div class="modal fade shortmsg" id="homepage_settop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
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
            this._updateWrapperElemStatus(options.type);
            this._getLastestMyInfo();
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
                    $('#hp-rawonline').addClass('hide').empty().append(self._createOnlineTable(res.data.list)).removeClass('hide');
                } else {
                    notify({
                        tmpl: 'error',
                        text: res.error
                    })
                }
            });
        },
        _createOnlineTable: function(data) {
            var h = [];
            h.push('<thead><tr><th>id</th><th>内容标题</th><th>上线时间</th><th>是否置顶</th></tr></thead>');
            h.push('<tbody>');
            if (!_.isEmpty(data)) {
                _.each(data, function(item, index) {
                    h.push('<tr><td>' + item.id + '</td><td>' + item.title + '</td><td>' + _util.dateFormat(item.uptime * 1000, 'yyyy-MM-dd hh:mm') + '</td><td><input name="settop" type="radio" data-toggle="modal" data-target="#homepage_settop"/></td></tr>');
                });
            } else {
                h.push('<tr><td colspan="4">没有数据</td></tr>');
            }
            h.push('</tbody>');
            return h.join('');
        },
        _goSiblingPage: function(pn) {
            var router = new Backbone.Router;
            router.navigate('homepage/' + pn, {
                trigger: true
            });
            return false;
        },
        _submitUserDesc: function(e) {
            var $taDesc = this.element.find('#homnepage-desc'),
                $errorInfo = $taDesc.parent().find('span.errorinfo[for=homnepage-desc]'),
                $btnSubmit = this.element.find('#btnSubmitDes'),
                $status = this.element.find('#myStatus'),
                $stime = this.element.find('#mySubmitTime');

            var val = $taDesc.val().trim()
            if (val.length == 0) {
                $errorInfo.show().html('请填写描述');
            } else {
                $errorInfo.hide().html('');
                addaudiuser(val)(function(result) {
                    var data = [];
                    if (!result.errno) {
                        $status.html('<i class="wait">待审核</i>');
                        $stime.html(_util.dateFormat((new Date()).getTime(), 'yyyy-MM-dd hh:mm'));
                        $btnSubmit.attr('disabled', 'disabled');
                        notify({
                            text: '提交简介成功，待审核'
                        });
                    } else {
                        notify({
                            tmpl: 'error',
                            text: '提交简介失败'
                        });
                    }
                });
            }
        },
        _getLastestMyInfo: function() {
            var self = this;
            $.ajax({
                url: self.options.getmyuserlist,
                crossDomain: true,
                dataType: 'jsonp',
                data: {
                    pn: self.options.pn,
                    ps: self.options.ps
                }
            }).done(function(res) {
                var $myStatus = self.element.find('#myStatus'),
                    $mySubmitTime = self.element.find('#mySubmitTime'),
                    $myDesc = self.element.find('#homnepage-desc');
                if (!res.errno) {
                    if (res.data.length > 0) {
                        $myStatus.parent().show();
                        $mySubmitTime.parent().show();
                        switch (res.data[0].state) {
                            case '0':
                                $myStatus.html('<i class="wait">待审核<\/i>');
                                break;
                            case '1':
                                $myStatus.html('<i class="failed">拒绝<\/i>');
                                break;
                            case '2':
                                $myStatus.html('<i class="pass">通过<\/i>');
                                break;
                        }
                        $mySubmitTime.html(_util.dateFormat(+(res.data[0].stime) * 1000, 'yyyy-MM-dd hh:mm'));
                        $myDesc.val(res.data[0].desc);
                        _currentDes = res.data[0].desc;
                    } else {
                        $myStatus.parent().hide();
                        $mySubmitTime.parent().hide();
                        $myDesc.val('');
                    }
                } else {
                    $myStatus.parent().hide();
                    $mySubmitTime.parent().hide();
                    notify({
                        tmpl: 'error',
                        text: res.error
                    })
                }
            });
        }
    });
    module.exports = $.mock.homepage;
});
