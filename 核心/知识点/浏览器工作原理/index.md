https://www.infoq.cn/article/CS9-WZQlNR5h05HHDo1b

# 浏览器的多进程
以 Chrome 为例，它由多个进程组成，每个进程都有自己核心的职责，它们相互配合完成浏览器的整体功能，每个进程中又包含多个线程，一个进程内的多个线程也会协同工作，配合完成所在进程的职责。
---
# 浏览器的架构
Chrome 采用多进程架构，其顶层存在一个 Browser process 用以协调浏览器的其它进程。
![](https://static.geekbang.org/infoq/5bee5bceb417a.png)
```
    具体说来，Chrome 的主要进程及其职责如下：
        1.Browser Process：
            负责包括地址栏，书签栏，前进后退按钮等部分的工作；
            负责处理浏览器的一些不可见的底层操作，比如网络请求和文件访问；
        2.Renderer Process：
            负责一个 tab 内关于网页呈现的所有事情
        3.Plugin Process：
            负责控制一个网页用到的所有插件，如 flash
        4.GPU Process
            负责处理 GPU 相关的任务
```
```
    Chrome 多进程架构的优缺点
        优点
            某一渲染进程出问题不会影响其他进程
            更为安全，在系统层面上限定了不同进程的权限
        缺点
            由于不同进程间的内存不共享，不同进程的内存常常需要包含相同的内容。
            为了节省内存，Chrome 限制了最多的进程数，最大进程数量由设备的内存和 CPU 能力决定，当达到这一限制时，新打开的 Tab 会共用之前同一个站点的渲染进程。
```
# 渲染进程是如何工作的
渲染进程几乎负责 Tab 内的所有事情，渲染进程的核心目的在于转换 HTML CSS JS 为用户可交互的 web 页面。

## 1 渲染进程中主要包含以下线程：
```
    1. 主线程 Main thread
    2. 工作线程 Worker thread
    3. 排版线程 Compositor thread
    4. 光栅线程 Raster thread
```
## 2 渲染的流程

### 2.1构建 DOM
```
    当渲染进程接收到导航的确认信息，开始接受 HTML 数据时，主线程会解析文本字符串为 DOM。
    渲染 html 为 DOM 的方法由 HTML Standard 定义。
```
### 2.2加载次级的资源
```
    当渲染进程接收到导航的确认信息，开始接受 HTML 数据时，主线程会解析文本字符串为 DOM。
    渲染 html 为 DOM 的方法由 HTML Standard 定义。
```
