define(function(require, module, exports) {
    var _widget = {
        options: {},
        events: {
            "click .tab-nav-item": function(e) {
                var target = e.currentTarget;
                var key = $(target).attr("data-key");
                this.select(key);
            }
        },
        _create: function() {
            if (this.options.data) {
                var data = this.options.data;
                var i;
                var template =
                    '<%for(var i=0;i<data.length;i++){%>' +
                    '<li class="tab-nav-item" data-key="<%=data[i].key%>"><a href="#mocks/<%=data[i].key%>"><%=data[i].value%></a></li>' +
                    '<%}%>';
                var html = _.template(template)({
                    data: data
                });
                this.element.html(html);
                
                this.reSelect();
                if (this.events) {
                    this._on(this.events);
                }
            }
        },
        reSelect: function reSelect() {
            var currentHash = window.location.hash;
            if (currentHash) {
                this.element.find('.tab-nav-item').removeClass('tab-nav-item-selected')
                var achors = this.element.find("a");
                for (var i = 0; i < achors.length; i++) {
                    var href = achors[i].getAttribute("href");
                    var strRegex = '^' + href + '$|^' + href + '\/';
                    var regex = new RegExp(strRegex);
                    if (regex.test(location.hash)) {
                        $(achors[i]).parent().addClass("tab-nav-item-selected");
                        break;
                    }
                }
            }
        },
        select: function select(key) {
            if (this.onselect) {
                this.onselect(key);
            }

        },
        onselect: function(key) {}
    };

    $.widget("widget.tab", _widget);
    module.exports = $.widget.tab;
});