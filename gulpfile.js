var gulp = require('gulp'); 
var del = require('del'); 
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('clean',function(){
    return del(['public/dist/**/*']);
});

gulp.task('build',['sass','fonts','scripts'],function(){
});

gulp.task('sass', function () {
  return gulp.src('src/styles/**/*.scss') 
  .pipe(sass({
      includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
  }))
  .pipe(gulp.dest('public/dist/css'));
});

gulp.task('fonts', function () {
    return gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*')
        .pipe(gulp.dest('public/dist/fonts'));
});
 

    gulp.task('scripts', function(){
      return gulp.src(['src/scripts/main.js', 'src/scripts/**/*.js'])
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/dist/scripts/'))
        
        .pipe(gulp.src('node_modules/angular/angular.js'))
        .pipe(gulp.dest('public/dist/scripts/angular/'))
        
        .pipe(gulp.src('node_modules/angular-route/angular-route.js'))
        .pipe(gulp.dest('public/dist/scripts/angular/'))
    });

 gulp.task('default',['watch']);
 
 gulp.task('watch', function () { 
  gulp.watch("src/styles/**/*.scss", ['sass']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("src/images/**/*.*", ['images']);
  gulp.watch("node_modules/bootstrap-sass/assets/fonts/**/*", ['fonts']);
});