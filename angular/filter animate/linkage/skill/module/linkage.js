angular.module('linkage', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('linkage', {
                url: '/linkage',
                templateUrl: 'template/linkage/index-linkage.html',
                controller: 'linkageCtrl',
                resolve: {
                    province: ['linkageService', function (linkageService) {
                        return linkageService.getProvince()
                    }],
                    city: ['linkageService', 'province', function (linkageService, province) {
                        return linkageService.getCity(province.data[0].code)
                    }],
                    town: ['linkageService', 'city', function (linkageService, city) {
                        return linkageService.getTown(city.data[0].code)
                    }]
                }
            })
    })
    .controller('linkageCtrl', [
        '$scope',
        'linkageService',
        'province',
        'city',
        'town',
        function ($scope, linkageService, province, city, town) {


            $scope.proArr = province.data;
            $scope.provinceCode = province.data[0].code;

            $scope.cityArr = city.data;
            $scope.cityCode = city.data[0].code;

            $scope.townArr = town.data;
            $scope.townCode = town.data[0].code;

            $scope.$watch('provinceCode', function (newVal, oldVal) {
                linkageService.getCity(newVal).success(function (dataCity) {
                    $scope.cityArr = dataCity;
                    $scope.cityCode = dataCity[0].code;
                })
            });
            $scope.$watch('cityCode', function (newVal, oldVal) {
                    linkageService.getTown(newVal).success(function (data) {
                        $scope.townArr = data;
                        $scope.townCode = data[0].code;
                    })
            });
            // $scope.proChange = function () {
            //     linkageService.getCity($scope.provinceCode).success(function (dataCity) {
            //         $scope.cityArr = dataCity;
            //         // console.log(dataCity[0].code);
            //         $scope.cityCode = dataCity[0].code;
            //         /*注意 $http是异步请求 如果下面代码现在外面 会导致传递的参数出错 $scope.cityCode*/
            //         linkageService.getTown($scope.cityCode).success(function (dataTown) {
            //             $scope.townArr = dataTown;
            //             $scope.townCode = dataTown[0].code;
            //         })
            //     })
            // };
            // $scope.cityChange = function () {
            //     linkageService.getTown($scope.cityCode).success(function (data) {
            //         $scope.townArr = data;
            //         $scope.townCode = data[0].code;
            //     })
            // }

        }])

    .service('linkageService', ['$http', 'constantUrl', function ($http, constantUrl) {
        this.getProvince = function () {
            return $http.get(constantUrl.province)
        };
        this.getCity = function (value) {
            return $http.get(constantUrl.city, {params: {value: value}})
        };
        this.getTown = function (value) {
            return $http.get(constantUrl.town, {params: {value: value}})
        }
    }])
    .constant('constantUrl', {
        province: 'sql/province.php',
        city: 'sql/city.php',
        town: 'sql/town.php'
    })