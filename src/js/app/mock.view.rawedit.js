define(function(require, exports, module) {
            'use strict';
            require('mock.view.nav');
            var _view = require('mock.view'),
                _util = require('mock.util'),
                notify = require('mock.plugin.notify'),
                autosize = require('mock.plugin.autosize.min'),
                apihost = 'http://'+_util.getApiHost();

            $.widget('mock.rawedit', _view, {
                    options: {
                        addaudinews: apihost+'/mock/addaudinews',
                        updateaudinews: apihost+'/mock/updateaudinews',
                        getaudinews: apihost+'/mock/getaudinews?ua=bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2&cuid=80000000000000000000000000000000|0&fn=?'
                    },
                    render: function(opt) {
                        var self = this,
                            options = this.options;
                        _.extend(options, opt);
                        self.routePath = 'raws/0';
                        if (options.id) {
                            $.ajax({
                                url: options.getaudinews,
                                crossDomain: true,
                                dataType: 'json',
                                data: {
                                    id: options.id
                                }
                            }).done(function(res) {
                                if (!res.errno) {
                                    self._createRawElem(res.data);
                                    self.routePath = 'raws/'+res.data.state;
                                } else {
                                    notify({
                                        tmpl: 'error',
                                        text: res.error
                                    });
                                }
                            });
                        } else {
                            this._createBlankElem();

                        }
                    },
                    reRender: function(opt) {
                        this.element.addClass('hide').empty();
                        this.render(opt);
                    },
                    _createBlankElem: function() {
                        var h = [];
                        h.push('<div class="mock-hd">原始内容上传</div>');
                        h.push('<div class="page-content">');
                        h.push('<div class="mock-title">吐槽能量池</div>');
                        h.push('<table class="table table-bordered mock-upload-table"><tbody>');
                        h.push('<tr>'+
                                        '<td>标题*</td>' +
                                        '<td>' +
                                            '<span class="errorinfo" for="upload-title" style="display:none;"></span>' +
                                            '<div class="mock-input-box">' +
                                                '<input type="text" maxlength="18" class="form-control" id="upload-title">' +
                                                '<span class="mock-input-tip">最多18字符</span>'+
                                            '</div>'+
                                        '</td >'+
                                    '</tr>'+
                                    '<tr>'+
                                            '<td>广场图</td>'+
                                            '<td>'+
                                                '<div class="bg-warning">图片尺寸要求：最小宽度640px， 最大高度1080px，宽高比在1~2之间， 最佳宽高比是3:2。</div>'+
                                                '<div class="upload-img-box">'+
                                                    '<div class="upload-img">'+
                                                        '<span class="errorinfo" for="upload-simg" style="display:none;"></span>'+
                                                        '<div class="mock-btn mock-btn-red upload-img-btn inlineb">上传广场图</div>'+
                                                        '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite" id="upload-simg" readonly="readonly" style="resize: vertical;"/>'+
                                                        '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide"/>'+
                                                    '</div>'+
                                                    '<div class="upload-img-preivew mt10 ml0 hide"></div>'+
                                                '</div>'+
                                            '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>摘要*</td>'+
                                        '<td>'+
                                            '<div class="mock-textarea-box">'+
                                                '<span class="errorinfo" for="upload-desc" style="display:none;"></span>'+
                                                '<textarea class="form-control upload-desc" cols="3" maxlength="100" id="upload-desc"></textarea>'+
                                                '<span class="mock-input-tip">最多100字符</span>'+
                                            '</div>'+
                                        '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>'+
                                '<div class="mock-title">吐槽放大镜</div>'+
                                '<table class="table table-bordered mock-upload-table">'+
                                    '<tr>'+
                                        '<td>主图</td>'+
                                        '<td>'+
                                            '<div class="bg-warning">图片尺寸要求：最小宽度440px，最大宽度780px；最小高度290px，最大高度2048px，不超过100K。</div>'+
                                            '<div class="upload-img-box">'+
                                                '<div class="upload-img">'+
                                                    '<span class="errorinfo" for="upload-img" style="display:none;"></span>'+
                                                    '<div class="mock-btn mock-btn-red upload-img-btn inlineb">上传主图</div>'+
                                                    '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite" readonly="readonly" id="upload-img"/>'+
                                                    '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide">'+
                                                '</div>'+
                                                '<div class="upload-img-preivew mt10 ml0 hide"></div>'+
                                            '</div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>正文*</td>'+
                                        '<td>'+
                                            '<span class="errorinfo" for="upload-content" style="display:none;"></span>'+
                                            '<textarea id="upload-content" class="form-control"></textarea>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td>内容类型</td>'+
                                        '<td>'+
                                        '<select class="form-control" id="upload-type">'+
                                            '<option value="0" selected="selected">资讯</option>'+
                                            '<option value="1">PK</option>'+
                                            '<option value="2">投票</option>'+
                                        '</select>'+
                                        '<div class="upload-pk hide" id="upload-pk">'+
                                            '<div class="upload-pk-item">甲方文案 '+
                                                '<div class="mock-input-box">'+
                                                    '<input type="text" maxlength="7" class="form-control" >'+
                                                    '<span class="mock-input-tip">最多7字符</span>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="upload-pk-item">乙方文案 '+
                                                '<div class="mock-input-box">'+
                                                '<input type="text" maxlength="7" class="form-control" />'+
                                                '<span class="mock-input-tip">最多7字符</span>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="upload-vote hide" id="upload-vote">'+
                                        '<div class="upload-vote-box" id="upload-vote-box">'+
                                            '<div class="upload-vote-item">'+
                                                '<div class="mock-input-box">'+
                                                    '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                    '<input type="text" maxlength="20" class="form-control upload-vote-title" placeholder="若配图限6字符">'+
                                                    '<span class="mock-input-tip">最多20字符</span>'+
                                                '</div>'+
                                                '<div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>'+
                                                '<div class="upload-img-box-wrapper hide">'+
                                                    '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                    '<div class="upload-img-box">'+
                                                        '<div class="upload-img">'+
                                                            '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                            '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                            '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                            '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite upload-vote-img" readonly="readonly">'+
                                                            '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide"/>'+
                                                        '</div>'+
                                                        '<div class="upload-img-preivew mt10 ml0 hide"></div>'+
                                                    '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="upload-vote-item">'+
                                                    '<div class="mock-input-box">'+
                                                        '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                        '<input type="text" maxlength="20" class="form-control upload-vote-title" placeholder="若配图限6字符">'+
                                                        '<span class="mock-input-tip">最多20字符</span>'+
                                                    '</div>'+
                                                    '<div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>'+
                                                    '<div class="upload-img-box-wrapper hide">'+
                                                        '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                        '<div class="upload-img-box">'+
                                                            '<div class="upload-img">'+
                                                                '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                                '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                                '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                                '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite upload-vote-img" readonly="readonly">'+
                                                                '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide">'+
                                                            '</div>'+
                                                            '<div class="upload-img-preivew mt10 ml0 hide"></div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="upload-vote-item">'+
                                                '<div class="mock-input-box">'+
                                                    '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                    '<input type="text" maxlength="20" class="form-control upload-vote-title" placeholder="若配图限6字符"/>'+
                                                    '<span class="mock-input-tip">最多20字符</span>'+
                                                '</div>'+
                                                '<div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>'+
                                                '<div class="upload-img-box-wrapper hide">'+
                                                    '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                    '<div class="upload-img-box">'+
                                                        '<div class="upload-img">'+
                                                            '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                            '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                            '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                            '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite upload-vote-img" readonly="readonly">'+
                                                            '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide">'+
                                                        '</div>'+
                                                        '<div class="upload-img-preivew mt10 ml0 hide"></div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="mock-btn mock-btn-red" id="upload-vote-additem">+ 添加投票观点</div>'+
                                        '</div>'+
                                    '</td>'+
                                '</tr>'+ 
                                '<tr>'+
                                    '<td>上线时间*</td>'+
                                    '<td>'+
                                        '<span class="errorinfo" for="upload-uptime" style="display:none;"></span>'+
                                        '<input class="form-control" type="text" id="upload-uptime">'+
                                    '</td>'+
                                '</tr>'+
                            '</table>'+
                            '<div class="mock-center-box">'+
                                '<div class="mock-btn mock-btn-red" id="upload-submit">保存</div>'+
                                '<div class="mock-btn mock-btn-red" id="upload-saveandsubmit" data-review="true">保存并提交</div>'+
                            '</div>'+
                        '</div>'); 
                            this.element.append(h.join(''));
                                $('#upload-content').Editor(); 
                                $('#upload-uptime').datetimepicker({
                                    format: 'Y-m-d H:i',
                                    lang: 'ch',
                                    yearStart: 2015,
                                    yearEnd: 2020,
                                    minDate: '-1970/01/01'
                                });
                                if (this.element.hasClass('hide')) {
                                    this.element.removeClass('hide').addClass('current');
                                }
                            },
                            _createRawElem: function(item) {
                                var h = [],
                                    ext;
                                h.push(
                                    '<div class="mock-hd">原始内容编辑: [' + item.id + ']</div>'+
                                    '<div class="page-content">'+
                                        '<div class="mock-title">吐槽能量池</div>'+
                                        '<table class="table table-bordered mock-upload-table">'+
                                            '<tbody>'+
                                                '<tr>'+
                                                    '<td>标题*</td>'+
                                                    '<td>'+
                                                        '<div class="mock-input-box">'+
                                                            '<input type="text" maxlength="18" class="form-control" id="upload-title" value="' + item.title + '"/>'+
                                                            '<span class="mock-input-tip">最多18字符</span>'+
                                                        '</div>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>广场图</td>'+
                                                    '<td>'+
                                                        '<div class="bg-warning">图片尺寸要求：最小宽度640px， 最大高度1080px，宽高比在1~2之间， 最佳宽高比是3:2。</div>'+
                                                        '<div class="upload-img-box">'+
                                                            '<div class="upload-img">');
                                if (!!item.simg) {
                                    h.push(
                                                                '<div class="mock-btn mock-btn-red upload-img-btn inlineb>上传广场图</div>'+
                                                                    '<span class="errorinfo" for="upload-simg" style="display:none;"></span>'+
                                                                    '<input placeholder="图片链接"  type="text"  class="form-control upload-img-tx  inlineb bgwhite" id="upload-simg" value=' + item.simg + '>'+
                                                                    '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide">'+
                                                                '</div>'+
                                                                '<div class="upload-img-preivew ml0 mt10">'+
                                                                    '<img src="' + item.simg + '" />'+
                                                                '</div>');
                                } else {
                                    h.push(
                                                                '<div class="mock-btn mock-btn-red upload-img-btn inlineb">上传广场图</div>'+
                                                                    '<span class="errorinfo" for="upload-simg" style="display:none;"></span>'+
                                                                    '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite" id="upload-simg" readonly="readonly">'+
                                                                    '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide">'+
                                                                '</div>'+
                                                                '<div class="upload-img-preivew ml0 mt10 hide"></div>');
                                }
                                h.push(
                                                            '</div>'+
                                                        '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td>摘要*</td>'+
                                                        '<td>'+
                                                            '<div class="mock-textarea-box">'+
                                                                '<span class="errorinfo" for="upload-desc" style="display:none;"></span>'+
                                                                '<textarea class="form-control upload-desc" cols="3" maxlength="100" id="upload-desc">' + item.desc + '</textarea>'+
                                                                '<span class="mock-input-tip">最多100字符</span>'+
                                                            '</div>'+
                                                        '</td>'+
                                                    '</tr>'+
                                                '</tbody>'+
                                            '</table>'+
                                                '<div class="mock-title">吐槽放大镜</div>'+
                                                    '<table class="table table-bordered mock-upload-table">'+
                                                    '<tr>'+
                                                        '<td>主图</td>'+
                                                        '<td>'+
                                                            '<div class="bg-warning">图片尺寸要求：最小宽度440px，最大宽度780px；最小高度290px，最大高度2048px，不超过100K。</div>'+
                                                            '<div class="upload-img-box">'+
                                                                '<div class="upload-img">');
                                if (!!item.img) {
                                    h.push(
                                                                    '<div class="mock-btn mock-btn-red upload-img-btn inlineb">上传主图</div>'+
                                                                        '<span class="errorinfo" for="upload-img" style="display:none;"></span>'+
                                                                        '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite" readonly="readonly" id="upload-img" value="' + item.img + '"/>'+
                                                                        '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide">'+
                                                                    '</div>'+
                                                                    '<div class="upload-img-preivew ml0 mt10">'+
                                                                        '<img src="' + item.img + '" />'+
                                                                    '</div>');
                                } else {
                                    h.push(
                                                                    '<div class="mock-btn mock-btn-red upload-img-btn inlineb">上传主图</div>'+
                                                                        '<span class="errorinfo" for="upload-img" style="display:none;"></span>'+
                                                                        '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite" readonly="readonly" id="upload-img"/>'+
                                                                        '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide">'+
                                                                    '</div>'+
                                                                    '<div class="upload-img-preivew mt10 ml0 hide">'+
                                                                    '</div>');
                                }
                                h.push(
                                                                '</div>'+
                                                            '</div>'+
                                                        '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td>正文*</td>'+
                                                        '<td>'+
                                                            '<span class="errorinfo" for="upload-content" style="display:none;"></span>'+
                                                            '<textarea id="upload-content" class="form-control"></textarea>'+
                                                        '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td>内容类型</td>'+
                                                        '<td>'+
                                                            '<select class="form-control" id="upload-type">'+
                                                                '<option value="0">资讯</option>'+
                                                                '<option value="1">PK</option>'+
                                                                '<option value="2">投票</option>'+
                                                            '</select>'+
                                                            '<div class="upload-pk hide" id="upload-pk">');
                                if ((item.type == '1') && (!!item.ext) && (!_.isEmpty(JSON.parse(item.ext)))) {
                                    ext = JSON.parse(item.ext);
                                    h.push(
                                                                '<div class="upload-pk-item">甲方文案 '+
                                                                    '<div class="mock-input-box">'+
                                                                        '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                                        '<input type="text" maxlength="7" class="form-control" value="' + ext[0]['title'] + '">'+
                                                                        '<span class="mock-input-tip">最多7字符</span>'+
                                                                    '</div>'+
                                                                '</div>'+
                                                                '<div class="upload-pk-item">乙方文案 '+
                                                                    '<div class="mock-input-box">'+
                                                                        '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                                        '<input type="text" maxlength="7" class="form-control" value="' + ext[1]['title'] + '">'+
                                                                        '<span class="mock-input-tip">最多7字符</span>'+
                                                                    '</div>'+
                                                                '</div>');
                                } else {
                                    h.push(
                                                                '<div class="upload-pk-item">甲方文案'+
                                                                    '<div class="mock-input-box">'+
                                                                        '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                                        '<input type="text" maxlength="7" class="form-control" />'+
                                                                        '<span class="mock-input-tip">最多7字符</span>'+
                                                                    '</div>'+
                                                                '</div>'+
                                                                '<div class="upload-pk-item">乙方文案'+
                                                                    '<div class="mock-input-box">'+
                                                                        '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                                        '<input type="text" maxlength="7" class="form-control" />'+
                                                                        '<span class="mock-input-tip">最多7字符</span>'+
                                                                    '</div>'+
                                                                '</div>');
                                }
                                h.push(
                                                        '</div>'+
                                                        '<div class="upload-vote hide" id="upload-vote">'+
                                                            '<div class="upload-vote-box" id="upload-vote-box">');
                                if ((item.type == '2') && (!!item.ext) && (!_.isEmpty(JSON.parse(item.ext)))) {
                                    ext = JSON.parse(item.ext);
                                    _.each(ext, function(vote, index) {
                                        h.push(
                                                                '<div class="upload-vote-item">'+
                                                                    '<div class="mock-input-box">'+
                                                                        '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                                        '<input type="text" maxlength="20" class="form-control upload-vote-title" placeholder="若配图限6字符" value="' + vote.title + '">'+
                                                                        '<span class="mock-input-tip">最多20字符</span>'+
                                                                    '</div>'+
                                                                '<div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>');
                                        if (!!vote.img) {
                                            h.push(
                                                                '<div class="upload-img-box-wrapper">'+
                                                                    '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                                    '<div class="upload-img-box">'+
                                                                        '<div class="upload-img">'+
                                                                            '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                                            '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                                            '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                                            '<input placeholder="图片链接"  type="text"  class="form-control upload-img-tx upload-vote-img" value="'+vote.img+'"/>'+
                                                                            '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide"/>'+
                                                                        '</div>'+
                                                                        '<div class="upload-img-preivew">'+
                                                                            '<img src="' + vote.img + '"/>'+
                                                                        '</div>'+
                                                                    '</div>');
                                        } else {
                                            h.push(
                                                                    '<div class="upload-img-box-wrapper hide">'+
                                                                        '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                                        '<div class="upload-img-box"><div class="upload-img">'+
                                                                            '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                                            '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                                            '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                                            '<input placeholder="图片链接"  type="text"  class="form-control upload-img-tx upload-vote-img" />'+
                                                                            '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide">'+
                                                                        '</div>'+
                                                                        '<div class="upload-img-preivew mt10 ml0 hide"></div>'+
                                                                    '</div>');
                                        }
                                        h.push(
                                                                '</div>'+
                                                            '</div>');
                                    });
                                } else {
                                    h.push(
                                                            '<div class="upload-vote-item">'+
                                                                '<div class="mock-input-box">'+
                                                                    '<span class="errorinfo" for="" style="display:none;"></span>'+
                                                                    '<input type="text" maxlength="20" class="form-control" placeholder="若配图限6字符"/>'+
                                                                    '<span class="mock-input-tip">最多20字符</span>'+
                                                                '</div>'+
                                                                '<div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>'+
                                                                '<div class="upload-img-box-wrapper hide">'+
                                                                    '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                                    '<div class="upload-img-box">'+
                                                                        '<div class="upload-img">'+
                                                                            '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                                            '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                                            '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                                            '<input placeholder="图片链接" class="form-control upload-img-tx upload-vote-img"/>'+
                                                                            '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide"/>'+
                                                                        '</div>'+
                                                                        '<div class="upload-img-preivew mt10 ml0 hide">'+
                                                                        '</div>'+
                                                                    '</div>');
                                    h.push(
                                                            '</div>'+
                                                        '</div>');
                                    h.push(
                                                        '<div class="upload-vote-item">'+
                                                            '<div class="mock-input-box">'+
                                                                '<input type="text" maxlength="20" class="form-control upload-vote-title" placeholder="若配图限6字符"/>'+
                                                                '<span class="mock-input-tip">最多20字符</span>'+
                                                            '</div>'+
                                                            '<div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>'+
                                                            '<div class="upload-img-box-wrapper hide">'+
                                                                '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                                '<div class="upload-img-box">'+
                                                                    '<div class="upload-img">'+
                                                                        '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                                        '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                                        '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                                        '<input placeholder="图片链接" class="form-control upload-img-tx upload-vote-img" />'+
                                                                        '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide"/>'+
                                                                    '</div>'+
                                                                '<div class="upload-img-preivew mt10 ml0 hide"></div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="upload-vote-item">'+
                                                        '<div class="mock-input-box">'+
                                                            '<input type="text" maxlength="20" class="form-control upload-vote-title" placeholder="若配图限6字符"/>'+
                                                            '<span class="mock-input-tip">最多20字符</span>'+
                                                        '</div>'+
                                                    '<div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>'+
                                                    '<div class="upload-img-box-wrapper hide">'+
                                                    '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                    '<div class="upload-img-box">'+
                                                        '<div class="upload-img">'+
                                                            '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                            '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                            '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                            '<input placeholder="图片链接" class="form-control upload-img-tx upload-vote-img"/>'+
                                                            '<input type="file" accept="image/gif, image/jpeg, image/png" class="hide"/>'+
                                                        '</div>'+
                                                    '<div class="upload-img-preivew mt10 ml0 hide">'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>');
                                }
                                h.push(
                                    '</div>'+
                                    '<div class="mock-btn mock-btn-red" id="upload-vote-additem">+ 添加投票观点</div>'+
                                '</div>'+
                                '</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>上线时间*</td>'+
                                '<td>'+
                                    '<input class="form-control" type="text" id="upload-uptime" value="' + _util.dateFormat(item.uptime * 1000, 'yyyy-MM-dd hh:mm') + '">'+
                                '</td>'+
                            '</tr>'+
                            '</table>'+
                            '<div class="mock-center-box">'+
                                '<div class="mock-btn mock-btn-red" id="upload-submit">保存</div>'+
                                '<div class="mock-btn mock-btn-red" id="upload-saveandsubmit" data-review="true">保存并提交</div>'+
                            '</div>'+
                        '</div>');

                                this.element.append(h.join(''));
                                $('#upload-type').val(item.type);
                                $('#upload-type').trigger('change');
                                $('#upload-content').Editor();
                                $('#upload-content').Editor('setText', item.content); 
                                $('#upload-uptime').datetimepicker({
                                    format: 'Y-m-d H:i',
                                    lang: 'ch',
                                    yearStart: 2015,
                                    yearEnd: 2020,
                                    minDate: '-1970/01/01'
                                });
                                if (this.element.hasClass('hide')) {
                                    this.element.removeClass('hide').addClass('current');
                                }
                            },
                            _bindEvents: function() {
                                this._on(this.element, {
                                    'change #upload-type': this._changeType,
                                    'click div.upload-vote-item-addimg': this._addImg,
                                    'click div.upload-vote-item-clearimg': this._clearImg,
                                    'click #upload-vote-additem': this._addVoteItem,
                                    'click div.upload-img-btn': this._triggerUploadImg,
                                    'change input[type=file]': this._uploadImg,
                                    'change input[type=text].upload-img-tx': this._previewImg,
                                    'click #upload-submit': this._submitData,
                                    'click #upload-saveandsubmit':this._submitData
                                });
                            },
                            _changeType: function(event) {
                                var type = $(event.target).val(),
                                    $pk = $('#upload-pk'),
                                    $vote = $('#upload-vote');
                                switch (type) {
                                    case '0':
                                        if (!$pk.hasClass('hide')) {
                                            $pk.addClass('hide');
                                        }
                                        if (!$vote.hasClass('hide')) {
                                            $vote.addClass('hide');
                                        }
                                        break;
                                        //pk
                                    case '1':
                                        if ($pk.hasClass('hide')) {
                                            $pk.removeClass('hide');
                                        }
                                        if (!$vote.hasClass('hide')) {
                                            $vote.addClass('hide');
                                        }
                                        break;
                                        //vote
                                    case '2':
                                        if (!$pk.hasClass('hide')) {
                                            $pk.addClass('hide');
                                        }
                                        if ($vote.hasClass('hide')) {
                                            $vote.removeClass('hide');
                                        }
                                        break;
                                }
                                return false;
                            },
                            _addImg: function(event) {
                                var
                                    $item = $(event.target).closest('div.upload-vote-item'),
                                    $imgbox = $item.children('div.upload-img-box-wrapper');
                                if ($imgbox.hasClass('hide')) {
                                    $imgbox.removeClass('hide');
                                }
                                return false;
                            },
                            _clearImg: function(event) {
                                var $imgbox = $(event.target).closest('div.upload-img-box');
                                $imgbox.find('textarea').val('');
                                $imgbox.children('div.upload-img-preivew').empty();
                                return false;
                            },
                            _addVoteItem: function() {
                                var h = [];
                                h.push('<div class="upload-vote-item">'+
                                                    '<div class="mock-input-box">'+
                                                        '<input type="text" maxlength="20" class="form-control upload-vote-title" placeholder="若配图限6字符">'+
                                                        '<span class="mock-input-tip">最多20字符</span>'+
                                                        '</div><div class="mock-btn mock-btn-red upload-vote-item-addimg">+ 添加图片</div>'+
                                                        '<div class="upload-img-box-wrapper hide">'+
                                                        '<div class="bg-warning">图片尺寸要求：宽度200px，高度200px。</div>'+
                                                        '<div class="upload-img-box">'+
                                                            '<div class="upload-img">'+
                                                                '<span class="errorinfo" for="upload-vote-img" style="display:none;"></span>'+
                                                                '<div class="mock-btn mock-btn-red upload-img-btn">上传图片</div>'+
                                                                '<div class="mock-btn mock-btn-red upload-vote-item-clearimg">- 移除该图片</div>'+
                                                                '<input type="text" placeholder="图片链接" class="form-control upload-img-tx inlineb bgwhite upload-vote-img" readonly="readonly">'+
                                                                '<input type="file" class="hide">'+
                                                                '</div><div class="upload-img-preivew mt10 ml0 hide">'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>');
                                $('#upload-vote-box').append(h.join(''));
                            },

                            _checkImgSize: function($tx, w, h) {
                                var $spanerror = $tx.parent().find('.errorinfo');
                                var options = this.options;
                                if($tx.attr('id') == 'upload-simg'){
                                    if ((w < 640) || (h > 1080) || (w / h > 2) || (w / h < 1)) {
                                        $spanerror.html('广场图尺寸要求是：最小宽度640px， 最大高度1080px，宽高比在1~2之间，最佳宽高比是3:2。').show();
                                        $tx.val('');
                                        return false;
                                    } else {
                                        options.img_w = w;
                                        options.img_h = h;
                                    }
                                }
                                if (($tx.attr('id') == 'upload-img') && ((w < 440) || (w > 780) || (h < 290) || (h > 2048))) {
                                    $spanerror.html('主图尺寸要求是：最小宽度440px，最大宽度780px；最小高度290px，最大高度2048px，不超过100K。').show();
                                    $tx.val('');
                                    return false;
                                }
                                if ($tx.hasClass('upload-vote-img') && ((w != 200) || (h != 200))) {
                                    $spanerror.html('投票观点配图要求是：尺寸要求：宽度200px， 高度200px。').show();
                                    $tx.val('');
                                    return false;
                                }
                            },
                            _previewImg: function(event) {
                                var
                                    $tx = $(event.target),
                                    $spanerror = $tx.parent().find(".errorinfo"),
                                    $imgbox = $tx.closest('div.upload-img-box'),
                                    imgsrc = $tx.val().trim(),
                                    $preview = $imgbox.children('div.upload-img-preivew');

                                if (!!imgsrc) {
                                    if (imgsrc.match(/\.(jpeg|jpg|gif|png)$/)) {
                                        $preview.empty().append('<img src="' + imgsrc + '"/>');
                                        if ($tx.hasClass('upload-vote-img')) {
                                            var $voteitem = $tx.closest('div.upload-vote-item'),
                                                $input = $voteitem.find('input.upload-vote-title'),
                                                desc = $input.val().trim(),
                                                $tip = $voteitem.find('span.mock-input-tip');
                                            if (!!desc) {
                                                $input.val(desc.slice(0, 6));
                                            }
                                            $input.attr({
                                                'maxlength': 6
                                            });
                                            $tip.html('最多6字符');
                                            // $spanerror.html('最多6字符').show();
                                        }
                                        $preview.removeClass("hide");
                                    } else {
                                        $spanerror.html('请检查图片格式，只能上传png, jpeg, gif格式的图片。').show();
                                    }
                                } else {
                                    if ($tx.hasClass('upload-vote-img')) {
                                        var $voteitem = $tx.closest('div.upload-vote-item'),
                                            $input = $voteitem.find('input.upload-vote-title'),
                                            $tip = $voteitem.find('span.mock-input-tip');
                                        if (!desc) {
                                            $input.attr({
                                                'maxlength': 20
                                            });
                                            $tip.html('最多20字符');
                                            // $spanerror.html('最多20字符').show();
                                        }
                                    }
                                }
                            },
                            _submitData: function(event) {
                                var self = this;
                                $('span[for=upload-title]').html('').hide();
                                $('span[for=upload-desc]').html('').hide();
                                $('span[for=upload-content]').html('').hide();
                                $('span[for=upload-pk]').html('').hide();
                                $('span[for=upload-vote-box]').html('').hide();
                                $("span[for=upload-uptime]").html('').hide();
                                var needReview = $(event.currentTarget).attr("data-review");
                                needReview = needReview == "true" ?  true:false;

                                var options = this.options;
                                var title = $('#upload-title').val().trim();
                                var isValidate = true;
                                if (!title.length) {
                                    isValidate = false;
                                    $('span[for=upload-title]').html('请输入标题。').show();
                                } else {
                                    title = _.escape(title);
                                }

                                var simg = $('#upload-simg').val().trim();
                                var desc = $('#upload-desc').val().trim();
                                if (!desc.length) {
                                    isValidate = false;
                                    $('span[for=upload-desc]').html('请输入摘要。').show();
                                } else {
                                    desc = _.escape(desc);
                                }

                                var img = $('#upload-img').val().trim();

                                var content = $('#upload-content').Editor('getText');
                                if (!content.length) {
                                    isValidate = false;
                                    $('span[for=upload-content]').html('请输入正文。').show();
                                } else {
                                    content = _.escape(content);
                                }

                                var type = $('#upload-type').val();
                                var ext;

                                switch (type) {
                                    //pk
                                    case '1':
                                        ext = [];
                                        $('#upload-pk').find('input').each(function() {
                                            var title = $(this).val();
                                            if (!title.length) {
                                                return false;
                                            } else {
                                                ext.push({
                                                    title: title
                                                });
                                            }
                                        });
                                        if (ext.length == 2) {
                                            //ext = JSON.stringify(ext);
                                        } else {
                                            isValidate = false;
                                            $('span[for=upload-pk]').html('内容类型 为 PK 的甲方文案和乙方文案都需要输入完整。').show();
                                        }
                                        break;
                                        //vote
                                    case '2':
                                        ext = [];
                                        $('#upload-vote-box').children('div.upload-vote-item').each(function() {
                                            var
                                                title = $(this).find('input.upload-vote-title').val().trim(),
                                                img = $(this).find('input.upload-vote-img').val().trim();
                                            if (!!title) {
                                                ext.push({
                                                    title: title,
                                                    img: img
                                                });
                                            }
                                        });
                                        if ((ext.length > 2) && (ext.length < 7)) {
                                            //ext =  JSON.stringify(ext);
                                        } else {
                                            isValidate = false;
                                            $('span[for=upload-vote-box]').html('内容类型 为 投票 的观点个数最少3个，最多6个。').show();
                                            return false;
                                        }
                                        break;

                                    case '0':
                                    default:
                                        ext = '';
                                }
                                var uptime = $('#upload-uptime').val().trim();
                                if (!uptime.length) {
                                    isValidate = false;
                                    $("span[for=upload-uptime]").html('请选择上线时间。').show();
                                } else {
                                    uptime = Math.floor(Date.parse(uptime) / 1000);
                                }
                                if(isValidate){
                                    var rawdata = {
                                        img: img,
                                        img_w: '' + (options.img_w || 0),
                                        img_h: '' + (options.img_h || 0),
                                        simg: simg,
                                        title: title,
                                        desc: desc,
                                        content: content,
                                        type: type,
                                        uptime: uptime,
                                        ext: ext,
                                        bs:window.$userinfo.bduss
                                    },
                                    sendData = {};


                                    if(needReview){
                                        rawdata.shen = 1;
                                        self.routePath = 'raws/1';
                                        sendData.shen = 1;
                                    }
                                    sendData.data = JSON.stringify(rawdata);
                                    
                                    if (options.id) {
                                        var apiUrl = options.updateaudinews;
                                        needReview && (apiUrl = apiUrl+"?shen=1");
                                        sendData.id = options.id;
                                        sendData.ua = 'bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2';
                                        sendData.cuid = '80000000000000000000000000000000|0',
                                        $.ajax({
                                            url: apiUrl,
                                            type:'POST',
                                            crossDomain: true,
                                            dataType: 'json',
                                            data: sendData
                                        }).done(function(res) {
                                            if (!res.errno) {
                                                var router = new Backbone.Router;
                                                router.navigate(self.routePath, {
                                                    trigger: true
                                                });
                                            } else {
                                                self.showError(res);
                                            }
                                        }).fail(function(res) {});
                                    } else {
                                        var apiUrl = options.addaudinews;
                                        needReview && (apiUrl = apiUrl+"?shen=1");
                                        sendData.ua = 'bd_720_1280_HTC-HTC+One+X-4-0-4_4-2-6-1_j2';
                                        sendData.cuid = '80000000000000000000000000000000|0',
                                        $.ajax({
                                            url: apiUrl,
                                            type:'POST',
                                            crossDomain: true,
                                            dataType: 'json',
                                            data: sendData
                                        }).done(function(res) {
                                            if (!res.errno) {
                                                var router = new Backbone.Router;
                                                router.navigate(self.routePath, {
                                                    trigger: true
                                                });
                                            } else {
                                                self.showError(res);
                                            }
                                        }).fail(function(res) {});
                                    }
                                }
                                return false;    
                            }
                    }); module.exports = $.mock.rawedit;
            });