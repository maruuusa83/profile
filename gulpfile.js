var gulp = require('gulp');

var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  var stream = gulp.src('sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('static'));
  return stream;
});

gulp.task('js', function(){
  var stream = gulp.src(["static/data.js", "static/main.js"])
    .pipe(uglify())
    .pipe(gulp.dest('static'));
  return stream;
});

gulp.task('default', ['js', 'sass']);
