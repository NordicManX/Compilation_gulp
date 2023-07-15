const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');


function comprimeJpeg() {
    return gulp.src('./source/jpeg/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/jpeg'));
}


function comprimeJs() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilacaoSass() {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function() {
    gulp.watch('./source/jpeg/*',{ ignoreInitial: false}, gulp.series(comprimeJpeg));
    gulp.watch('./source/scripts/*.js',{ ignoreInitial: false}, gulp.series(comprimeJs));
    gulp.watch('./source/styles/*.scss',{ ignoreInitial: false}, gulp.series(compilacaoSass));
}
