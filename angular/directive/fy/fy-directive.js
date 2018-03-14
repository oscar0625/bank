angular.module('fyApp',[])
    .directive('myDic',function () {
    return{
        templateUrl:'fyTemplate.html',
        controller:['$scope','$http','$attrs',function ($scope,$http,$attrs) {
            $scope.params={
                page:1,
                size:$attrs.size
            };
            $scope.page=[];
            $http.get($attrs.defaultUrl,{params:$scope.params}).success(function (data) {
                console.log(data)
                $scope.data=data
            });
            $http.get($attrs.countUrl).success(function (data) {
                $scope.num=Math.ceil(data[0].count/$scope.params.size);
                for(var i=0;i<$scope.num;i++){
                    $scope.page.push(i+1)
                }
                console.log($scope.page)
            });
            $scope.changePage=function (e) {
                if(e.target.nodeName=='LI'){
                    if(parseInt(e.target.innerHTML)){
                        $scope.params.page=parseInt(e.target.innerHTML);
                        $http.get($attrs.defaultUrl,{params:$scope.params}).success(function (data) {
                            $scope.data=data
                        });
                    }else if(e.target.innerHTML=='&lt;'){
                        if($scope.params.page>1){
                            $scope.params.page=$scope.params.page-1;
                            $http.get($attrs.defaultUrl,{params:$scope.params}).success(function (data) {
                                $scope.data=data
                            });
                        }
                    }else if(e.target.innerHTML=='&gt;'){
                        if($scope.params.page<$scope.page.length){
                            $scope.params.page=$scope.params.page+1;
                            $http.get($attrs.defaultUrl,{params:$scope.params}).success(function (data) {
                                $scope.data=data
                            });
                        }
                    }
                }
            }
        }],
        replace:true,
        restrict:'AE',
        scope:{
            data:'=myData'
        }

    }
})
