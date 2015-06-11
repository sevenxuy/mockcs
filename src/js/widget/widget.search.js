define(["mock.util"], function(util) {
    /**
    search widget
    * @module
    */
    var _widget = {
        options: {
            "placeholder": "按关键字搜索",
            "className": "form-control mock-search"
        },
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
    };
    $.widget("widget.search", _widget);
    return $.widget.search;
});