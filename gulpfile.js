	var gulp = require('gulp'),
  connect = require('gulp-connect');


gulp.task('connect', function() {
  connect.server({
    root: ['src'],
    host: 'localhost',
    port: 8100,
    livereload: true
  });
});

gulp.task('default', ['connect']);
