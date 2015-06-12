define(function(require, exports, module) {
    /**
    util lib
    @module
    */
    'use strict';
    var config = require("config");
    var host = "";
    var tags = ["DIV", "TR", "TH", "TD", "TBODY", "THEAD", "TABLE", "CAPTION", "SPAN", "LABEL", "FORM"];
    var CreateElementMethods = function CreateElementMethods() {
        var createElement = function createElement(tag, opts) {
            var htmlobj = document.createElement(tag);
            for (var field in opts) {
                htmlobj.setAttribute(field, opts[field]);
            }
            return htmlobj;
        };
        var funParts = [];
        for (var i = 0; i < tags.length; i++) {
            funParts.push(tags[i] + ':function(opts){var htmlobj = document.createElement("' + tags[i] + '");for (var field in opts) {htmlobj.setAttribute(field, opts[field]);}return htmlobj;}');
        }
        var funBody = ['return {', funParts.join(','), '};'].join("");
        var createFunction = new Function(funBody);
        return createFunction();
    }

    /**
    date format method
    * @param {number} timestamp - timestemp like 1433840242036
    * @param {string} fmt - format string
    * @returns {string} formated date string
    * @author xunying
    */
    exports.dateFormat = function(timestamp, fmt) {
        var date = new Date(timestamp);
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    /**
    date format method
    * @param {number} timestamp - timestemp like 1433840242036
    * @param {string} fmt - format string
    * @returns {string} formated date string
    * @author xunying
    */
    exports.createSelectElem = function(opt) {
        var h = [];
        if (opt.multiple) {
            h.push('<select class="form-control ' + opt.selectClass + '" multiple="multiple">');
        } else {
            h.push('<select class="form-control ' + opt.selectClass + '">');
        }
        h.push('<option selected="selected" disabled="disabled">请选择</option>');
        if (_.isArray(opt.data)) {
            _.each(opt.data, function(item, index) {
                if (opt.selected == item) {
                    h.push('<option value="' + item + '" selected="selected">' + item + '</option>');
                } else {
                    h.push('<option value="' + item + '">' + item + '</option>');
                }
            });
        } else if (_.isObject(opt.data)) {
            _.each(opt.data, function(value, key) {
                if (opt.selected == key) {
                    h.push('<option value="' + key + '" selected="selected">' + value + '</option>');
                } else {
                    h.push('<option value="' + key + '">' + value + '</option>');
                }
            });
        }
        h.push('</select>');
        return h.join('');
    };

    /**
    function set of create html document
    * @property {function} DIV - create DIV.
    * @property {function} TR - create TR.
    * @property {function} TH - create TH.
    * @property {function} TD - create TD.
    * @property {function} TBODY - create TBODY.
    * @property {function} THEAD - create THEAD.
    * @property {function} TABLE - create TABLE.
    * @property {function} CAPTION - create CAPTION.
    * @property {function} SPAN - create SPAN.
    * @property {function} LABEL - create LABEL.
    * @example 
        util.ce.DIV({"id":"testdiv", "class="testclass"});
        //return <div id="testdiv" class="testclass"></div>
    * @author huangchunhua
    */
    exports.ce = CreateElementMethods();

    exports.validateId = function(str) {
        var result = str.match(/^[a-zA-Z]\w+$/);
        if (result == null) return false;
        return true;
    };

    /**
    getApiUrl
    * @function util.getApiUrl;
    * @param {obj} param - this param include path, name, params(option), protocol(option)
    * @example
    * util.getApiUrl({
    *     protocol:http//default is http, so you can omit it.
    *     path:"mock",
    *     name:"mysquare",
    *     params:{
    *         "id":123123123
    *         "name":"Seed Huang"
    *     }
    * });
    */
    exports.getApiUrl = function(obj) {
        var url = "",
            host = "",
            protocol = "http:/",
            path = "",
            name = "",
            urlParts = null;
        //obj is required
        if (!obj) {
            throw "please input your param";
        }

        //path is required
        if (!obj.path && !config.servicePath) {
            throw "please input your service's path";
        } else {
            path = obj.path || config.servicePath;
        }

        //name is required
        if (!obj.name) {
            throw "please input your service's name";
        } else {
            name = obj.name;
        }

        if (obj.protocol) {
            protocol = obj.protocol + ":/";
        }


        if (!host) {
            if (/^localhost:\d{4}|^webapp.shahe.baidu.com$/.test(location.host)) {
                host = config.env.shahe;
            } else {
                host = config.env.cbs;
            }
        }
        url = [protocol, host, path, name].join("/");

        //add parameters
        if (obj.params) {
            var parameters = [];
            for (var field in obj.params) {
                parameters.push(field + "=" + obj.params[field]);
            }
            parameters.length && (url += "?" + parameters.join("&"));
        }
        return url;
    };
});