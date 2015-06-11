define(function() {
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
                '<%for(var i=0;i<data.length;i++){%>'+
                    '<li class="tab-nav-item" data-key="<%=data[i].key%>"><a href="#mocks/<%=data[i].key%>"><%=data[i].value%></a></li>'+
                '<%}%>';
                var html = _.template(template)({data:data});
                this.element.html(html);
                var currentHash = window.location.hash;
                if(currentHash){
                    this.element.find('a[href="'+currentHash+'"]').parent().addClass("tab-nav-item-selected");
                }
            }
            if (this.events) {
                this._on(this.events);
            }
        },
        select: function(key) {
            if(this.onselect){
                this.onselect(key);    
            }
            
        },
        onselect: function(key) {}
    };

    $.widget("widget.tab", _widget);
    return $.widget.tab;
});