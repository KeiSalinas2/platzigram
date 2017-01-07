var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var minifyCss = require('gulp-clean-css');

gulp.task('styles', function () {
  gulp
    .src('app.scss')
    .pipe(sass())
    .pipe(rename('app.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/assets/css/'));
})

gulp.task('assets', function () {
  gulp
    .src('assets/img/*')
    .pipe(gulp.dest('public/assets/img/'));
})

function compile(watch) {
  var bundle = browserify('./src/index.js', {debug: true});

  if (watch) {
    bundle = watchify(bundle);
    bundle.on('update', () => {
      console.log('--> Bundling...');
      rebundle();
    });
  }

  function rebundle() {
    bundle
      .transform(babel, {presets: ['es2015'], plugins: ['syntax-async-functions', 'transform-regenerator']})
      .bundle()
      .on('error', function(error) { console.log(error); this.emit('end'); })
      .pipe(source('index.js'))
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('public/js/'));
  }

  rebundle();
}

gulp.task('watch', function () {
  return compile(true);
})

gulp.task('build', function () {
  return compile();
})


gulp.task('default', ['assets', 'styles', 'build']);
