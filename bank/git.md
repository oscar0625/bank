# https://blog.csdn.net/qq_35246620/article/details/66973794

# 一、 安装 Git 及体验 Git 命令
http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
## 0.介绍  
```
    git 分为4个区域
        Workspace：工作区
        Index / Stage：暂存区
        Repository：仓库区（或本地仓库）
        Remote：远程仓库
    高频用语  git的命令中经常会用到HEAD，可以将HEAD看做一个指针，HEAD指本地的版本库，
             --cached 暂存区
             origin代表远程仓库的地址
```
## 1.新建代码库
```
    a.在当前目录下 初始化成Git代码库 生成 .git 
        $ git init
    b.按照路径新建一个目录，然后将其初始化为Git代码库
        $ git init  /d/github/init
    c.将github远端服务器的仓库上的文件下载下来
        $ git clone https://github.com/oscar0625/bank.git [server]
```
## 2.增加/删除文件到暂存区(Index)
```
    a.$ git add .                       添加当前目录的 新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件 到暂存区
    b.$ git add -A                      all 提交所有变化到暂存区(不推荐使用 偷懒办法)
    c.$ git add [file] / [dir]          添加指定文件/文件夹到暂存区
    d.$ git rm  [file] / [dir]          删除指定文件到暂存区
    住：报错问题  warning: LF will be replaced by CRLF….. 
        解决办法  $ git config --global core.autocrlf  false
```
## 3.代码提交到仓库区(Repository)
```        
    a.$ git commit -m "备注信息"                      提交暂存区到仓库区
    b.$ git commit [file1] [file2] ... -m "备注信息'  提交暂存区的指定文件到仓库区
    c.$ git commit --amend -m [message]              使用一次新的commit,替代上一次提交,如果代码没有任何新变化，则用来改写上一次commit的提交信息
```
## 4.远程同步 推/拉代码到远端仓库(Remote)
```
    a.注意:如果你是克隆下来的,那么忽略此步骤，但如果你是新建的，你首先应将 Repository(本地仓库) 连接到某个Remote(远程服务器)
        $ git remote add [shortname] [url]              增加一个新的远程仓库，并命名
            example : $ git remote add origin https://github.com/oscar0625/bank.git
    b.  $ git pull [remote] [branch]                    
        该单词直译过来就是“拉”的意思，如果我们远程仓库的代码有了更新，同样为了保持本地与远程的代码同步，我们就需要把远程的代码拉到本地
            example : $ git pull origin master
        此外，在之前我们讲到过pull request，在这里，估计大家就能更好的理解了，它表示：如果我们fork了别人的项目（或者说代码），并对其进行了修改，想要把我们的代码合并到原始项目（或者说原始代码）中，我们就需要提交一个pull request，让原作者把我们的代码拉到 ta 的项目中，至少对于 ta 来说，我们都是属于远程端的。
    c.  $ git push [remote] [branch]                    
        该单词直译过来就是“推”的意思，如果我们本地的代码有了更新，为了保持本地与远程的代码同步，我们就需要把本地的代码推到远程的仓库
            example : $ git push origin master
        注意:如果是自己新建的文件夹 上传会失败 因为少了一个readme文件 
        解决办法执行 $ git pull --rebase origin master
```
## 5.查看信息
```
    $ git status                      显示有变更的文件
    $ git log                         显示当前分支的版本号
    $ git diff [file] / 空            显示工作区和暂存区的差异 (空是整体差异 写file是针对file的差异)
    $ git diff --cached [file] / 空   显示暂存区和仓库区的差异 (空是整体差异 写file是针对file的差异)
    $ git diff HEAD  [file] / 空      显示工作区与仓库区的差异 (空是整体差异 写file是针对file的差异)
```
## 6.主线分支
```
    $ git branch                        查看 Git 仓库的分支情况
    $ git branch a / [分支名]            创建一个新的分支a
    $ git checkout a / [分支名]          切换到当前分支a
    $ git merge a / [分支名]             切换到master分支，然后输入git merge a命令，将a分支合并到master分支
    $ git branch -d a / [分支名]         删除a分支
```
## 7.标记
```
    $ git tag v1.0 / [版本号]            为当前分支添加标记
    $ git tag                            查看所有标记记录
    $ git checkout v1.0                  换到该标签下的代码状态
```
## 8.替换checkout/reset撤销
```
    $ git reset HEAD [file]/ 空       重置暂存区的指定文件，与仓库区保持一致，但工作区不变 *(空重置所有)
    $ git reset --hard head           重置暂存区与工作区，与仓库区保持一致
    $ git reset – hard origin/master  重置工作去、暂存区、仓库区,与远程服务器的origin/master一致 
    $ git reset – hard [commitID]     重置工作去、暂存区、仓库区,还原到指定id的那一版本--> git log获取id
    $ git checkout [file]/ 空         用暂存区的所有文件替换掉工作区的所有文件(file指定文件)
    $ git checkout HEAD [file]/ 空    用仓库区的所有文件替换掉暂存区和工作区的的所有文件(file指定文件)
```
## 9.其他
```
    $ cd        返回上一级
    $ cd /D     进入D盘
    $ ls        显示当前文件夹下的文件列表
    $ cls       清屏
```

# 二、 使用 Git 与 GitHub 进行交互
## 0. 配置 username和email，因为github每次commit都会记录他们。 
```
    $ git config --global user.name "oscar0625"
    $ git config --global user.email "749301111@qq.com"
```
## 1.利用 SSH 完成 Git 与 GitHub 的绑定
```
    生成 SSH key 
        $ ssh-keygen -t rsa         然后敲三次回车键
    找到 C:\Documents and Settings\username\\.ssh 
        -> id_rsa  获取里面的密钥
        example: ssh-rsa ***************
    在github官网上 进入Settings页面后，再点击SSH and GPG Keys进入此子界面，然后点击New SSH key按钮
    测试
        $ ssh -T git@github.com
        输入 yes
        提示 You've successfully authenticated, but GitHub does not provide shell access. 证明成功了
```
## 2.GitHub 术语解释
```
Repository：简称Repo，可以理解为“仓库”，我们的项目就存放在仓库之中。也就是说，如果我们想要建立项目，就得先建立仓库；有多个项目，就建立多个仓库。

Issues：可以理解为“问题”，举一个简单的例子，如果我们开源一个项目，如果别人看了我们的项目，并且发现了bug，或者感觉那个地方有待改进，他就可以给我们提出Issue，等我们把Issues解决之后，就可以把这些Issues关闭；反之，我们也可以给他人提出Issue。

Star：可以理解为“点赞”，当我们感觉某一个项目做的比较好之后，就可以为这个项目点赞，而且我们点赞过的项目，都会保存到我们的Star之中，方便我们随时查看。在 GitHub 之中，如果一个项目的点星数能够超百，那么说明这个项目已经很不错了。

Fork：可以理解为“拉分支”，如果我们对某一个项目比较感兴趣，并且想在此基础之上开发新的功能，这时我们就可以Fork这个项目，这表示复制一个完成相同的项目到我们的 GitHub 账号之中，而且独立于原项目。之后，我们就可以在自己复制的项目中进行开发了。

Pull Request：可以理解为“提交请求”，此功能是建立在Fork之上的，如果我们Fork了一个项目，对其进行了修改，而且感觉修改的还不错，我们就可以对原项目的拥有者提出一个Pull请求，等其对我们的请求审核，并且通过审核之后，就可以把我们修改过的内容合并到原项目之中，这时我们就成了该项目的贡献者。

Merge：可以理解为“合并”，如果别人Fork了我们的项目，对其进行了修改，并且提出了Pull请求，这时我们就可以对这个Pull请求进行审核。如果这个Pull请求的内容满足我们的要求，并且跟我们原有的项目没有冲突的话，就可以将其合并到我们的项目之中。当然，是否进行合并，由我们决定。

Watch：可以理解为“观察”，如果我们Watch了一个项目，之后，如果这个项目有了任何更新，我们都会在第一时候收到该项目的更新通知。

Gist：如果我们没有项目可以开源或者只是单纯的想分享一些代码片段的话，我们就可以选择Gist。不过说心里话，如果不翻墙的话，Gist并不好用。
```
## 3.github上的分支和合并
https://blog.csdn.net/qq_35246620/article/details/65628903
## 4.详述 GitHub 如何将代码从原分支合并到 fork 分支
https://guobinhit.blog.csdn.net/article/details/98039346