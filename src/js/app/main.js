require.config({
    baseUrl: '/js/app/',
    // baseUrl: '/mis/video/mockcs/js/app',
    paths: {
        'jquery': '../lib/jquery-1.9.1.min',
        'jquery.ui.widget': '../lib/jquery-ui.widget.min',
        'underscore': '../lib/underscore-min',
        'backbone': '../lib/backbone-min',
        'bootstraplib': '../lib/bootstrap.min',
        'jquery.datetimepicker': '../lib/jquery.datetimepicker',
        'te': '../lib/jquery-te-1.4.0.min',
        'md5': '../lib/jquery.md5',
        'd3': '../lib/d3.min'
    },
    // Configure the dependencies, exports, and custom initialization
    shim: {
        'mock': ['jquery', 'jquery.ui.widget', 'underscore', 'backbone', 'bootstraplib', 'jquery.datetimepicker', 'te', 'md5', 'd3'],
        'jquery.ui.widget': ['jquery'],
        'underscore': {
            exports: '_'
        },
        'backbone': ['jquery', 'underscore'],
        'bootstraplib': ['jquery', 'jquery.ui.widget'],
        'jquery.datetimepicker': ['jquery'],
        'te': ['jquery'],
        'md5': ['jquery']
    },
    deps: ['bootstrap']
});
