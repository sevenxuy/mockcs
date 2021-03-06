define(function(require, exports, module) {
    'use strict';

    require('mock.view.login');
    require('mock.view.homepage');
    require('mock.view.mockme');
    require('mock.view.mocksquare');
    require('mock.view.msg');
    require('mock.view.msgs');
    require('mock.view.fans');
    require('mock.view.rawedit');
    require('mock.view.raws');
    require('mock.view.ad');
    require('mock.view.ads');
    require('mock.view.trafuser');
    require('mock.view.trafad');
    var util = require("mock.util");


    var AppRouter = Backbone.Router.extend({
            routes: {
                '(login)': 'login',
                'homepage': 'homepage',
                'homepage/(:pn)': 'homepage',
                'mocks/me': 'mocksquare',
                'mocks/me/(:status)/(:pn)': 'mocksquare',
                'mocks/me/(:status)/(:id)/(:pn)': 'mocksquare',
                'mocks/square': 'mocksquare',
                'mocks/square/(:status)/(:pn)': 'mocksquare',
                'mocks/square/(:status)/(:id)/(:pn)': 'mocksquare',
                'msg': 'msg',
                'msg/(:pn)': 'msg',
                'msgs': 'msgs',
                'msgs/(:status)': 'msgs',
                'msgs/(:status)/': 'msgs',
                'fans': 'fans',
                'fans/(:status)': 'fans',
                'fans/(:status)/': 'fans',
                'rawedit': 'rawedit',
                'rawedit/:id': 'rawedit',
                'raws': 'raws',
                'raws/(:type)': 'raws',
                'raws/(:type)/': 'raws',
                'raws/(:type)/(:pn)': 'raws',
                'ad': 'ad',
                'ad/(:stype)': 'ad',
                'ad/(:stype)/': 'ad',
                'ad/(:stype)/(:pn)': 'ad',
                'ads': 'ads',
                'ads/(:type)': 'ads',
                'ads/(:type)/': 'ads',
                'ads/(:type)/(:pn)': 'ads',
                'trafuser': 'trafuser',
                'trafuser/(:stype)': 'trafuser',
                'trafuser/(:stype)/': 'trafuser',
                'trafuser/(:stype)/(:pn)': 'trafuser',
                'trafad': 'trafad',
                'trafad/(:stype)': 'trafad',
                'trafad/(:stype)/': 'trafad',
                'trafad/(:stype)/(:pn)': 'trafad',
            }
        }),
        getBigVUrl = function() {
            return util.getApiUrl({
                "name": "isvip",
                "params": {}
            });
        },
        isBigV = false;

    var router = new AppRouter;

    var goToLogin = function(callback) {
        if ($userinfo && $userinfo.bduss) {
            if (!isBigV) {
                $.ajax({
                    url: getBigVUrl(),
                    crossDomain: true,
                    dataType: 'jsonp',
                }).done(function(result) {
                    if (result.data.isvip) {
                        isBigV = true;
                        callback();
                    } else {
                        isBigV = false;
                        window.$userinfo = null;
                        window.location.hash = '#login';
                        return;
                    }
                });
            } else {
                callback();
            }
        } else {
            isBigV = false;
            window.$userinfo = null;
            window.location.hash = '#login';
            return;
        }
    };
    router.on('route:login', function() {
        if ($userinfo && $userinfo.bduss) {
            window.location.hash = '#msg';
            return;
        }
        $('div.current').removeClass('current').addClass('hide');
        if ($('#login').data('widgetCreated')) {
            $('#login').login('reRender');
        } else {
            $('#login').login();
        }
    });

    router.on('route:homepage', function(pn) {
        goToLogin(function() {
            var opt = {
                pn: pn || 0
            }
            if ($('#homepage').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#homepage').removeClass('hide').addClass('current');
            }
            if ($('#homepage').data('widgetCreated')) {
                $('#homepage').homepage('reRender', opt);
            } else {
                $('#homepage').homepage(opt);
            }
            showNav();
        });
    });

    router.on('route:mockme', function() {
        var opts = {
            pageStatus: {
                status: arguments[0] == "expand" ? "expand" : "unexpand",
            }
        };
        if (opts.pageStatus.status == "expand") {
            opts.pageStatus.itemid = arguments.length > 1 ? arguments[1] : 0;
            opts.pageStatus.pn = arguments.length > 2 ? arguments[2] : 0;
        } else {
            opts.pageStatus.pn = arguments.length > 1 ? arguments[1] : 0;
        }
        goToLogin(function() {
            $('div.current').removeClass('current').addClass('hide');

            if ($('#mocksquare').data('widgetCreated')) {
                $('#mocksquare').mocksquare('reRender', opts);
            } else {
                $('#mocksquare').mocksquare(opts);
            }
            showNav();
        });

    });

    router.on('route:mocksquare', function() {
        var opts = {
            pageStatus: {
                status: arguments[0] == "expand" ? "expand" : "unexpand",
            }
        };
        if (opts.pageStatus.status == "expand") {
            opts.pageStatus.itemid = arguments.length > 1 ? arguments[1] : 0;
            opts.pageStatus.pn = arguments.length > 2 ? arguments[2] : 0;
        } else {
            opts.pageStatus.pn = arguments.length > 1 ? arguments[1] : 0;
        }
        goToLogin(function() {
            $('div.current').removeClass('current').addClass('hide');
            if ($('#mocksquare').data('widgetCreated')) {
                $('#mocksquare').mocksquare('reRender', opts);
            } else {
                $('#mocksquare').mocksquare(opts);
            }
            showNav();
        });
    });

    router.on('route:msg', function(pn) {
        goToLogin(function() {
            $('div.current').removeClass('current').addClass('hide');
            var opt = {
                pn: pn || 0
            }
            if ($('#msg').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#msg').removeClass('hide').addClass('current');
            }
            if ($('#msg').data('widgetCreated')) {
                $('#msg').msg('reRender', opt);
            } else {
                $('#msg').msg(opt);
            }

            showNav();
        });
    });

    router.on('route:msgs', function(status, pn) {
        goToLogin(function() {
            var opt = {
                status: status || '1',
                pn: pn || 0
            }
            if ($('#msgs').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#msgs').removeClass('hide').addClass('current');
            }
            if ($('#msgs').data('widgetCreated')) {
                $('#msgs').msgs('reRender', opt);
            } else {
                $('#msgs').msgs(opt);
            }
            showNav();
        });
    });

    router.on('route:fans', function(status, pn) {
        goToLogin(function() {
            var opt = {
                status: status || '1',
                pn: pn || 0
            }
            if ($('#fans').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#fans').removeClass('hide').addClass('current');
            }
            if ($('#fans').data('widgetCreated')) {
                $('#fans').fans('reRender', opt);
            } else {
                $('#fans').fans(opt);
            }
            showNav();
        });

    });

    router.on('route:rawedit', function(id) {
        goToLogin(function() {
            var opt = {
                id: id
            }
            $('div.current').removeClass('current').addClass('hide');
            if ($('#rawedit').data('widgetCreated')) {
                $('#rawedit').rawedit('reRender', opt);
            } else {
                $('#rawedit').rawedit(opt);
            }
            showNav();
        });
    });

    router.on('route:raws', function(type, pn) {
        goToLogin(function() {
            var opt = {
                type: type || '2',
                pn: pn || 0
            }
            if ($('#raws').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#raws').removeClass('hide').addClass('current');

            }
            if ($('#raws').data('widgetCreated')) {
                $('#raws').raws('reRender', opt);
            } else {
                $('#raws').raws(opt);
            }
            showNav();
        });
    });

    router.on('route:ad', function(stype, pn) {
        goToLogin(function() {
            var opt = {
                stype: stype || '0',
                pn: pn || 0
            }
            if ($('#ad').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#ad').removeClass('hide').addClass('current');

            }
            if ($('#ad').data('widgetCreated')) {
                $('#ad').ad('reRender', opt);
            } else {
                $('#ad').ad(opt);
            }
            showNav();
        });
    });

    router.on('route:ads', function(type, pn) {
        goToLogin(function() {
            var opt = {
                type: type || '2',
                pn: pn || 0
            }
            if ($('#ads').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#ads').removeClass('hide').addClass('current');
            }
            if ($('#ads').data('widgetCreated')) {
                $('#ads').ads('reRender', opt);
            } else {
                $('#ads').ads(opt);
            }
            showNav();
        });
    });

    router.on('route:trafuser', function(stype, pn) {
        goToLogin(function() {
            var opt = {
                stype: stype || '0',
                pn: pn || 0
            }
            if ($('#trafuser').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#trafuser').removeClass('hide').addClass('current');
            }
            if ($('#trafuser').data('widgetCreated')) {
                $('#trafuser').trafuser('reRender', opt);
            } else {
                $('#trafuser').trafuser(opt);
            }
            showNav();
        });
    });

    router.on('route:trafad', function(stype, pn) {
        goToLogin(function() {
            var opt = {
                stype: stype || '0',
                pn: pn || 0
            }
            if ($('#trafad').hasClass('hide')) {
                $('div.current').removeClass('current').addClass('hide');
                $('#trafad').removeClass('hide').addClass('current');
            }
            if ($('#trafad').data('widgetCreated')) {
                $('#trafad').trafad('reRender', opt);
            } else {
                $('#trafad').trafad(opt);
            }
            showNav();
        });
    });

    var showNav = function() {
        goToLogin(function() {
            var $nav = $('#nav');
            if ($('#mock-pages').hasClass('hide')) {
                $('#mock-pages').removeClass('hide');
            }
            if ($nav.data('widgetCreated')) {
                if ($nav.hasClass('hide')) {
                    $nav.removeClass('hide');
                }
            } else {
                $nav.nav();
            }
            $nav.nav('refreshSelected');
        });
    };

    Backbone.history.start();

    module.exports = $.mock.router;
});