
build/ 构建脚本
dist/ 编译出来的发布版
docs/ 文档
examples/ 示例文件（如果你写的是库的话）
src/ 源码test/ 测试脚本

.babelrc Babel 交叉编译的配置
.eslintrc ESLint 测试配置
.gitignore 哪些文件不要上传到 GitHub
.gitattributes 文件属性，如 EOL、是否为二进制等
LICENSE 授权协议

README.md 自述文件，
    里面至少得写：项目的特色各种 Badge 比如 CI 的怎么下载安装示例运行/使用怎么编译（尤其 C/C++，要把编译器、要装什么工具、依赖库全部写清楚。要带版本号！）怎么参与
circle.yml Circle CI 持续集成配置文件（当然你可能用别的 CI，名字会变。比如我那个 otfcc 使用了两个 CI：Travis 和 Appveyor，就写了两个配置）

bower.json Bower 包管理器配置文件
package.json npm 包管理器配置文件

