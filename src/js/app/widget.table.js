define(function(require, module, exports) {
    'use strict'
    var util = require("mock.util");
    var _widget = {
        options: {
            schema: {},
            data: []
        },
        schema: {},
        data: [],
        $table: {},
        _create: function() {
            this.$table = $('<table class="table table-bordered table-hover"><thead></thead><tbody></tbody></table>');
            this.$thead = this.$table.find('thead');
            this.$tbody = this.$table.find('tbody');
            if (this.options.schema && Object.keys(this.options.schema).length > 0) {
                this.schema = this.options.schema;
            }
            if (this.options.data && this.options.data.length > 0) {
                this.data = this.options.data;
            }
            this.renderThead();
            this.renderTbody();
            if (this.events) {
                this._on(this.events);
            }
            this.element.append(this.$table);
        },
        renderThead: function() {
            var thstrAry = [],
                thstr = "",
                thTemplate = '<th><%=text?text:""%></th>',
                i = 0;
            var schema = this.schema;
            for (i = 0; i < schema.cols.length; i++) {
                thstrAry.push(_.template(thTemplate)(schema.cols[i]));
            }
            thstr = thstrAry.join("");
            thstrAry = null;
            this.$thead.html('<tr>'+thstr+'</tr>');
        },
        renderTbody: function() {
            var trstrAry = [],
                tdstrAry = [],
                trStr = '',
                schema = this.schema,
                tbodystrAry = [],
                data = this.data,
                i = 0,
                j = 0,
                fileld = "";
            for (i = 0; i < data.length; i++) {
                tdstrAry.length = 0;
                for (j = 0; j < schema.cols.length; j++) {
                    var col = schema.cols[j],
                        z = 0;
                    if (col.type != "operation") {
                        var temp = "";
                        switch (col.type) {
                            case 'number':
                            case 'text':
                                temp = data[i][col.key] + '';
                                break;
                            case 'date':
                                temp = util.dateFormat(+data[i][col.key], "yyyy-MM-dd HH:mm");
                                break;
                        }
                        tdstrAry.push('<td>' + temp + '</td>');
                    } else {
                        var btnsAry = [],
                            btnStr = '';
                        for (z = 0; z < col.btns.length; z++) {
                            var btnSchema = col.btns[z];
                            switch (btnSchema.type) {
                                case "select":
                                    brtnsAry.push('<select value="' + btnSchema.text + '"></select>');
                                    break;
                                default:
                                    btnsAry.push('<input type="' + btnSchema.type + '" value="' + btnSchema.text + '" class="' + btnSchema.className + '"/>');
                                    break;
                            }
                        }
                        var temp = btnsAry.join('');
                        tdstrAry.push('<td>' + temp + '</td>');
                    }
                }
                var trTemp = tdstrAry.join("")
                trstrAry.push('<tr>' + trTemp + '</tr>');
            }
            this.$tbody.html(trstrAry.join());
        },
        bindData: function(data) {
            this.data = data;
            return this;
        }
    }
    $.widget('widget.table', _widget);
    module.exports = $.widget.table;
});