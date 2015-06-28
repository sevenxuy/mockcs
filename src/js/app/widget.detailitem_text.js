define(funciton(require, module, exports) {
    $.wdiget('widget.detailItemText', {
        defaultElement: '<div class="upload-img-box"></div>',
        'btnUpload':{}，
        'btnRemove':{},
        'filetypes':['image/gif', 'image/jpeg', 'image/png'],
        'inputUrl':{},
        'placeholder':'图片链接',
        $errorInfo:{},
        $inputFile:{},
        $inputUrl:{},
        $divPreiview:{},
        _create: function() {
            if(this.options){
                this.setOptions();
            }
            var _template = 
                '<div class="upload-img">' +
                    '<span class="errorinfo" for="upload-simg" style="display:none;"></span>' +
                    '<div class="mock-btn mock-btn-red upload-img-btn inlineb"><%=btnUpload.text%></div>' +
                    '<input type="text" placeholder="<%=inputUrl.placeholder%>" class="form-control upload-img-tx inlineb bgwhite" id="<%=inputUrl.id%>" readonly="readonly"/>' +
                    '<input type="file" accept="<%=filetypes.join(',')%>" class="hide"/>' +
                '</div>';
                this.element.append($(_.template(_template)(this)));
            $errorInfo = this.element.find('.errorinfo');
            $inputFile = this.element.find('input[type=file]');
            $inputUrl = this..element.fnd('input[[type=text]');
            var $divUploadPreview = $( '<div class="upload-img-preivew mt10 ml0 hide"></div>');
        },
    });
});