/**
 * Created by vicky on 16/7/7.
 */

function loginController($scope, $window, $http) {
    $scope.vvv = function () {
        console.log("==")

        var canvas = document.getElementById("testcanvas");
        var ctx = canvas.getContext("2d");
        var image = document.getElementById("sss");
        ctx.drawImage(image, 0, 0,canvas.width,canvas.height)
    }
    var imgs = $("#imgs>img").length;


}