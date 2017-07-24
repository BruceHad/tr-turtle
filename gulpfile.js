'use strict';

const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const run = require('run-sequence');
const path = require('path');
const handlebars = require('gulp-compile-handlebars');
const htmlBeautify = require('gulp-html-beautify');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('clean', function() {
    del(['./dist/*']);
});

gulp.task('html', function() {
    let templateData = {
        title: 'Treerock Quickstart (Basic)',
        subtitle: 'Prototype for quickly bootstrapping basic wep pages.',
        name: 'Treerock'
    };
    let options = {
        ignorePartials: true,
        batch: ['./src/templates/partials']
    };

    gulp.src('src/templates/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(htmlBeautify({
            indentSize: 2
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('css', function() {
    let bootstrapPath = path.join(__dirname,
        'node_modules/bootstrap-sass/assets/stylesheets/');
    gulp.src('src/css/*.scss')
        .pipe(sass({
            includePaths: [bootstrapPath]
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('images', function(){
   gulp.src('./src/images/*') 
   .pipe(gulp.dest('./dist/images'));
});

gulp.task('default', ['clean'], function() {
    run('html', 'js', 'css', 'images');
    gulp.watch('./src/css/*.scss', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/templates/**/*.hbs', ['html']);
});