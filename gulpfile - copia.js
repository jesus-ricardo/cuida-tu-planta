//imports
var gulp = require('gulp'); //fichero principal gulp
var gutil = require('gulp-util'); //algunas utilidades básicas de gulp
var runSequence = require('run-sequence'); //permite ejecutar tareas de manera sincrona o asincrona a voluntad
var babel = require('gulp-babel'); //pasa de js6 a js5 para compatibilidad con navegadores
var inject = require('gulp-inject');
var htmlmin = require('gulp-htmlmin');
//var bowerFiles = require('main-bower-files')

//end

//consts
var JSPATH='./src/**/*.js';
var CSSPATH='./src/**/*.css';
var DEV_TASK=['babel'];
//end

//tasks
gulp.task('default',['dev']);
gulp.task('production',production);
gulp.task('dev',dev);
gulp.task('js6to5',js6to5);
gulp.task('inject-js',injectJS);
gulp.task('min-js',minJS);
gulp.task('inject-css',injectCSS);
gulp.task('min-css',minCSS);
gulp.task('copy-html',copyHTML);
gulp.task('min-html',minHTML);
gulp.task('init-server',initServer);
//end

//functions
function dev(){
  //ejecuta tareas de manera sincrona
  runSequence(
    'js6to5', //pasa todos los js a js5 para compatibilidad,
    'inject-js', //inyecta en index.html los ficheros js,
    'inject-css', //inyecta en index.html los ficheros css,
    'copy-html' //copia los ficheros html de src a www
  );
}
function production(){

}
function js6to5(){
  return gulp.src([JSPATH,'!./src/lib/**/*'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./www'));
}
function injectJS(){
    var target = gulp.src('./www/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./www/**/*.js','!./www/lib/**/*'], {read: false});

    return target.pipe(inject(sources))
      .pipe(gulp.dest('./www'));
}
function minJS(){

}
function injectCSS(){
  console.log('inyecta css');
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./src/**/*.css','!./src/lib/**'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
}
function minCSS(){

}

function copyHTML(){
  return gulp.src('src/**/*.html').pipe(gulp.dest('./www/'));
}
function minHTML(){
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
}
function initServer(){

}

//end
/*
 gulp.task('inject-bower',injectBower);
function injectBower(){
 console.log(bowerFiles);
 return gulp.src('./src/index.html')
 .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
 .pipe(gulp.dest('./build'));
 }*/
