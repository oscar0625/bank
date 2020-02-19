const { src, dest, series, parallel } = require('gulp');
//cnpm install --save-dev gulp-uglify 
const uglify = require('gulp-uglify');

//混淆（压缩）
exports.default = function () {
    return src('input/**/*.js', { sourcemaps: true })
        .pipe(uglify())
        .pipe(dest('output/', { sourcemaps: '.' }));
}
