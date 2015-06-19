;
(function() {
    if (!$.curCSS) {
        $.curCSS = jQuery.css;
    }

    var _maxId = 0,
        _imgBtnForArticleHTML = [
            '<a attr="imgsBtn" href="javascript:void(0)" class="mceButton mceButtonEnabled mce_image">',
            '<span class="mceIcon mce_image">',
            '<b class="btn_file">',
            '<input name="chatFile" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp" class="input_file" attr="fileInput;picInput;change:articleImageInputChange;">',
            '</b>',
            '</span>',
            '</a>'
        ].join("");

    var imageContainerHTML = [
        '<style>',
        '.imgitem{display:inline-block; margin:5px;}',
        '.imgitem img{width:80px;height:80px;border:1px solid #ddd}',
        '.imgitem img:hover{width:80px;height:80px;border:1px solid #00e0d0}',
        '</style>',
        '<div style="padding:10px;height:400px;overflow:auto;" attr="imgContainer"></div>',
        '<div style="text-align:center;padding-top:10px;">',
        '<input type="button" attr="click:getMore" value="加载更多" style="width:80px;height:30px;">',
        '<input type="file" attr="change:uploadImage" value="点击上传" style="width:80px;height:30px;">',
        '</div>'
    ].join("");

    var loadImages = function() {
        $.ajax({
            url: "/ser/query.php?func=GetPictureList&param=,40," + this.page,
            dataType: "text",
            context: this,
            success: function(str) {
                $we.arr.each($we.json.get($we.json.toObject(str), "data.list"), function(item) {
                    this.appendHTML(imageHTML, this.node.imgContainer, {
                        src: item.s_thumb,
                        file: item.s_url
                    });
                }, this);
            }
        });
        ++this.page;
    };

    var uploadImage = function(e, el) {
        if (el.files.length == 0) {
            return;
        }
        var bNeedCompress = false;
        if (("" + el.files[0].name).match(/\.gif$/i)) {
            // GIF一定需要压缩， 为了获取到第一帧
            bNeedCompress = true;
        }
        var file = el.files[0];
        $we.files.uploadFiles("/umis/pushc/uploadfile", "file", file, {
            param: {},
            scope: this,
            onprogress: function(e) {},
            onload: function(req) {
                var obj = $we.json.toObject(("" + req.responseText).replace(/<pre[\s\S]*<\/pre>/ig, ""));
                if (obj.errno) {
                    alert("[" + obj.errno + "]" + obj.error);
                    return;
                }
                var url = $we.json.get(obj, "data") || "";
                if (!url) {
                    return;
                }
                var img = document.body.appendChild(document.createElement("img"));
                img.src = url;
                img.style.cssText = "display:none";
                $we.dom.imgCb(img, function() {
                    img.style.cssText = "";
                    if (bNeedCompress) {
                        var key = $.md5("wisetimgkey_noexpire_3f60e7362b8c23871c7564327a31d9d70" + url);
                        url = "http://cdn01.baidu-img.cn/timg?cbs&quality=60&size=b" + img.offsetWidth + "_" + img.offsetHeight + "&sec=0&di=" + key + "&src=" + url;
                    }
                    if (url) {
                        this.appendHTML(imageHTML, this.node.imgContainer, {
                            src: url,
                            file: url
                        });
                        this.node.imgContainer.insertBefore(this.node.tmp, this.node.imgContainer.firstChild);
                        tinyMCE.execCommand('mceInsertContent', false, '<img src="' + url + '" />');
                        this.imgMask.hide();
                    }
                    img.parentNode.removeChild(img);
                }, this);

            }
        });
    };

    var imageHTML = [
        '<div class="imgitem" attr="tmp">',
        '<img attr="click:insertImage" src="$src$" file="$file$" />',
        '</div>'
    ].join("");

    var _html = [
        '<div attr="root"></div>'
    ].join("");

    var adjust = function(h, bReay) {
        if (!this.bReady) {
            this.currH = h;
            this.bReay = bReay;
        } else {
            $("#" + this.id + "_tbl").css("width", "100%");
            $("#" + this.id + "_ifr").css("width", "100%");
            $("#" + this.id + "_ifr").height(h);
        }
    };

    var getValue = function() {
        dealWithImage.call(this);
        var val = this.html;
        if (this.bReady) {
            val = document.getElementById(this.id + "_ifr").contentWindow.document.body.innerHTML;
        }
        window.onbeforeunload = function() {};
        return val;
    };

    var removeStyle = function() {
        var imgs = [];
        var scan = function(el) {
            if (el.nodeType != 1) {
                return;
            }
            var tag = ("" + el.tagName).toLowerCase();
            if (tag == "script" || tag == "style") {
                el.parentNode.removeChild(el);
                return;
            }
            el.style.cssText = "";
            for (var i = el.childNodes.length - 1; i >= 0; --i) {
                scan(el.childNodes[i]);
            }
        };
        scan(document.getElementById(this.id + "_ifr").contentWindow.document.body);
        dealWithImage.call(this);

    };

    var dealWithImage = function() {
        var images = document.getElementById(this.id + "_ifr").contentWindow.document.body.getElementsByTagName("img");
        var imgs = [];
        for (var i = 0; i < images.length; ++i) {
            imgs.push(images[i]);
            //需要标出宽高
            $we.dom.imgCb(images[i], function(img) {
                img.style.cssText = "width:" + img.offsetWidth + "px;height:" + img.offsetHeight + "px";
            });
        }

        // 最后， 对图片单独处理一下
        for (var i = 0; i < imgs.length; ++i) {
            var img = imgs[i];
            if (img.nextSibling) {
                if (img.parentNode.tagName.toLowerCase() == "body") {
                    p = img.parentNode.insertBefore(document.createElement("p"), img);
                    p.appendChild(img);
                } else {
                    p = img.parentNode.parentNode.insertBefore(document.createElement("p"), img.parentNode);
                    img.parentNode.parentNode.insertBefore(img.parentNode, p);
                    while (img.nextSibling) {
                        p.appendChild(img.nextSibling);
                    }
                }
            }
            if (img.previousSibling) {
                if (img.parentNode.tagName.toLowerCase() == "body") {
                    p = img.parentNode.insertBefore(document.createElement("p"), img);
                    p.appendChild(img);
                } else {
                    p = img.parentNode.parentNode.insertBefore(document.createElement("p"), img.parentNode);
                    img.parentNode.parentNode.insertBefore(img.parentNode, p);
                    p.appendChild(img);
                }
            }

        }

        // 郭凯提出了一个新的需求， 需要1， 把图片中的样式都加上宽和高
        // 2， P和Image分开， 如果遇到Image， 单独一行显示
    };

    var setValue = function(html) {
        html = $we.str.decodeHTML(html);
        html = html.replace(/&nbsp;/g, "&#160;").replace(/&;nbsp;/g, "&#160;");
        if (this.bReady) {
            document.getElementById(this.id + "_ifr").contentWindow.document.body.innerHTML = html;
        }
        this.html = html;
    };

    var init = function(parent, data) {
        this.parent = parent;
        render.call(this, data);
    };

    var resize = function() {
        // 啥都不用做
    };

    var showImage = function() {
        if (!this.imgMask) {
            this.imgMask = $we.widget.add({
                name: "whale.tool.mask",
                notifyTo: this
            }, {
                title: "插入图片",
                height: 500,
                width: 700
            });
            this.appendHTML(imageContainerHTML, this.imgMask.getContainer());
            this.page = 1;
            loadImages.call(this);
        }
        this.imgMask.show();
    };

    var evtInsertImage = function(e, el) {
        var src = $(el).attr("file");
        tinyMCE.execCommand('mceInsertContent', false, '<img src="' + src + '" />');
        this.imgMask.hide();
    };

    var render = function(data) {
        if (this.bFinish == true) {}
        this.bFinish = true;
        this.appendHTML(_html, this.parent);
        var root = this.node.root,
            me = this,
            height = data.height;
        height = parseInt(height) || 250;
        this.id = "articleContent" + (++_maxId);
        this.bReady = false;
        this.html = $we.json.get(data, "value") || "";
        root.id = this.id;
        setTimeout(function() {
            tinyMCE.init({
                mode: "exact",
                theme: "advanced",
                // General options
                plugins: "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,autosave,visualblocks,syntaxhl",

                // Theme options
                //theme_advanced_buttons1 : "bold,italic,underline,|,fontselect,fontsizeselect,|,justifyleft,justifycenter",
                //theme_advanced_buttons2 : "|,cut,copy,paste,|,bullist,numlist,|,image,|,forecolor,backcolor",
                //theme_advanced_buttons3 : "|,removeformat",
                //theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,restoredraft",
                theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
                theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
                theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
                theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,restoredraft",



                theme_advanced_toolbar_location: "top",
                theme_advanced_toolbar_align: "left",
                theme_advanced_statusbar_location: "bottom",
                theme_advanced_resizing: true,
                //height : 450,

                // Example content CSS (should be your site CSS)
                //content_css : css,

                // Drop lists for link/image/media/template dialogs
                template_external_list_url: "lists/template_list.js",
                external_link_list_url: "lists/link_list.js",
                external_image_list_url: "lists/image_list.js",
                media_external_list_url: "lists/media_list.js",

                // Style formats
                style_formats: [{
                    title: 'Bold text',
                    inline: 'b'
                }, {
                    title: 'Red text',
                    inline: 'span',
                    styles: {
                        color: '#ff0000'
                    }
                }, {
                    title: 'Red header',
                    block: 'h1',
                    styles: {
                        color: '#ff0000'
                    }
                }, {
                    title: 'Example 1',
                    inline: 'span',
                    classes: 'example1'
                }, {
                    title: 'Example 2',
                    inline: 'span',
                    classes: 'example2'
                }, {
                    title: 'Table styles'
                }, {
                    title: 'Table row 1',
                    selector: 'tr',
                    classes: 'tablerow1'
                }],

                // 注入监听函数， 重写插入链接和图片的事件
                execcommand_callback: function(editor_id, elm, command, user_interface, value) {
                    switch (command) {
                        case "mceInsertContent":
                            // 用户贴东西进来， 需要把所有的样式， Script等都干掉
                            setTimeout(function() {
                                removeStyle.call(me);
                            }, 500);
                            break;
                        case "mceAdvImage":
                            // 自己处理插入图片的操作
                            //tinyMCE.execCommand('mceInsertContent',false,"在这里插入图片");
                            showImage.call(me);
                            return true;
                    }
                },
                elements: me.id,
                oninit: function() {
                    //syntaxhl.setCurrDoc(pid, function(){
                    //  return "TinyMCE_" + (++_maxId);
                    //});
                    me.bReady = true;
                    var style = document.getElementById(me.id + "_ifr").contentWindow.document.head.appendChild(document.getElementById(me.id + "_ifr").contentWindow.document.createElement("style"));
                    style.innerHTML = "html,body{font-size:14px;}";
                    document.getElementById(me.id + "_ifr").contentWindow.document.body.innerHTML = me.html;
                    //$(document.getElementById(me.id + "_toolbar2")).css("display", "none");
                    //$(document.getElementById(me.id + "_toolbar3")).css("display", "none");
                    //$(document.getElementById(me.id + "_path_row")).css("display", "none");
                    //$(document.getElementById(me.id + "_resize").parentNode.parentNode).css("display", "none");
                    //$(document.getElementsByClassName("mceLast")[1]).css("display", "none");

                    // 图片的按钮需要特殊处理
                    //var imgBtn = document.getElementById(me.id + "_image");
                    //$we.dom.removeAllChilds(imgBtn);
                    //me.appendHTML(_imgBtnForArticleHTML, imgBtn);
                    //imgBtn.parentNode.insertBefore(me.node.imgsBtn, imgBtn);
                    //$we.dom.removeDomNode(imgBtn);

                    // 做一个排序
                    //var tr = document.getElementById(me.id + "_toolbar1").getElementsByTagName("tr")[0];
                    //tr.insertBefore(me.node.imgsBtn.parentNode.nextSibling, tr.firstChild);
                    //tr.insertBefore(me.node.imgsBtn.parentNode, tr.firstChild);
                    //var list = document.getElementById(me.id + "_numlist").parentNode;
                    //while(list.nextSibling){
                    //  tr.appendChild(list.nextSibling);
                    //}
                    //var paste = document.getElementById(me.id + "_paste").parentNode;
                    //while(paste.nextSibling){
                    //  tr.appendChild(paste.nextSibling);
                    //}
                    //var tr3 = document.getElementById(me.id + "_toolbar3").getElementsByTagName("tr")[0];
                    //while(tr3.firstChild){
                    //  tr.appendChild(tr3.firstChild);
                    //}
                    //var tr2 = paste.parentNode;
                    //while(tr2.firstChild){
                    //  tr.appendChild(tr2.firstChild);
                    //}

                    adjust.call(me, 350 - 31, me.bReay);
                    $(window).on("resize", function() {
                        adjust.call(me, 350 - 31, me.bReay);
                    });
                    window.onbeforeunload = function() {};
                }
            });
        }, 1);
    };

    $.widget("widget.commEditor", {
        _create: function() {
            init();
        },
        events:{
            getMore:loadImages,
            insertImage:evtInsertImage,
            uploadImage:uploadImage
        },
        
    });

    // $we.widget.reg("whale.modify.articleeditor", {
    //     init: init,
    //     interfaces: {
    //         getValue: getValue,
    //         setValue: setValue
    //     },
    //     events: {
    //         getMore: loadImages,
    //         insertImage: evtInsertImage,
    //         uploadImage: uploadImage
    //     }
    // });

    // $we.widget.reg("whale.charts.articleeditor", {
    //     init: init,
    //     interfaces: {
    //         render: render,
    //         resize: resize
    //     },
    //     events: {
    //         getMore: loadImages,
    //         insertImage: evtInsertImage,
    //         uploadImage: uploadImage
    //     }
    // });
})();