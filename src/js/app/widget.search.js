define(function(require, module, exports) {
    /**
    search widget
    * @module
    */
    $.widget("widget.search", {
        options: {
            "placeholder": "按关键字搜索",
            "className": "form-control mock-search"
        },
        defaultElement:'<div class="mock-search-box"></div>',
        $input: {},
        $searchButton: {},
        _create: function() {
            this.$input = $(_.template('<input type="text" class="<%=className%>" placeholder="<%=placeholder%>"/>')(this.options)).appendTo(this.element);
            this.$searchButton = $('<div class="mock-search-icon"></div>').appendTo(this.element);
            if(this.events){
                this._on(this.events);
            }
        },
        events: {
            "keyup": function() {
                this.onKeyUp(this);
            },
            "keydown": function() {
                this.onKeyDown(this);
            }
        },
        onKeyUp: function() {},
        onKeyDown: function() {}
    });
    module.exports = $.widget.search;
});