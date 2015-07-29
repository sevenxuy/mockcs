require.config({
    baseUrl: './js/app/',
    //baseUrl: '/mis/video/mockcs/js/app',
    paths: {
        'jquery': '../lib/jquery-1.9.1.min',
        // 'jquery.ui.widget': '../lib/jquery-ui.widget.min',
        'jquery.ui': '../lib/jquery-ui.min',
        'jquery.ui.touch-punch': '../lib/jquery.ui.touch-punch.min',
        'underscore': '../lib/underscore-min',
        'backbone': '../lib/backbone-min',
        'bootstraplib': '../lib/bootstrap.min',
        'jquery.datetimepicker': '../lib/jquery.datetimepicker',
        'editor': '../lib/editor',
        'md5': '../lib/jquery.md5',
        'd3': '../lib/d3.min',
        'bootstrap': 'bootstrap'
    },
    // Configure the dependencies, exports, and custom initialization
    shim: {
        'mock': ['jquery', 'jquery.ui', 'jquery.ui.touch-punch', 'underscore', 'backbone', 'bootstraplib', 'jquery.datetimepicker', 'editor', 'md5', 'd3'],
        'jquery.ui': ['jquery'],
        'jquery.ui.touch-punch': ['jquery', 'jquery.ui'],
        'underscore': {
            exports: '_'
        },
        'backbone': ['jquery', 'underscore'],
        'bootstraplib': ['jquery', 'jquery.ui'],
        'jquery.datetimepicker': ['jquery', 'jquery.ui'],
        'editor': ['jquery', 'bootstraplib', 'jquery.ui', 'jquery.ui.touch-punch'],
        'md5': ['jquery']
    },
    deps: ['bootstrap']
});
