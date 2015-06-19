define(["mock.util", "mock.view", "widget.tab"], function(util, _view, Tab) {
    "use strict";
    $.widget("mock.viewTitleBarPageContent", _view, {
        $title: {},
        $tabsNav: {},
        $pageContent: {},
        $tabsContent: {},
        tab: {},
        options: {},
        _create: function() {
            this.$title = $('<div class="mock-hd"></div>');
            this.$pageContent = $('<div class="page-content"></div>');
            if (this.title) {
                this.$title.html(this.title);
            }
            var fragement = document.createDocumentFragment();
            fragement.appendChild(this.$title[0]);
            fragement.appendChild(this.$pageContent[0]);
            this.$tabsNav = $('<ul class="tabs-nav"></ul>').appendTo(this.$pageContent);
            this.tabsNav = new $.widget.tab({
                data: this.data
            });
            this.$tabsNav.append(this.tabsNav.element);
            this.$tabsContent = $('<div class="tabs-content"></div>').appendTo(this.$pageContent);
            this.element.append(fragement);
            this._onCreate();
            this.render();
            this._bindEvents();
            this.element.data('widgetCreated', true);
            
        },
        _onCreate:function _onCreate(){},
        _createElem: function _createElem() {
            this.tabsNav.reSelect();
            this.renderTitle();
            this.renderContent();
        },
        render: function render() {
            if (this.element.hasClass('hide')) {
                this.element.removeClass('hide').addClass('current');
            }
            this._createElem();
        },
        reRender: function reRender(opts) {
            if(opts){
                _.extend(this.options, opts)
            }
            this.element.addClass('hide');
            // this.element.addClass('hide').empty();
            this.render();
        },
        renderTitle: function renderTitle() {},
        renderContent: function renderContent() {},
        _bindEvents: function _bindEvents() {
            if (this.events) {
                this._on(this.events);
            }
        }
    });
    return $.mock.viewTitleBarPageContent;
});