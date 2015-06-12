define(["mock.util", "mock.view", "widget.tab"], function(util, _view, Tab) {
    "use strict";
    $.widget("mock.viewTitleBarPageContent", _view, {
        $title: {},
        $tabsNav:{},
        $pageContent: {},
        $tabsContent:{},
        tab: {},
        options: {},
        _createElem: function _createElem() {
            this.$title = $('<div class="mock-hd"></div>');
            this.$pageContent = $('<div class="page-content"></div>');
            if (this.title) {
                this.$title.html(this.title);
            }
            var fragement = document.createDocumentFragment();
            fragement.appendChild(this.$title[0]);
            fragement.appendChild(this.$pageContent[0]);
            this.$tabsNav = $('<ul class="tabs-nav"></ul>').appendTo(this.$pageContent);
            this.$tabsContent = $('<div class="tabs-content"></div>').appendTo(this.$pageContent);
            this.$tabsNav.tab({
                data: this.data
            });

            this.renderTitle();
            this.renderContent();

            
            return fragement;
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