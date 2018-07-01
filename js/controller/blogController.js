/**
 * Created by vicky on 18/5/17.
 */

function addBlogController($scope, $window, $http, $upload, $location) {

    $scope.blogType = ['Android', 'Project', 'Tools', "Other"];
    $scope.selectedType = '';
    $scope.blogModel = {
        blogName: '', //名称
        blogType: '',
        description: '',//描述
        keyWords: '',//
        blogContent: '',//
        blogPic: '',
        visitCount: '',
        isDelete: '',
        isActive: ''
    }
    $scope.blogList = [];

    /***
     * 获取博客列表
     */
    $scope.getBlogs = function () {
        $.post(serverUrl + '/blog/getBlogList')
            .success(function (data, status, headers, config) {
                if (data.status == "200") {
                    $scope.blogList = data.info;
                    $scope.$apply();
                    console.log($scope.blogList)
                } else {
                    alert("失败");
                }
            })
            .error(function (data, status, headers, config) {
                console.log(data);
                return;
            });
    }




    /****
     * 实现新增博客
     */
    $scope.addBlogs = function () {

        if (!$scope.blogModel.blogContent) {
            alert("请上传文件");
            return;
        } else if (!$scope.blogModel.blogPic) {
            alert("请上传文件");
            return;
        }
        //选择
        $scope.blogModel.blogType = $scope.selectedType;

        $.post(serverUrl + '/blog/insertBlogs', $scope.blogModel)
            .success(function (data, status, headers, config) {
                if (data.status == "200") {
                    alert("新增成功");
                } else {
                    alert("失败");
                }
            })
            .error(function (data, status, headers, config) {
                console.log(data);
                return;
            });
    }

    //上传照片
    $scope.onFileSelect = function ($files, type) {
        console.log(type)

        if ($files.length <= 0) return;

        $upload.upload({
            url: serverUrl + '/blog/uploadFiles',
            method: 'POST',
            type: JSON,
            file: $files[0]


        }).progress(function (evt) {

        }).success(function (data, status, headers, config) {
            // file is uploaded successfully
            console.log(data.msg)
            if (data.status == 200) {
                console.log("upload success")
                if (type == 'blogPic') {
                    $scope.blogModel.blogPic = data.fileUrl
                } else {
                    $scope.blogModel.blogContent = data.fileUrl

                }


            } else {
                alertShow('warning', 6, "上传失败");
            }

        }).error(function (err) {        // file is uploaded successfully

            console.log("err" + JSON.stringify(err));
            return;

        });
    };

    /**
     * 查看详情
     */
    $scope.gotoDetail = function (item) {
        return $location.path('/blogDetail').search({"blogItem": item.blogContent});
    }
    $scope.gotoAddBlogs = function (item) {
        return $location.path('/addBlog');
    }
    $scope.searchBlogByType = function (type) {
        $.post(serverUrl + '/blog/searchBlogByType', {blogType: type})
            .success(function (data, status, headers, config) {
                if (data.status == "200") {
                    $scope.blogList = data.info;
                    $scope.$apply();
                } else {
                    alert("失败");
                }
            })
            .error(function (data, status, headers, config) {
                console.log(data);
                return;
            });
    }

    $scope.getBlogs()

}