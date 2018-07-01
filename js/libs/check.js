/**
 * Created by lining on 15/9/1.
 */
var viewport = new Object(),
    pageTop = 0,
    snapToTopThreshold = 20,
    currentPhoto;
window.onresize = onResize;
window.onscroll = function () {
    if (window.pageYOffset <= snapToTopThreshold && pageTop > snapToTopThreshold)
        window.scrollTo(0, 0);
    pageTop = window.pageYOffset;
}


$(function () {
    onResize();
    $('#photoPassCodeHidden').focus();

    $('.total-photos').text($('.thumb').length);
    $('.actions').toggle();

    $('#btnDetailSearch').on('click', function (e) {
    });

    //照片的点击事件
    $('.browser').on('click', '.thumb', selectPhoto);
    $('.browser').on('gesturestart', '.thumb', showPreview);

    //商品界面显示与隐藏
    $('#Stores').on('click', function (e) {
        $('.query').hide();
        $('.catalog').toggle();
        $('.browser').toggleClass('show-product');
    });

    $('#btnAddFavorite').on('click', function (e) {
        if ($('.selected').length == $('.selected.faved').length)
            $('.selected').removeClass('faved');
        else
            $('.selected').addClass('faved');
        $('.favorites-photos').text($('.faved').length);
        $('.selected').removeClass('selected');
    });


    $('#btnClearSelection').on('click', function (e) {
        $('.selected').removeClass('selected');
        $('.actions').hide();
        $('.catalog').hide();
        $('.browser').removeClass('show-product');
        //$('.browser').addClass('.browser');
    });

    $('#btnShowSort').on('click', function (e) {
        $('.sorts').toggle();
    });

    //页码界面数字点击事件
    $('#btnShowPages').on('click', function (e) {
        $('.pages').toggle();
        $('.pagination_page_triangle').toggle();
        SetPageNumHeight();
    });
    $('#btnShowAll').on('click', function (e) {
        $('.thumb').show();
    });

    $('#btnShowSelected').on('click', function (e) {
        $('.thumb').find('.selected').show();
        $('.thumb').not('.selected').hide();
    });

    $('#btnShowFavorite').on('click', function (e) {
        $('.thumb').find('.faved').show();
        $('.thumb').not('.faved').hide();
    });

    //$('.preview').on('click', exitPreview);
    $('#btnClosePreview').on('click', exitPreview);
    $('#btnPreviewNext').on('click', previewShowNext);
    $('#btnPreviewPrevious').on('click', previewShowPrevious);


    //查询按钮
    $('#btnSearch').on('click', function (e) {
        $('.catalog').hide();//商品界面
        $('#shoppingCart').hide();//购物车界面
        $('#sureOrder').hide();//结算页面
        $('.query').toggle();//查询界面
        $('.browser').show();//照片信息
        pictureMargin();
    });
    //商品按钮
    $("#btnStores").on("click", function (e) {
        $('.query').hide();//查询界面
        $('#shoppingCart').hide();//购物车界面
        $('#sureOrder').hide();//结算页面
        $('.catalog').toggle();//商品界面
        $('.browser').show();//照片信息
        pictureMargin();
    });
    //购物车按钮
    $("#Buy").on('click', function () {
        //var queryStatus=$('.query').css('display');
        $('.query').hide();//查询界面
        $('.catalog').hide();//商品界面
        $('.browser').css('margin-right', '0px');
        $('.browser').css('margin-left', '0px');
        $('.browser').hide();//照片信息
        $('#sureOrder').hide();//结算页面
        $("#shoppingCart").toggle();
        if ($("#shoppingCart").css('display') == 'none') {
            $('.browser').show();//查询界面
        }
        $("#shoppingCart .shoppingCart_content").scrollTop(0);

    });
    //打印按钮
    $("#btnPrint").on('click', function () {
        $('#shoppingCart').hide();//购物车界面
        $('#sureOrder').hide();//结算页面
        $('.browser').show();//照片信息
    });
    //收藏按钮
    $("#btnFavNew").on('click', function () {
        $('.browser').show();//照片信息
    });
});

function onResize() {
    viewport.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        viewport.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    $('.main').css('min-height', $(window).height() + 'px');

    if ($('.previewing').length > 0) {
        viewport.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        $('.thumb').css('top', (viewport.height - 145) + 'px');
    }

    buttonLocate();//修改轮换img右侧按钮的定位
    $("html,body").css('background-color', '#eeeeee');
}

//获取指定元素的横坐标
function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}
//照片点击事件
function selectPhoto() {
    currentPhoto = this;
    if ($('.preview').is(':visible')) {
        setPreNextButtonStatus();
        previewPhoto(this);
        setPhoto();
    } else {
        $(this).toggleClass('selected');
        if ($('.thumb.selected').length > 0) {
        } else {
            $('.browser').removeClass('show-product');
        }
        $('.selected-photos').text($('.selected').length);
    }
    $('.photo-on-prod').css('background-image', 'url(' + $(this).find('.photo-img').attr('src') + ')');

    //打印按钮背后数字的个数更新
    $("#btnPrint .top-banner_Num span").text($('.thumb.selected').length);
    // 改变审核状态
    var selectLength = $(".selected").length;
    //判断是否为提取
    if ($('#photoList').hasClass('init')) {
        if (selectLength > 0) {
            $('.deal').removeClass('btn_disabled').removeAttr('disabled');
        }
        else {
            $('.deal').addClass('btn_disabled').attr('disabled', true);
        }
    }
}
function setPhoto() {
    if ($('#airditorCanvas').css("display") != "none") {
        editPhotoFun();
        var photos = $('#photo').airditor(options);
        $('#airditor #airditorTools #btnReset').click();
        document.getElementById('airditorDiv').style.display = "block";
        $('.thumb').show();
        $('.thumb.previewing').hide();
    }
}
//照片的鼠标悬停及移除事件(当前div的id，显示or隐藏)
function showSuspensionBox(id, operation) {
    //双击照片时隐藏悬浮框
    if ($(".photos.preview-mode").length < 1) {
        var isShow = $("#" + id).hasClass('faved');
        if (operation) {
            $("#" + id + " .photo .suspensionBox").show();
            //如果已经收藏。悬浮框显示的时候隐藏大爱心标识
            if (isShow) {
                $("#" + id + " .photobar .fa-heart").css('visibility', 'hidden');
            }
        }
        else {
            $("#" + id + " .photo .suspensionBox").hide();
            if (isShow) {
                $("#" + id + " .photobar .fa-heart").css('visibility', 'visible');
            }
        }
    }
}
//双击照片列表
var photoIdDbclick = "";
function showPreview(e, photoId) {
    $('.thumb .photo img.fillW').css('max-height', '100%');
    $('#next, .navigatdion, .imageInfo,#yuyan, .index').hide();
    $('.query').hide();
    $('.catalog').hide();
    $("#effectNav").show();
    //双击照片时隐藏悬浮框
    $(".photo .suspensionBox").hide();
    if ($(this).next().length) {
        $("#btnPreviewNext").show();
    } else {
        $("#btnPreviewNext").hide();
    }
    if ($(this).prev().length) {
        $("#btnPreviewPrevious").show();
    } else {
        $("#btnPreviewPrevious").hide();
    }
    if (photoId) {
        previewPhoto(photoId);
        setPreviewImageSrc(photoId);
    } else {
        previewPhoto(this);
        setPreviewImageSrc(this);
    }
    $('.photos').addClass('preview-mode');
    $('.preview').show();
    viewport.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    viewport.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('height:  ' + viewport.height);
    $('.thumb').css('top', (viewport.height - 145) + 'px');
    buttonLocate();
    setEditPhoto();
}


function onSave(parent) {
    var now = new Date();
    var jpeg = parent.canvas.toDataURL('image/jpeg');
    var file = (parent.options.newFilename) ? parent.options.newFilename : this.photo.src.substring(this.photo.src.lastIndexOf("/") + 1, this.photo.src.lastIndexOf(".")) + '.' + now.getHours() + now.getMinutes() + now.getSeconds() + '.jpg';
    var ajaxSetting = {
        type: 'POST',
        url: parent.options.apiUrl,
        data: {
            'base64': jpeg,
            'original_id': parent.element.data('id'),
            'filename': file,
            'x': parent.layers[0].offsetX / parent.canvas.width,
            'y': parent.layers[0].offsetY / parent.canvas.height,
            'scale': parent.layers[0].scale,
            'brightness': parent.layers[0].brightness,
            'saturation': parent.layers[0].saturation,
            'contrast': parent.layers[0].contrast,
            'vibrance': parent.layers[0].vibrance,
            'hue': parent.layers[0].hue
        },
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    console.dir(ajaxSetting);
    $.ajax(ajaxSetting)
        .done(function (data) {
            console.dir(data);
            parent.options.onSave(data, parent, parent.element);
        })
        .fail(function (data) {
            console.dir(data);
            alert('Sorry, an error occured while saving the photo.');
        })
}


function initPhotoPosition() {
    var previewLeft = $('.previewing').offset().left;
    $('#mainCanvas').css('position', 'absolute');
    $('#mainCanvas').css('left', previewLeft + 'px');
}
function setEditPhoto() {
    if ($('.thumb.previewing')) {
        var photoId2 = $('.thumb.previewing').eq(0).prop("id");
        if (photoId2) {
            //alert(photoId2)
            if ($('#airditorDiv')) {
                $('#airditorDiv').show();
                $('#airditorTools').show();
                $('#airditorCanvas').hide();
            }
            if (photoIdDbclick != photoId2) {
                photoIdDbclick = photoId2;
                airditorPhotoFun();
                $('#airditorTools').show();
                $('#airditorCanvas').hide();
            }
        }
    }
}
function setPreviewImageSrc(photo) {
    try {
        $(photo)[0].children[0].children[0].src = $(photo)[0].children[0].children[0].src.replace("thumbnail/512", "preview");
    } catch (e) {
    }
}
function previewShowNext(e) {
    if ($(currentPhoto).next().length) {
        previewPhoto($(currentPhoto).next()[0]);
        setPreviewImageSrc(currentPhoto);
        $("#btnPreviewNext").show();
        setPhoto();
    } else {
        $("#btnPreviewNext").hide();
    }
    if ($(currentPhoto).prev().length) {
        $("#btnPreviewPrevious").show();
    } else {
        $("#btnPreviewPrevious").hide();
    }
    e.stopPropagation();
}
function setPreNextButtonStatus() {
    if ($(currentPhoto).next().length) {
        $("#btnPreviewNext").show();
    } else {
        $("#btnPreviewNext").hide();
    }
    if ($(currentPhoto).prev().length) {
        $("#btnPreviewPrevious").show();
    } else {
        $("#btnPreviewPrevious").hide();
    }
}
function previewShowPrevious(e) {
    if ($(currentPhoto).prev().length) {
        previewPhoto($(currentPhoto).prev()[0]);
        setPreviewImageSrc(currentPhoto);
        $("#btnPreviewPrevious").show();
        setPhoto();
    } else {
        $("#btnPreviewPrevious").hide();
    }
    if ($(currentPhoto).next().length) {
        $("#btnPreviewNext").show();
    } else {
        $("#btnPreviewNext").hide();
    }
    e.stopPropagation();
}
function previewThis(e) {
    previewPhoto(this);
}
function previewPhoto(photo) {
    currentPhoto = photo;
    setPreviewImageSrc(currentPhoto);
    $('.previewing').removeClass('previewing');
    $(currentPhoto).addClass('previewing');
}
function exitPreview(e) {
    $('.thumb .photo img.fillW').css('max-height', '280px');
    $('#next,.imageInfo, #yuyan, .index').show();
    var src = $('.thumb.previewing')[0].children[0].children[0].src + '?' + new Date().getTime();
    $('.thumb.previewing')[0].children[0].children[0].src = src;
    $('.previewing').removeClass('previewing');
    $('.photos').removeClass('preview-mode');
    $('.preview').hide();
    $('.view-bar').show();
    $('#effectNav').hide();
    //$('.navigation').show();
    $('.thumb').css('top', '0px');
    $(".navigation").show();
    $(".query").show();
    $('#airditorDiv').hide();
    ShowbtnClass2(null, 0);
}
function deleteKeyWord(e) {
    alert(e.parentNode.outerHTML);
    e.parentNode.outerHTML = "";
}

/*   h5 编辑器*/
function ShowbtnClass(a, index) {
    //设置按钮样式
    $(a).parent().children().removeClass("effectNav_top_btn")
    $(a).addClass("effectNav_top_btn");


    //alert(index);
    //设置该按钮下显示的div
    if (index == 1) {
        $(".effectNav_top_1_btn").show();
    }
    else if (index == 2) {
        $("#airditorCliparts").show();
        $("#airditorFrame").hide();
        $("#airditorRevisedFigure").hide();
        $("#airditorBackground").hide();
        $(".effectNav_top_1_btn").hide();
    }
    else if (index == 3) {
        $("#airditorRevisedFigure").show();
        $("#airditorFrame").hide();
        $("#airditorCliparts").hide();
        $("#airditorBackground").hide();
        $(".effectNav_top_1_btn").hide();
    }
    else if (index == 4) {
        $("#airditorFrame").show();
        $("#airditorCliparts").hide();
        $("#airditorRevisedFigure").hide();
        $("#airditorBackground").hide();
        $(".effectNav_top_1_btn").hide();
    }
    else if (index == 5) {
        $("#airditorBackground").show();
        $("#airditorFrame").hide();
        $("#airditorCliparts").hide();
        $("#airditorRevisedFigure").hide();
        $(".effectNav_top_1_btn").hide();
    }
    //隐藏修图子菜单
    ShowbtnClass2(null, 0);
}

//修图按钮点击事件
function ShowbtnClass2(a, index) {
    //图片曝光度调整
    if (index == 3) {
        //alert( $(".previewing .photo img").attr("src"));
        $("#airditorText").hide();
        if ($("#airditorBrightness").css("display") == "none") {
            $("#airditorBrightness").show();
        }
        else {
            $("#airditorBrightness").hide();
        }
    }
    //图片文字调整
    else if (index == 4) {
        $("#airditorBrightness").hide();
        if ($("#airditorText").css("display") == "none") {
            $("#airditorText").show();
        }
        else {
            $("#airditorText").hide();
        }
    }
    else {
        $("#airditorText").hide();
        $("#airditorBrightness").hide();
    }
}

//主页图片是否缩进
function pictureMargin() {
    //判断右侧导航栏是否有div显示
    var flog = 0;
    var flog_left = 0;
    if ($('.query').css("display") == "block") {
        flog = 300;
    }
    else if ($('.catalog').css("display") == "block") {
        flog = 300;
    }
    $('.browser').css('margin-right', flog + 'px');


    if (flog == 0) {
        flog_left = 0;
    }
    $('.browser').css('margin-left', flog_left + 'px');
}

//修改轮换img右侧按钮的定位
function buttonLocate() {
    var a = $('#photoList').width();//轮换img 的宽度
    var b = getLeft(document.getElementById('photoList'));//距离左边的距离
    $('#btnPreviewNext').css("left", a + b);
}

//编辑照片
function editPhotoFun() {
    $('#airditorCanvas').show();
    airditorPhotoFun();
}
function airditorPhotoFun() {
    if ($('.thumb.previewing')) {
        var photoId3 = $('.thumb.previewing').eq(0).prop("id");
        //alert(photoId3)
        airditorPhoto(photoId3);
    }
}
function imgError(img) {
    img.src = "../image/photoView/no-picture1.svg";
    img.onerror = null;
}
//照片加载中及加载失败事件
function checkPhotoOnLoad(img) {

    if (!$("#PhotoRotation .photos").hasClass("preview-mode")) {
        //获取当前存储的照片路径
        var id = "#" + img.name + "ImgSrc";

        var src = $(id).val();
        //分辨率为1920（大于1366）,且为大图模式时，使用原图
        if ($("#photoViewMain").width() > 1366) {
            //src = src.replace("thumbnail/512", "preview");
        }
        //设置图片路径
        img.src = src;
        img.onload = function () {
            imgOnloadCheckPhotoBar(img.name);
        }
    }
}


function imgOnloadPhotoBar(id) {
    if (!$("#PhotoRotation .photos").hasClass("preview-mode")) {
        var path = "#PhotoRotation .photos" + " #" + id;
        $(path + " .photo img.fillW").css({'border-color': '#fff'});

        //图片加载成功之后的页码及收藏标示的位置

        var divHeight = $(path).eq(0).height();
        var divWidth = $(path).eq(0).width();
        var obj = JSON.parse($(path + " #" + id + "Hidden2").eq(0).val()).x128;
        var imgHeight = obj.height;
        var imgWidth = obj.width;

        var sourceWidth;
        var sourceHeight;

        if (imgWidth > imgHeight) {
            sourceHeight = (divWidth / imgWidth * imgHeight).toFixed(0);
            sourceWidth = divWidth.toFixed(0);
        }
        else {
            sourceWidth = (divHeight / imgHeight * imgWidth).toFixed(0);
            sourceHeight = divHeight.toFixed(0);
        }


        $(path + " .photo img.fillW").css({
            'width': sourceWidth + 'px',
            'height': sourceHeight + 'px',
            "opacity": "1"
        });
        $(path + " .photobar").css({'width': sourceWidth + 'px', 'height': sourceHeight + 'px', 'opacity': '1'});

    }

    $(path + " .photo img.fillW").onload = null;
}
