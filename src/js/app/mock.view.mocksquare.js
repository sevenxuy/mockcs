define(function(require, module, exports) {
    'use strict';
    require("widget.table");
    require("widget.pageNavbar");
    // require("widget.search");

    var config = require("config"),
        _view = require("mock.view.titleBarPagecontent"),
        util = require("mock.util"),
        defaultPs = 100,
        notify = require('mock.plugin.notify'),
        getToCaoSquareUrl = function(pn, ps) {
            return util.getApiUrl({
                "name": "newslistcount",
                "params": {
                    "pn": pn,
                    "ps": ps
                }
            });
        },
        getAllReplayUrl = function(id, pn, ps) {
            return util.getApiUrl({
                'name': 'getmyallpage',
                "params": {
                    "id": id,
                    "pn": pn,
                    "ps": ps
                }
            });
        },
        getMyPageUrl = function(pn, ps) {
            return util.getApiUrl({
                "name": "mypage",
                "params": {
                    "pn": pn,
                    "ps": ps
                }
            });
        },
        getMyReplyUrl = function(id) {
            return util.getApiUrl({
                "name": "getmyreply",
                "params": {
                    "id": id
                }
            });
        },
        addReplyUrl = function(parameter) {
            return util.getApiUrl({
                "name": "add",
                "params": {
                    "data": parameter
                }
            });
        },
        addReplay = function(param) {
            var squareInstance = this;
            $.ajax({
                url: addReplyUrl(param),
                crossDomain: true,
                dataType: 'jsonp',
            }).done(function(result) {
                var data = [];
                var messagePrefix = (param.replay_id ? '回复' : '添加');
                if (!result.errno) {
                    notify({
                        text: messagePrefix + '评论成功'
                    });
                    squareInstance.element.find("#mocksquare-modal .modal-footer .btn[data-dismiss]").trigger("click");
                    var router = new Backbone.Router;
                    if (+squareInstance.currentPageNum != 0) {
                        router.navigate('mocks/square/expand/' + squareInstance.currentPageItemId + '/' + 0, {
                            trigger: true
                        });
                    } else {
                        squareInstance.renderContent();
                    }
                } else {
                    notify({
                        tmpl: "error",
                        text: messagePrefix + '评论失败'
                    });
                }
            });

        },
        getToCaoSquareData = function(pn, ps) {
            var squareInstance = this;
            $.ajax({
                url: getToCaoSquareUrl(pn, ps),
                crossDomain: true,
                dataType: 'jsonp',
            }).done(function(result) {
                var data = [];
                if (!result.errno && result.data && result.data.list.length) {
                    squareInstance.newstable.bindData(result.data.list);
                    squareInstance.newspageNav.bindData({
                        pn: pn,
                        ps: ps,
                        sum: result.data.allcount
                    });
                } else {
                    squareInstance.newstable.bindData([]);
                    squareInstance.newspageNav.bindData({
                        pn: pn,
                        ps: ps,
                        sum: 0
                    });
                }
            });
        },
        getAllReplayData = function(id, pn, ps) {
            var squareInstance = this;
            $.ajax({
                url: getAllReplayUrl(id, pn, ps),
                crossDomain: true,
                dataType: 'jsonp',
            }).done(function(result) {
                var data = [];
                if (!result.errno && result.data && result.data.list.length) {
                    squareInstance.replytable.bindData(result.data.list);
                    squareInstance.replypageNav.bindData({
                        pn: pn,
                        ps: ps,
                        sum: result.data.allcount
                    });
                } else {
                    squareInstance.replytable.bindData([]);
                    squareInstance.replypageNav.bindData({
                        pn: pn,
                        ps: ps,
                        sum: 0
                    });
                }
            });
        },
        getMyPageData = function(pn, ps) {
            var meInstance = this;
            $.ajax({
                url: getMyPageUrl(pn, ps),
                crossDomain: true,
                dataType: 'jsonp',
            }).done(function(result) {
                var data = [];
                if (!result.errno && result.data && result.data.news.length) {
                    meInstance.mytable.bindData(result.data.news);
                    meInstance.mypagenav.bindData({
                        pn: pn,
                        ps: ps,
                        sum: result.data.allcount
                    });
                } else {
                    meInstance.mytable.bindData([]);
                    meInstance.mypagenav.bindData({
                        pn: pn,
                        ps: ps,
                        sum: 0
                    });
                }
            });
        },
        getMyReplyData = function(id) {
            var meInstance = this;
            $.ajax({
                url: getMyReplyUrl(id),
                crossDomain: true,
                dataType: 'jsonp',
            }).done(function(result) {
                var data = [];
                if (!result.errno && result.data && result.data.comments.length) {
                    meInstance.myreplytable.bindData(result.data.comments);
                } else {
                    meInstance.myreplytable.bindData([]);
                }
            });
        };
    $.widget('mock.mocksquare', _view, {
        title: "快速吐槽",
        data: [{
            "key": "me",
            "value": "我"
        }, {
            "key": "square",
            "value": "广场"
        }],
        newstable: {},
        newspageNav: {},
        newssearch: {},
        replytable: {},
        replypageNav: {},
        replysearch: {},
        renderContent: function() {
            this.currentPageNum = +(isNaN(this.options.pageStatus.pn) ? 0 : this.options.pageStatus.pn);
            this.currentPageItemId = this.options.pageStatus.itemid;
            if (/^#mocks\/square|^mocks\/square\//.test(location.hash)) {
                if (this.options.pageStatus.status == "unexpand") {
                    // this.newssearch.element.show();
                    this.newstable.element.show();
                    this.newspageNav.element.show();
                    // this.replysearch.element.hide();
                    this.replytable.element.hide();
                    this.replypageNav.element.hide();
                    this.$btnReplyNew.hide();
                    getToCaoSquareData.call(this, this.currentPageNum, defaultPs);
                } else if (this.options.pageStatus.status == 'expand') {
                    // this.replysearch.element.show();
                    this.replytable.element.show();
                    this.replypageNav.element.show();
                    this.$btnReplyNew.show();
                    // this.newssearch.element.hide();
                    this.newstable.element.hide();
                    this.newspageNav.element.hide();
                    getAllReplayData.call(this, this.currentPageItemId, this.currentPageNum, defaultPs);
                }
                // this.mysearch.element.hide();
                this.mytable.element.hide();
                this.mypagenav.element.hide();
                // this.myreplysearch.element.hide();
                this.myreplytable.element.hide();
                this.$btnMyReplayNew.hide();
            } else if (/^#mocks\/me|^mocks\/me\//.test(location.hash)) {
                if (this.options.pageStatus.status == "unexpand") {
                    // this.mysearch.element.show();
                    this.mytable.element.show();
                    this.mypagenav.element.show();
                    // this.myreplysearch.element.hide();
                    this.myreplytable.element.hide();
                    this.$btnMyReplayNew.hide();
                    getMyPageData.call(this, this.currentPageNum, defaultPs);
                } else if (this.options.pageStatus.status == 'expand') {
                    // this.myreplysearch.element.show();
                    this.myreplytable.element.show();
                    this.replypageNav.element.show();
                    this.$btnMyReplayNew.show();
                    // this.mysearch.element.hide();
                    this.mytable.element.hide();
                    this.mypagenav.element.hide();
                    // getMyReplyData.call(this, this.currentPageItemId, this.currentPageNum, defaultPs);
                    getAllReplayData.call(this, this.currentPageItemId, this.currentPageNum, defaultPs);
                }
                // this.newssearch.element.hide();
                this.newstable.element.hide();
                this.newspageNav.element.hide();
                // this.replysearch.element.hide();
                this.replytable.element.hide();
                this.replypageNav.element.hide();
                this.$btnReplyNew.hide();
            }

        },
        _onCreate: function() {
            var squareInstance = this;

            var $tabsContent = squareInstance.$tabsContent;

            //square unexpand
            // squareInstance.newssearch = new $.widget.search({});
            squareInstance.newstable = new $.widget.table({
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
                        key: 'tu_counts',
                        text: '吐槽数'
                    }, {
                        type: 'operation',
                        text: '',
                        btns: [{
                            'type': 'button',
                            'text': '展开',
                            'className': 'mock-btn mock-btn-red  mock-btn-s btnexpand border0'
                        }]
                    }]
                },
                events: {
                    "click .btnexpand": function(e) {
                        var target = e.currentTarget;
                        var currentTr = $(target).closest("tr")[0];
                        var trs = $(target).closest("tbody").find("tr");
                        var index = _.indexOf(trs, currentTr);
                        var currentdata = squareInstance.newstable.getData()[index];
                        var router = new Backbone.Router;
                        router.navigate('mocks/square/expand/' + currentdata.id + '/' + 0, {
                            trigger: true
                        });
                        return false;
                    }
                }
            });

            squareInstance.newspageNav = $.widget.pageNavbar({
                "pn": squareInstance.currentPageNum,
                "ps": defaultPs,
                "onPreClick": function onPreClick(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/square/unexpand/' + pn, {
                        trigger: true
                    });
                    return false;
                    // getToCaoSquareData.call(squareInstance, pn, defaultPs);
                },
                "onNextClick": function onNextClick(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/square/unexpand/' + pn, {
                        trigger: true
                    });
                    return false;
                    // getToCaoSquareData.call(squareInstance, pn, defaultPs);
                },
                "onGoTo": function onGoTo(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/square/unexpand/' + pn, {
                        trigger: true
                    });
                    return false;
                    //getToCaoSquareData.call(squareInstance, pn, defaultPs);
                }
            });
            // squareInstance.newssearch.element.hide().appendTo($tabsContent);
            squareInstance.newstable.element.hide().appendTo($tabsContent);
            squareInstance.newspageNav.element.hide().appendTo($tabsContent);


            //square expand
            squareInstance.$btnReplyNew = $('<div class="mock-btn mock-btn-red mock-add" id="btnReplyNew" data-toggle="modal" data-target="#mocksquare-modal">+ 新增</div>').appendTo($tabsContent);
            // squareInstance.replysearch = new $.widget.search({});
            squareInstance.replytable = new $.widget.table({
                schema: {
                    cols: [{
                        type: 'text',
                        key: 'user_name',
                        text: '用户'
                    }, {
                        type: 'number',
                        key: 'like_count',
                        text: '点赞数'
                    }, {
                        type: 'number',
                        key: 'normal_content',
                        text: '回复内容'
                    }, {
                        type: 'date',
                        key: 'stime',
                        text: '上线时间'
                    }, {
                        type: 'operation',
                        text: '',
                        btns: [{
                            'type': 'button',
                            'text': '回复',
                            'className': 'mock-btn mock-btn-red  mock-btn-s btnreply border0',
                            'attrs': {
                                'data-toggle': 'modal',
                                'data-target': '#mocksquare-modal'
                            }
                        }]
                    }]
                },
                events: {
                    "click .btnreply": function(e) {
                        var currentTr = $(e.currentTarget).closest("tr")[0];
                        var index = $(currentTr).parent().find("tr").index(currentTr);
                        var currentItem = squareInstance.replytable.getData()[index];
                        squareInstance.currentReplyId = currentItem.rid || currentItem.id;
                        squareInstance.$tabsContent.find("#mocksquare-modal h4.modal-title").html("回复:" + currentItem.content);
                        squareInstance.$tabsContent.find("#mocksquare-modal textarea").val('');
                        squareInstance.$tabsContent.find("#mocksquare-modal input[type=checkbox]")[0].checked = false;
                        squareInstance.$tabsContent.find("#mocksquare-modal .modal-body .errorinfo").empty().hide();
                    }
                }
            });

            squareInstance.replypageNav = $.widget.pageNavbar({
                "pn": this.currentPageNum,
                "ps": defaultPs,
                "onPreClick": function onPreClick(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/square/expand/' + squareInstance.currentPageItemId + '/' + pn, {
                        trigger: true
                    });
                    return false;
                    // getAllReplayData.call(squareInstance, squareInstance.currentPageItemId, pn, defaultPs);
                },
                "onNextClick": function onNextClick(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/square/expand/' + squareInstance.currentPageItemId + '/' + pn, {
                        trigger: true
                    });
                    return false;
                },
                "onGoTo": function onGoTo(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/square/expand/' + squareInstance.currentPageItemId + '/' + pn, {
                        trigger: true
                    });
                    return false;
                }
            });
            // squareInstance.replysearch.element.hide().appendTo($tabsContent);
            squareInstance.replytable.element.hide().appendTo($tabsContent);
            squareInstance.replypageNav.element.hide().appendTo($tabsContent);

            //me unexpand
            // squareInstance.mysearch = new $.widget.search({});
            squareInstance.mytable = new $.widget.table({
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
                            'className': 'mock-btn mock-btn-red  mock-btn-s btnexpand border0'
                        }]
                    }]
                },
                events: {
                    "click .btnexpand": function(e) {
                        var target = e.currentTarget;
                        var currentTr = $(target).closest("tr")[0];
                        var trs = $(target).closest("tbody").find("tr");
                        var index = _.indexOf(trs, currentTr);
                        var currentdata = squareInstance.mytable.getData()[index];
                        var router = new Backbone.Router;
                        router.navigate('mocks/me/expand/' + currentdata.id + '/' + 0, {
                            trigger: true
                        });
                        return false;
                    }
                }
            });

            squareInstance.mypagenav = $.widget.pageNavbar({
                "pn": squareInstance.currentPageNum,
                "ps": defaultPs,
                "onPreClick": function onPreClick(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/me/unexpand/' + pn, {
                        trigger: true
                    });
                    return false;
                },
                "onNextClick": function onNextClick(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/me/unexpand/' + pn, {
                        trigger: true
                    });
                    return false;
                },
                "onGoTo": function onGoTo(pn) {
                    var router = new Backbone.Router;
                    router.navigate('mocks/me/unexpand/' + pn, {
                        trigger: true
                    });
                    return false;
                }
            });
            // squareInstance.mysearch.element.hide().appendTo($tabsContent);
            squareInstance.mytable.element.hide().appendTo($tabsContent);
            squareInstance.mypagenav.element.hide().appendTo($tabsContent);


            //me expand
            squareInstance.$btnMyReplayNew = $('<div class="mock-btn mock-btn-red mock-add" id="btnMyReplay" data-toggle="modal" data-target="#mocksquare-modal">+ 新增</div>').appendTo($tabsContent);
            // squareInstance.myreplysearch = new $.widget.search({});
            squareInstance.myreplytable = new $.widget.table({
                schema: {
                    cols: [{
                        type: 'text',
                        key: 'user_name',
                        text: '用户'
                    }, {
                        type: 'number',
                        key: 'like_count',
                        text: '点赞数'
                    }, {
                        type: 'text',
                        key: 'content',
                        text: '回复内容'
                    }, {
                        type: 'date',
                        key: 'stime',
                        text: '上线时间'
                    }, {
                        type: 'operation',
                        text: '',
                        btns: [{
                            'type': 'button',
                            'text': '回复',
                            'className': 'mock-btn mock-btn-red  mock-btn-s btnreply border0',
                            'attrs': {
                                'data-toggle': 'modal',
                                'data-target': '#mocksquare-modal'
                            }
                        }]
                    }]
                },
                events: {
                    "click .btnreply": function(e) {
                        var currentTr = $(e.currentTarget).closest("tr")[0];
                        var index = $(currentTr).parent().find("tr").index(currentTr);
                        var currentItem = squareInstance.myreplytable.getData()[index];
                        squareInstance.currentReplyId = currentItem.rid;
                        squareInstance.$tabsContent.find("#mocksquare-modal h4.modal-title").html("回复:" + currentItem.content);
                        squareInstance.$tabsContent.find("#mocksquare-modal textarea").val('');
                        squareInstance.$tabsContent.find("#mocksquare-modal input[type=checkbox]")[0].checked = false;
                        squareInstance.$tabsContent.find("#mocksquare-modal .modal-body .errorinfo").empty().hide();
                    }
                }
            });

            //squareInstance.myreplysearch.element.hide().appendTo($tabsContent);
            squareInstance.myreplytable.element.hide().appendTo($tabsContent);

            var replaydialogTmpl =
                '<div class="modal fade" id="mocksquare-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title" id="myModalLabel">根据操作决定</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<span class="errorinfo"></span>' +
                '<textarea placeholder="回复吐槽" class="form-control" maxlength="15"></textarea><span class="mock-input-tip" style="margin-top:-35px;margin-right:25px;">最多15个字符</span>' +
                '<div class="checkbox"><label><input type="checkbox"> 匿名发表</label>' +
                '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
                '<button type="button" class="btn btn-primary">发表</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            $tabsContent.append(replaydialogTmpl);
        },
        events: {
            "click #btnReplyNew": function() {
                this.currentReplyId = null;
                this.$tabsContent.find("#mocksquare-modal h4.modal-title").html('新增广场吐槽');
                this.$tabsContent.find("#mocksquare-modal textarea").val('');
                this.$tabsContent.find("#mocksquare-modal input[type=checkbox]")[0].checked = false;
                this.$tabsContent.find("#mocksquare-modal .modal-body .errorinfo").empty().hide();
            },
            "click #btnMyReplay": function() {
                this.currentReplyId = null;
                this.$tabsContent.find("#mocksquare-modal h4.modal-title").html('新增我的吐槽');
                this.$tabsContent.find("#mocksquare-modal textarea").val('');
                this.$tabsContent.find("#mocksquare-modal input[type=checkbox]")[0].checked = false;
                this.$tabsContent.find("#mocksquare-modal .modal-body .errorinfo").empty().hide();
            },
            "click #mocksquare-modal .btn-primary": function() {
                var squareInstance = this;
                var $replyContent = this.$tabsContent.find("#mocksquare-modal textarea");
                var $anmonyous = this.$tabsContent.find("#mocksquare-modal input[type=checkbox]");
                var username = "";
                if ($anmonyous[0].checked) {
                    username = "浏览器网友";
                } else {
                    username = window.$userinfo.uname;
                }
                var param = {
                    "newsid": this.currentPageItemId,
                    "user": username,
                    "img": "http://himg.baidu.com/sys/portraitl/item/" + window.$userinfo.uc,
                    "content": $replyContent.val()
                }
                if (this.currentReplyId) {
                    param.reply_id = this.currentReplyId;
                }
                if (!param.content.trim()) {
                    this.$tabsContent.find("#mocksquare-modal .modal-body .errorinfo").show().html("请填写回复吐槽内容");
                } else {
                    this.$tabsContent.find("#mocksquare-modal .modal-body .errorinfo").empty().hide()
                    addReplay.call(this, JSON.stringify(param));
                }
            }
        }
    });
    module.exprots = $.mock.mocksquare;
});
