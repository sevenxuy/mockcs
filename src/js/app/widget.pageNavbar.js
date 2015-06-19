define(function(require, module, exports) {
    /**
    widget.pageNavbar
    * @module
    */
    /**
     * @function pageNavbar.goTo
     * @param {number} _pn - page number
     * @return {pageNavbar} - current pageNavbar isntance
     */
    var goTo = function goTo(_pn) {
        //if there is no data or the data's length is less than or equal the page size
        if (this.sum <= this.ps) {
            if (this.sum == 0) {
                this.element.addClass("hide");
                this.pn = -1;
            } else {
                this.element.addClass("hide");
                // /this.element.removeClass("hide");
                // this.$btnPre.addClass("hide");
                // this.$btnNext.addClass("hide");
                // this.$btnJump.addClass("hide");
                // this.$inputNum.addClass("hide");
                // this.$divNum.addClass("hide");
                this.pn = 0;
            }
        }
        //the pn is between 1 and max page size
        else {
            this.element.removeClass("hide");            
            this.pageSum = +!!(this.sum % this.ps) | (this.sum / this.ps >> 0);
            if (_pn > this.pageSum) {
                this.pn = this.pageSum - 1;
            } else if (_pn < 0) {
                this.pn = 0;
            } else {
                this.pn = _pn;
            }

            if (this.pn === 0) {
                this.$btnPre.addClass("hide");
            } else {
                this.$btnPre.removeClass("hide");
            }

            if (this.pn === (this.pageSum - 1)) {
                this.$btnNext.addClass("hide");
            } else {
                this.$btnNext.removeClass("hide");
            }
        }

        this.$divNum.find(".page_current").html(this.pn + 1);
        this.$divNum.find(".page_total").html(this.pageSum);
        this.$inputNum.html(this.pn + 1);
    };
    $.widget("widget.pageNavbar", {
        defaultElement: '<div class="paging"></div>',
        $btnPre: {},
        $btnNext: {},
        $divNum: {},
        $inputNum: {},
        $btnJump: {},
        options: {
            pn: 0, //pn is from zero
            ps: 30,
            sum: 0
        },
        getPn: function() {
            return this.pn;
        },
        getPs: function() {
            return this.ps;
        },
        getSum: function() {
            return this.sum;
        },
        bindData: function(params) {
            for (var field in params) {
                this[field] = params[field];
            }
            goTo.call(this, this.pn);
        },
        _create: function() {
            var fragment = document.createDocumentFragment();
            this.$btnPre = $('<div class="mock-btn mock-btn-white page_pre hide">&lt;</div>').appendTo(fragment);
            this.$btnNext = $('<div class="mock-btn mock-btn-white page_next">&gt;</div>').appendTo(fragment);
            this.$divNum = $('<div class="page_num"><span class="page_current"></span><span class="num_gap">/</span><span class="page_total"></span></div>').appendTo(fragment);
            this.$inputNum = $('<input type="text" class="form-control goto_page">').appendTo(fragment);
            this.$btnJump = $('<div class="mock-btn mock-btn-white page_go">跳转</div>').appendTo(fragment);
            for (var field in this.options) {
                this[field] = this.options[field];
            }

            goTo.call(this, this.pn);
            this.element.append(fragment);
            this._on(this.events);
        },
        events: {
            "click .page_pre": function() {
                this.pn--;
                goTo.call(this, this.pn);
                if (this.onPreClick) {
                    this.onPreClick(this.pn);
                }
            },
            "click .page_next": function() {
                this.pn++;
                goTo.call(this, this.pn);
                if (this.onNextClick) {
                    this.onNextClick(this.pn);
                }
            },
            "keyup .goto_page": function(e) {
                var value = $.trim(e.currentTarget.value);
                if (e.keyCode == 13 && value && !isNaN(value)) {
                    this.pn = value - 1;
                    goTo.call(this, this.pn);
                    if (this.onGoTo) {
                        this.onGoTo(this.pn);
                    }
                }
            },
            "click .page_go": function() {
                var value = this.$inputNum.val();
                if (value && !isNaN(value)) {
                    this.pn = value - 1
                    goTo.call(this, this.pn);
                    if (this.onGoTo) {
                        this.onGoTo(this.pn);
                    }
                }
            }
        }
    });
    module.exports = $.widget.pageNavbar;
});