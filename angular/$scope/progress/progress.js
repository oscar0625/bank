/*
* 进度条指令
* 使用注意：
* 1.使用时要在主页面引入的js  css
* 2.模板的路径是相对于主页面的
* 3.需依赖的外部资源 angular ui-router animate(注若不需要过度效果不需要，css有一部分也不需要)
*
* 注： 需要设置<a ui-sref="a" ui-sref-opts="{reload: true}">a</a>  每次点击都刷新
 *    否则会出现一个小bug 即不会触发$stateChangeStart的一个bug
* */
angular.module('progress',[])
    .directive('progressDir',function () {
        return{
            restrict:'EA',
            replace:true,
            /*模板的路径是相对于主页面的*/
            templateUrl:'./progress/progress.html',
            controller:['$scope','$interval','$timeout',function ($scope,$interval,$timeout) {
                $scope.mStyle={width:'0%'};
                $scope.show=false;

                var timer=null;
                $scope.$on('$stateChangeStart',function () {
                    /*首先进来不管有没有timer进来就给我清一次*/
                    $interval.cancel(timer);
                    timer=null;

                    /*初始化宽度*/
                    $scope.mStyle.width='0%';
                    //让进度条能看见
                    $scope.show=true;

                    var width=0;
                    timer=$interval(function () {
                        width=width+1;
                        if(width>=90){
                            /*到90清一次*/
                            $interval.cancel(timer);
                            timer=null;
                        }
                        $scope.mStyle.width=width+'%';
                    },20)
                });
                $scope.$on('$stateChangeSuccess',function () {
                    /*成功进之后再清一次*/
                    $interval.cancel(timer);
                    timer=null;
                    //讲进度条设置到100%
                    $scope.mStyle.width='100%';
                    timer=$timeout(function () {
                        //初始化进度条
                        $scope.show=false;
                        //关闭延时器
                        $interval.cancel(timer);
                        timer=null;
                    },500)
                });
            }],
            scope:{}
        }
    })