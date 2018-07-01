/**
 * Created by vicky on 18/5/21.
 */

function detailBlogController($scope,$http,$rootScope,$routeParams) {
    $scope.blogItem = $routeParams.blogItem;
    $('#ifr').attr('src',$scope.blogItem);

    //自动计算高度
    function calcPageHeight(doc) {
        var cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
        var sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight)
        var height = Math.max(cHeight, sHeight)
        return height
    }
    var ifr = document.getElementById('ifr')
    ifr.onload = function () {
        var iDoc = ifr.contentDocument || ifr.document
        var height = calcPageHeight(iDoc)
        ifr.style.height = height + 'px';
        $(".div_center").css({height:height + 'px'});
    }

}