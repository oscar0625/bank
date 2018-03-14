const gulp=require('gulp');

//1.混淆  cnpm install gulp-uglify --save-dev
// const uglify=require('gulp-uglify');
// gulp.task('default',()=>{
//     gulp.src('src/listening.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('public/hx'))
// });

//2合并文件 cnpm install gulp-concat --save-dev
const concat=require('gulp-concat');
gulp.task('default',()=>{
    gulp.src(['src/listeningdetail.js','src/listening.js'])
         /*gulp.src中使用数组的方式引入js文件, 通过在数组中进行排序实现按顺序合并文件*/
        .pipe(concat('app.js'))//合并后的文件名
        .pipe(gulp.dest('public/hb'))
});

//3 ES6编译成ES5  cnpm install --save-dev gulp-babel babel-preset-es2015
//  https://github.com/babel/gulp-babel
// const babel=require('gulp-babel');
// gulp.task('default',()=>{
//     gulp.src('src/es6.js')
//         .pipe(babel({
//             presets:['es2015'] //*************//
//         }))
//         .pipe(gulp.dest('public/es5'))
// });