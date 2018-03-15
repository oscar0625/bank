一、首次配置 http://blog.csdn.net/Hanani_Jia/article/details/77950594
1. 下载git  安装 打开 Git Bush
2. 输入 
    $ ssh-keygen -t rsa -C "749301111@qq.com"
    选择 y   一路空格
3. 找到对应路径 里面的 .ssh文件  -> id_rsa.pub  获取里面的密钥        ssh-rsa *************** 749301111@qq.com

4. 在github官网上 找到 Settings ->SSH and GPG keys  添加这个ssh
5. 验证
    $ ssh -T git@github.com
    输入yes
    如果提示  You've successfully authenticated, but GitHub does not provide shell access. 证明成功了
   
6. 配置 username和email，因为github每次commit都会记录他们。 
   $ git config --global user.name "oscar0625"
   $ git config --global user.email "749301111@qq.com"
   注意:我的github 密码 qiangqiang0625
   
二、 git 常用命令

0.介绍: http://www.bootcss.com/p/git-guide/    http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
    git 分为4个区域
        Workspace：工作区
        Index / Stage：暂存区
        Repository：仓库区（或本地仓库）
        Remote：远程仓库
    高频用语  git的命令中经常会用到HEAD，可以将HEAD看做一个指针，HEAD指本地的版本库，
             --cached 暂存区
             origin代表远程仓库的地址
    
1.新建代码库
    a.在当前目录下 初始化成Git代码库 生成 .git 
        $ git init
    b.按照路径新建一个目录，然后将其初始化为Git代码库
        $ git init  /d/github/init
    c.将github远端服务器的仓库上的文件下载下来
        $ git clone https://github.com/oscar0625/bank.git [server]
        
2.增加/删除文件到暂存区(Index)
    a.$ git add .                       添加当前目录的 新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件 到暂存区
    b.$ git add -A                      all 提交所有变化到暂存区(不推荐使用 偷懒办法)
    c.$ git add [file] / [dir]          添加指定文件/文件夹到暂存区
    d.$ git rm  [file] / [dir]          删除指定文件到暂存区
    住：报错问题  warning: LF will be replaced by CRLF….. 
        解决办法  $ git config --global core.autocrlf  false
        
3.代码提交到仓库区(Repository)
    a.$ git commit -m "备注信息"                      提交暂存区到仓库区
    b.$ git commit [file1] [file2] ... -m "备注信息'  提交暂存区的指定文件到仓库区
    c.$ git commit --amend -m [message]              使用一次新的commit,替代上一次提交,如果代码没有任何新变化，则用来改写上一次commit的提交信息
    
4.远程同步 提交到远端仓库(Remote)
    a.注意:如果你是克隆下来的,那么忽略此步骤，但如果你是新建的，你首先应将 Repository(本地仓库) 连接到某个Remote(远程服务器)
        $ git remote add [shortname] [url]              增加一个新的远程仓库，并命名
            example : $ git remote add origin https://github.com/oscar0625/bank.git
    b.  $ git pull [remote] [branch]                    取回远程仓库的变化，并与本地分支合并
            example : $ git pull origin master
    c.  $ git push [remote] [branch]                    上传本地指定分支到远程仓库
            example : $ git push origin master
        注意:如果是自己新建的文件夹 上传会失败 因为少了一个readme文件 
        解决办法执行 $ git pull --rebase origin master
            
5.查看信息
    $ git status                      显示有变更的文件
    $ git log                         显示当前分支的版本号
    $ git diff [file] / 空            显示工作区和暂存区的差异 (空是整体差异 写file是针对file的差异)
    $ git diff --cached [file] / 空   显示暂存区和仓库区的差异 (空是整体差异 写file是针对file的差异)
    $ git diff HEAD  [file] / 空      显示工作区与仓库区的差异 (空是整体差异 写file是针对file的差异)
6.替换checkout/reset撤销
    $ git reset HEAD [file]/ 空       重置暂存区的指定文件，与仓库区保持一致，但工作区不变 *(空重置所有)
    $ git reset --hard head           重置暂存区与工作区，与仓库区保持一致
    $ git reset – hard origin/master  重置工作去、暂存区、仓库区,与远程服务器的origin/master一致 
    $ git reset – hard [commitID]     重置工作去、暂存区、仓库区,还原到指定id的那一版本--> git log获取id
    $ git checkout [file]/ 空         用暂存区的所有文件替换掉工作区的所有文件(file指定文件)
    $ git checkout HEAD [file]/ 空    用仓库区的所有文件替换掉暂存区和工作区的的所有文件(file指定文件)
7.其他
    $ cd        返回上一级
    $ cd /D     进入D盘
    $ ls        显示当前文件夹下的文件列表
    $ cls       清屏

    
   
   
    
    
