//requires
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence'); //permite ejecutar tareas de manera sincrona o asincrona a voluntad
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');  //inyectar js y css
var bowerFiles = require('main-bower-files');

//vars
var JSPATH='./www/**/*.js';
var INDEX='./www/index.html';

//tasks
gulp.task('default',['escucha', 'dev']);
gulp.task('dev',dev);
gulp.task('inject-js',injectJS);
gulp.task('injectBowerFiles',injectBowerFiles);
gulp.task('escucha',escucha);

//Functions
function dev() {
  runSequence(
    'inject-js',
    'injectBowerFiles'
  );
}

function injectJS() {
  //var target = gulp.src(INDEX);
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  //var sources = gulp.src([JSPATH,'!./www/lib/**/*'], {read: false});
  //return target.pipe(inject(sources,{relative: true}))
  //  .pipe(gulp.dest('./www'));
  return gulp.src(INDEX)
    .pipe(inject(
      gulp.src([JSPATH,'!./www/lib/**/*']).pipe(angularFilesort()), {relative: true}
    ))
    .pipe(gulp.dest('./www'));
}
function injectBowerFiles() {
  gulp.src(INDEX)
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {relative: true,name: 'bower'}))
    .pipe(gulp.dest('./www'));
}
function escucha(){
  console.log('escucho');
  gulp.watch('www/**/*.js', ['inject-js']);
}
