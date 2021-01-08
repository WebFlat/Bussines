'use strict';

let gulp       	 = require('gulp'),
    browserSync	 = require('browser-sync').create(),
    sass       	 = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger       = require('gulp-rigger'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename');
    


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});


gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('src/js/main.js')
        .pipe(rigger())
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('favicon', function() {
    return gulp.src('src/favicon.*')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve',  gulp.series('sass','html', 'js', 'fonts', 'favicon', function() {

    browserSync.init({
        server: './dist/',
        tunnel: true
    });

    gulp.watch('src/scss/*.scss', gulp.parallel('sass'));
    gulp.watch('src/**/*.html', gulp.parallel('html'));
    gulp.watch('src/js/*.js', gulp.parallel('js'));
    gulp.watch('src/fonts/*', gulp.parallel('fonts'));
}));


gulp.task('default', gulp.series('serve'));
