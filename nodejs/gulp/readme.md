# 1.安装
https://www.gulpjs.com.cn/docs/getting-started/quick-start/
```
npm install --global gulp-cli
npm install gulp --save-dev
```

# 2.插件
https://www.gulpjs.com.cn/docs/getting-started/using-plugins/

# 3.api
## 1. src 和 dist 处理文件
https://www.gulpjs.com.cn/docs/getting-started/working-with-files/
src  创建一个流，用于从文件系统读取 Vinyl 对象。
dist 创建一个用于将 Vinyl 对象写入到文件系统的流。
```
    const { src, dest } = require('gulp');
    const uglify = require('gulp-uglify');

    exports.default = function () {
        return src('input/**/*.js', { sourcemaps: true })
            .pipe(uglify())
            .pipe(dest('output/', { sourcemaps: '.' }));
    }
```
## 2. series() 和 parallel() 组合任务
https://www.gulpjs.com.cn/docs/getting-started/creating-tasks/
series 将任务函数和/或组合操作组合成更大的操作，这些操作将按顺序依次执行。
parallel 将任务功能和/或组合操作组合成同时执行的较大操作。
对于使用 series() 和 parallel() 进行嵌套组合的深度没有强制限制。

# 4. Glob 详解 （路径）
https://www.gulpjs.com.cn/docs/getting-started/explaining-globs/
