/**
 * Created by vicky on 16/7/7.
 */


var mySTPSApp = angular.module('mySTPSApp', ['ngRoute', 'angularFileUploads']);
mySTPSApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: addBlogController,
        templateUrl: 'template/blogIndex.html'
    }).when('/addBlog', {
        controller: addBlogController,
        templateUrl: 'template/addBlog.html'
    }).when('/blogDetail', {
        controller: detailBlogController,
        templateUrl: 'template/blogDetail.html'
    })
        .otherwise({
            redirectTo: '/'
        });
    ;
}]);


