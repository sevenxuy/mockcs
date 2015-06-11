define(function() {
    'use strict'
    var _widget = {
        options: {
            sechma: {},
            data: []
        },
        $table: {},
        _create: function() {
            this.$table = $('<table class="table table-bordered table-hover"><thead></thead><tbody></tbody></table>');
            this.$thead = this.$table.find('thead');
            this.$tbody = this.$table.find('tbody');
            
            if (this.events) {
                this._on(this.events);
            }
        },
        this.renderThead = function(){
            var thstrAry = [],
                thstr = "",
                thTemplate = '<th><%=colname%></th>',
            i = 0;
            for (i = 0; i < sechma.cols.length; i++) {
                thstrAry.push(_.template(thTemplate)(sechma.cols[i]).html());
            }
            thstr = thstrAry.join("");
            thstrAry = null;
            this.$thead.html(thstr);
        },
        this.renderTbody = function(){
            var trstrAry = [],
            tbodystrAry = [];
            

        }
        events: {

        }
    }
    $.widget('mock.widget.table');
});