(function () {
    'use strict';
    angular.module('app.controllers')
        .controller('personalOrderDetailsController', ['$api', '$timeout', '$upload', '$http', '$state', '$scope', '$defaultConfig', '$layer', function ($api, $timeout, $upload, $http, $state, $scope, $defaultConfig, $layer) {
            var vm = this;
            vm.query = {
                pageNum: 1,
                pageSize: 10
            };
            vm.popShow = false;
            //获取列表
            vm.getPagedDataAsync = function () {
                $layer.loading();
                $http({
                    url: $defaultConfig.current_uri + 'json/list.json',//请求的url路径
                    method: 'GET',    //GET/POST
                    params: {query: angular.toJson(vm.query)},   //参数
                    // data: data        //通常在POST请求时使用
                }).success(function (result) {
                    //成功处理
                    $layer.close();
                    vm.list = result.data.list;
                    vm.query.pages = result.data.pages;
                    for (var i = 0; i < vm.list.length; i++) {
                        vm.list[i].checked = false;//添加默认选中状态
                    }
                }).error(function () {
                    //错误处理
                });
            };

//---------------------------------------------------------------------------------------分割线-----------------------------------------------------------------------------------------//
            //checkbox点击
            vm.totalClass = function (event) {
                var className = event.target.getAttribute('class');
                className == 'checkboxIco' ? event.target.setAttribute('class', 'checkboxIcoChecked') : event.target.setAttribute('class', 'checkboxIco')
            };
            //删除
            vm.delete = function (index) {
                vm.list.splice(index, 1);
            };
            //订单画像
            vm.toDetail = function () {
                window.open($defaultConfig.current_uri + 'detail.html');
            }

        }])
}());