window.onresize = onResize;

//=========================================兼容性调整=========================================//
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
            (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                (s = ua.match(/applewebkit\/([\d.]+)/)) ? Sys.safari = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;


//谷歌浏览器下的兼容性调试
if (Sys.chrome) {
    $("#ulProduct .prod-add-qty i").css('margin-left', '-5px');
    $(".commodityNumber .addNum span").css({'margin-top': '-15px', 'margin-right': '-1px'});
    $(".commodityNumber .subtractNum span").css({'margin-top': '-22px', 'margin-right': '1px'});
    $(".shoppingCart_content .commodity .commodityNumber .num").css('margin-top', '-4px');
    $("#PhotoRotation .top-banner #searchMenu ul li").css({'top':'0px'});
    //购物车悬停框底部样式
//        $(".navigation .quickShopping .previewCart .aggregate button").css('padding', '10px 8px');
}
$(function () {
	

    movieTimeFun();
    onResize();

    if(iPadStatus==0) {
        $('#photoPassCodeHidden').focus();
    // }else {
        //iPad
        // $("*").css({
        //     '-moz-user-select': 'text !important', /*火狐*/
        //     '-webkit-user-select': 'text !important', /*webkit浏览器*/
        //     '-ms-user-select': 'text !important', /*IE10*/
        //     '-khtml-user-select': 'text !important', /*早期浏览器*/
        //     'user-select': 'text !important'
        // })
    }

    $('.total-photos').text($('.thumb').length);
    $('.actions').toggle();

    //照片的点击事件
    $('.browser').on('click', '.thumb', selectPhoto);
    $('.browser').on('dblclick', '.thumb', showPreview);
    $('.browser').on('gesturestart', '.thumb', showPreview);
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
    buttonLocate();//修改轮换img右侧按钮的定位
    SetPageNumHeight();//设置竖条页码高度
    $("html,body").css('background-color', '#000000');
}

//获取指定元素的横坐标
function getLeft(e) {
    if (e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += getLeft(e.offsetParent);
        return offset;
    }
}

//设置竖条页码高度
function SetPageNumHeight() {
    $("#pages").css("max-height", document.body.clientHeight - 300 + "px");
}


//照片点击事件
function selectPhoto() {
    $("#btnPrint .top-banner_Num span").text(selectLength);

    $(".top-banner .selectPhotoNum").text(selectLength);
    var showSelectPhoto = true;
    //未选中商品
    if (selectLength == 0) {
        showSelectPhoto = false;
    }

    // 改变审核状态
    if (selectLength > 0) {
        $('#audit').removeClass('btn_disabled');
    }
    // 改变审核状态
    var selectLength = $(".selected").length;

    //判断是否为提取
    if ($('#photoList').hasClass('init')) {
        if (selectLength > 0) {
            $('.deal').removeClass('btn_disabled').removeAttr('disabled');
        }
        else {
            $('#audit').addClass('btn_disabled');

            $('.deal').addClass('btn_disabled').attr('disabled', true);
        }
    }

}
//设置被放大的图片(对象id,点击状态(0:双击; 1:预览单击; 2:按钮),上一张|下一张)
function setPreviewImg(id, status, operation) {
    $(".preview").eq(0).prop("id",id+"preview");
    if($("#" + id).hasClass("faved")){
        $(".preview .photo").addClass("faved");
    }else{
        $(".preview .photo").removeClass("faved");
    }
    $(".preview .photo img").eq(0).prop("src", $("#" + id + "ImgSrc1024").val());
    $("#" + id).parent(".photos").children(".thumb").removeClass("previewing");
    $("#" + id).addClass("previewing");

    var previewModel = $("#PhotoRotation .photos.preview-mode");
    var objWidth = $("#" + id).eq(0).width() + 10; //获取对象的滚动宽度+
    var objLeft = $("#" + id).eq(0).prop("offsetLeft"); //距离窗体最左侧
    var scrollLeft = previewModel.eq(0).prop("scrollLeft");//父级元素的滚动距离
    var left = objLeft - previewModel.eq(0).prop("offsetLeft");//对象距离父级的左距离
    var length;//当前元素距离头尾边距的距离;

    if (status == '0') {//双击预览(ok)
        //定位到窗体中间
        scrollLeft = left + objWidth - (previewModel.width() / 2);
    } else if (status == '1') {//预览单击

    } else if (status == '2') {//按钮点击
        //始终保持选中的照片靠左或者居中
        if (operation == "btn_next") {//下一张
            //最后元素距离左边的多余且不足一块的长度
            length = scrollLeft - (left + objWidth) - previewModel.eq(0).prop("offsetLeft") + previewModel.width();
            if (length <= 0) scrollLeft -= length + 5;

        } else {//上一张
            //最前元素距离左边的多余且不足一块的长度
            length = scrollLeft - left - previewModel.eq(0).prop("offsetLeft");
            if (length >= 0) scrollLeft -= length + 5;
        }
    }
    $("#PhotoRotation .photos.preview-mode").eq(0).prop("scrollLeft", scrollLeft);
}

function previewOnload(){
    var width= $(".preview .photo img")[0]["offsetWidth"];
    var height= $(".preview .photo img")[0]["offsetHeight"];
    var height2= $(".preview .photo")[0]["offsetHeight"];
    $(".preview .photo .previewImg").eq(0).css({"width":width+'px','margin-top':(height2-height)/2+10+'px'});
}



//双击照片列表
var photosScrollTop; //双击照片前保存照片列表滚动条位置
var photoIdDbclick = "";
function showPreview(e) {
    if(iPadStatus==1) {
        if (!$("#PhotoRotation .photos").hasClass("preview-mode")) {
            $('#PhotoRotation .photos').addClass('preview-mode');
            // alert(this.id+'   showPreview');
            $("#"+this.id).dblclick();
            // setPreviewImg(this.id, '0');
        }
        showNavigation('shop');
    }else
        showNavigation('dblClick');

    //双击后.设置预览小图的显示优先级在底部logo之上
    $('.browser').css({'z-index':'3002',"top":"90px"});


    showMenu("selectPhotoMenu");

    //双击照片后导航栏样式变化
    $("#selectPhotoMenu .all").hide();
    $("#selectPhotoMenu .chosen").hide();
    $("#swapModel").hide();
    $('#next, .navigatdion, .imageInfo,#yuyan, .index').hide();
    $('.query').hide();
    $('.catalog').hide();
    $('.preview').show();

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

    buttonLocate();
}

//显示或者隐藏导航栏及购物车预览
function showNavigation(operation) {
    switch (operation) {
        case 'dblClick':
            $(".navigation").hide();
            break;
        case 'exit':
            $(".navigation").show();
            break;
        case 'shop':
            $(".navigation").hide();
            break;
        default:
            break;
    }
}


//根据操作显示菜单栏
function showMenu(menu) {
    $("#mainMenu").hide();//主菜单
    $("#selectPhotoMenu").hide();//选中照片后的菜单
    $("#searchMenu").hide();//查询界面的导航条
    $("#product").hide();//商品导航条
    $("#shopping").hide();//购物车导航条


    if(Sys.safari) {
        $("#PhotoRotation .top-banner #searchMenu ul li").css({'top': '0px'});
    }

    $("#" + menu).show();
    if (menu == 'selectPhotoMenu' && $("#PhotoRotation .photos").hasClass("preview-mode")) {
        $("#PhotoRotation .top-banner #selectPhotoMenu .addFavorte").hide();
        $("#PhotoRotation .top-banner #selectPhotoMenu .cancelFavorte").hide();
        $("#PhotoRotation .top-banner #selectPhotoMenu .deletePhoto").hide();
    }
    else {
        $("#PhotoRotation .top-banner #selectPhotoMenu .addFavorte").show();
        $("#PhotoRotation .top-banner #selectPhotoMenu .cancelFavorte").show();
        $("#PhotoRotation .top-banner #selectPhotoMenu .deletePhoto").show();
    }
    showMenuDetail(false);
}

//显示菜单下的按钮详情
function showMenuDetail(model) {
    if (model == 'return')
        return;
    if (model == undefined || !model)
        model = "a";
    var showStatus = $("#PhotoRotation ." + model).css('display');

    $("#PhotoRotation .locations").hide();
    $("#PhotoRotation .date").hide();
    $("#PhotoRotation .ShowSearch").hide();

    if (showStatus == "none")
        $("#PhotoRotation ." + model).show();
    else
        $("#PhotoRotation ." + model).hide();
}


function setPreviewImageSrc(photo) {
    try {
        if ($(photo)[0].children[0].children[0] && $(photo)[0].children[2].value) {

            $(photo)[0].children[0].children[0].src = $(photo)[0].children[2].value;
        }
    } catch (e) {
    }
}

//图片详情关闭事件
function exitPreview(e) {
    $('#next,.imageInfo, #yuyan, .index').show();
    var src = $('.thumb.previewing')[0].children[0].children[0].src + '?' + new Date().getTime();
    $('.thumb.previewing')[0].children[0].children[0].src = src;
    $('.previewing').removeClass('previewing');
    $('.photos').removeClass('preview-mode');
    $('.preview').hide();
    $('.view-bar').show();
    $('#effectNav').hide();
    $('.thumb').css('top', '0px');
    showNavigation('exit');

    $('#airditorDiv').hide();
    ShowbtnClass2(null, 0);

    //退出双击后.设置预览小图的显示优先级恢复
    $('.browser').css({'z-index':'3000',"top":"185px"});
    document.getElementsByClassName("browser")[0].scrollTop=window.localStorage.photosScrollTop;

}

function deleteKeyWord(e) {
    e.parentNode.outerHTML = "";
}

/*   h5 编辑器*/
function ShowbtnClass(a, index) {
    //设置按钮样式
    $(a).parent().children().removeClass("effectNav_top_btn");
    $(a).addClass("effectNav_top_btn");

    $("#airditorCliparts").hide();
    $("#airditorFrame").hide();
    $("#airditorRevisedFigure").hide();
    $("#airditorBackground").hide();
    $(".effectNav_top_1_btn").hide();

    //设置该按钮下显示的div
    switch (index){
        case 1:
            $(".effectNav_top_1_btn").show();
            break;
        case 2:
            $("#airditorCliparts").show();
            break;
        case 3:
            $("#airditorRevisedFigure").show();
            break;
        case 4:
            $("#airditorFrame").show();
            break;
        case 5:
            $("#airditorBackground").show();
            break;
        default:
            break;
    }
    //隐藏修图子菜单
    ShowbtnClass2(null, 0);
}

//修图按钮点击事件
function ShowbtnClass2(a, index) {
    //图片曝光度调整
    if (index == 3) {
        $("#airditorText").hide();
        $("#airditorBrightness").toggle();
    }
    //图片文字调整
    else if (index == 4) {
        $("#airditorBrightness").hide();
        $("#airditorText").toggle();

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
    $("#btnPreviewPrevious").show();
    $("#btnPreviewNext").show();

    //var a = $('#photoList').width();//轮换img 的宽度
    //var b = getLeft(document.getElementById('photoList'));//距离左边的距离
    //$('#btnPreviewNext').css("left", a + b);
}

////编辑照片
//function editPhotoFun() {
//    $('#airditorCanvas').show();
//    airditorPhotoFun();
//}

//function airditorPhotoFun() {
//    if ($('.thumb.previewing')) {
//        var photoId3 = $('.thumb.previewing').eq(0).prop("id");
//        airditorPhoto(photoId3);
//    }
//}


//canvas释放内存方法 (canvas对象，回发方法体)
function usingCanvas(ctx, ck) {
    ctx.save();
    ctx.beginPath();
    ck.call(this, ctx);
    ctx.stroke();
    ctx.restore();
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//代替默认alert方法。 alertShow方法
var Countdown = 0;
//替换原始alert方法  [提示图标（success,error,warning）,倒计时时间, 提示内容]）
function alertShow(iconClass, time, content) {
    var ultimateDiv = document.createElement("div");
    ultimateDiv.id = "ultimateDiv";
    ultimateDiv.innerHTML = "<div class='Popups'>" +
        "<div class='title " +
        iconClass +
        "'></div>" +
        "<div class='content'>" +
        "<div>" +
        content +
        "</div>" +
        "</div>" +
        "<div class='bottom'>" +
        "<button class='Countdown' onclick='Countdown=0;alertShowFun()'></button>" +
        "</div>" +
        "</div>";
    document.body.appendChild(ultimateDiv);
    if (time) {
        Countdown = time;
        alertShowFun();
    }
}


function alertShowFun() {
    if (Countdown > 0) {
        Countdown--;
        $("#ultimateDiv .bottom .Countdown").text("(" + Countdown + ")确定");
        setTimeout(alertShowFun, 1000);
    }
    else {
        //隐藏div
        var ultimate = document.getElementById("ultimateDiv");
        document.body.removeChild(ultimate);
    }
}

//照片的鼠标悬停及移除事件(当前div的id，显示or隐藏,是否为照片点击时调用)
function showSuspensionBox(id, operation,isClick) {
    /**
     * ipad 状态下,移除鼠标悬停状态,单击照片时执行悬停方法
     */
    if (iPadStatus && !isClick)  return;

    //双击照片时隐藏悬浮框
    if ($(".photos.preview-mode").length < 1) {
        var isShow = $("#" + id).hasClass('faved');
        if (operation) {
            $("#" + id + " .photobar .suspensionBox").show();
            //如果已经收藏。悬浮框显示的时候隐藏大爱心标识
            if (isShow) {
                $("#" + id + " .photobar .fa-heart").css('visibility', 'hidden');
                $("#" + id + " .photobar .suspensionBox .fa-heart").css('visibility', 'visible');
            }
        }
        else {
            $("#" + id + " .photobar .suspensionBox").hide();
            if (isShow) {
                $("#" + id + " .photobar .fa-heart").css('visibility', 'visible');
                $("#" + id + " .photobar .suspensionBox .fa-heart").css('visibility', 'hidden');
            }
        }
    }

}

var $write,
    shift = false,
    capslock = false;
//显示软键盘icon
function ShowKeyboardBtn(id, status) {
    $(".keyboard").hide();
    $write = $("#" + id);
    if (status) {
        $("#" + id).parent("div").children(".keyboard").eq(0).show();
    }
    else {
        $("#" + id).parent("div").children(".keyboard").eq(0).hide();
    }
}


//加载软键盘
function ShowKeyboard(id) {
    if ($("#keyboard").length <= 0) {
        $write = $(id);
        var keyboard = document.createElement("ul");
        keyboard.id = "keyboard";
        keyboard.innerHTML = "<li class='symbol'><span class='off'>`</span><span class='on'>~</span></li>" +
            "<li class='symbol'><span class='off'>1</span><span class='on'>!</span></li> " +
            "<li class='symbol'><span class='off'>2</span><span class='on'>@</span></li> " +
            "<li class='symbol'><span class='off'>3</span><span class='on'>#</span></li> " +
            "<li class='symbol'><span class='off'>4</span><span class='on'>$</span></li> " +
            "<li class='symbol'><span class='off'>5</span><span class='on'>%</span></li> " +
            "<li class='symbol'><span class='off'>6</span><span class='on'>^</span></li> " +
            "<li class='symbol'><span class='off'>7</span><span class='on'>&amp;</span></li> " +
            "<li class='symbol'><span class='off'>8</span><span class='on'>*</span></li> " +
            "<li class='symbol'><span class='off'>9</span><span class='on'>(</span></li> " +
            "<li class='symbol'><span class='off'>0</span><span class='on'>)</span></li> " +
            "<li class='symbol'><span class='off'>-</span><span class='on'>_</span></li> " +
            "<li class='symbol'><span class='off'>=</span><span class='on'>+</span></li> " +
            "<li class='delete lastitem'>delete</li> " +
            "<li class='tab'>tab</li> " +
            "<li class='letter'>q</li> " +
            "<li class='letter'>w</li> " +
            "<li class='letter'>e</li> " +
            "<li class='letter'>r</li> " +
            "<li class='letter'>t</li> " +
            "<li class='letter'>y</li> " +
            "<li class='letter'>u</li> " +
            "<li class='letter'>i</li> " +
            "<li class='letter'>o</li> " +
            "<li class='letter'>p</li> " +
            "<li class='symbol'><span class='off'>[</span><span class='on'>{</span></li> " +
            "<li class='symbol'><span class='off'>]</span><span class='on'>}</span></li> " +
            "<li class='symbol lastitem'><span class='off'>\\</span><span class='on'>|</span></li> " +
            "<li class='capslock'>caps lock</li> " +
            "<li class='letter'>a</li> " +
            "<li class='letter'>s</li> " +
            "<li class='letter'>d</li> " +
            "<li class='letter'>f</li> " +
            "<li class='letter'>g</li> " +
            "<li class='letter'>h</li> " +
            "<li class='letter'>j</li> " +
            "<li class='letter'>k</li> " +
            "<li class='letter'>l</li> " +
            "<li class='symbol'><span class='off'>;</span><span class='on'>:</span></li> " +
            "<li class='symbol'><span class='off'>'</span><span class='on'>&quot;</span></li> " +
            "<li class='return lastitem'>return</li> " +
            "<li class='left-shift'>shift</li> " +
            "<li class='letter'>z</li> " +
            "<li class='letter'>x</li> " +
            "<li class='letter'>c</li> " +
            "<li class='letter'>v</li> " +
            "<li class='letter'>b</li> " +
            "<li class='letter'>n</li> " +
            "<li class='letter'>m</li> " +
            "<li class='symbol'><span class='off'>,</span><span class='on'>&lt;</span></li> " +
            "<li class='symbol'><span class='off'>.</span><span class='on'>&gt;</span></li> " +
            "<li class='symbol'><span class='off'>/</span><span class='on'>?</span></li> " +
            "<li class='right-shift lastitem'>shift</li> " +
            "<li class='close'>close</li> " +
            "<li class='space'>&nbsp;</li> " +
            "<li class='close lastitem'>close</li>";
        document.body.appendChild(keyboard);
        $write.focus();

        $('#keyboard li').click(function (e) {
            $write.focus();

            var $this = $(this),
                character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

            // Shift keys
            if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
                $('.letter').toggleClass('uppercase');
                $('.symbol span').toggle();

                shift = (shift === true) ? false : true;
                capslock = false;
                return false;
            }

            // Caps lock
            if ($this.hasClass('capslock')) {
                $('.letter').toggleClass('uppercase');
                capslock = true;
                return false;
            }

            // Delete
            if ($this.hasClass('delete')) {
                var html = $write.val();

                $write.val(html.substr(0, html.length - 1));
                $write.change();
                return false;
            }

            //Close
            if ($this.hasClass('close')) {
                document.body.removeChild(keyboard);
                return false;
            }

            if ($this.hasClass('return')) {
                var e = jQuery.Event("keyup");//模拟一个键盘事件
                e.keyCode = 13;//keyCode=13是回车
                $write.trigger(e);
                //$write.change();

                return false;
            }

            // Special characters
            if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
            if ($this.hasClass('space')) character = ' ';
            if ($this.hasClass('tab')) character = "\t";


            // Uppercase letter
            if ($this.hasClass('uppercase')) character = character.toUpperCase();

            // Remove shift once a key is clicked.
            if (shift === true) {
                $('.symbol span').toggle();
                if (capslock === false) $('.letter').toggleClass('uppercase');
                shift = false;
            }

            // Add the character
            $write.val($write.val() + character);
            $write.change();
        });
    }
    else {
        document.body.removeChild(document.getElementById('keyboard'));
    }
}


//数组去重复数据(多维数组则第二个参数为数组中参考列名称)
function distinctArray(list, item) {
    if (item) {
        list.sort(function (x, y) {
            return x[item].localeCompare(y[item]);
        });
    }
    else
        list.sort();
    var re = [list[0]];
    for (var i = 1; i < list.length; i++) {
        if (item) {
            if (list[i][item] !== re[re.length - 1][item]) {
                re.push(list[i]);
            }
        }
        else {
            if (list[i] !== re[re.length - 1]) {
                re.push(list[i]);
            }
        }
    }
    return re;
}

//设置影视文件计时显示
var movieTime = new Date().getTime();
var myVideo = document.getElementsByTagName('video')[0];
var movieSetTimeStatue=false;
var movieSetTime;
var indexPhotoView= 0,indexLogin= 0,indexLogin2=0;

$("body").on('mousedown', function (e) {
    if(window.localStorage.config && JSON.parse(window.localStorage.config).videoStatus) {
        movieTime = new Date().getTime();
        clearTimeout(movieSetTime);
    }
});
$("body").on('mouseup', function (e) {
    movieTimeFun();
});
function movieTimeFun() {
    if (iPadStatus ==1 || (!window.localStorage.config) || (!JSON.parse(window.localStorage.config).videoStatus)){
        return false;
    }
    indexPhotoView=document.location.href.indexOf("photoView");
    indexLogin= document.location.href.substr(document.location.href.indexOf("#/")+2).trim().length;
    indexLogin2=document.location.href.indexOf("login");
    if(indexPhotoView>0 ||indexLogin==0|| indexLogin2>0) {
        if (myVideo && myVideo.paused) {
            //判断是否为内容页(存在扫描页 && 扫描页不显示)
            var contentPages = ($("#scanYourPhotoPass").length > 0 && $("#scanYourPhotoPass").css("display") == "none" ) ? true : false;
            if ((contentPages && (new Date().getTime() - movieTime) / 1000/60 >= 5) || //内容页上5分钟(内容页)
                ( !contentPages && (new Date().getTime() - movieTime) / 1000/60 >= 2)) {//非内容页上2分钟(登录页 & 扫描页)
                $("#movie").css({"display": "block"});
                myVideo.play();
                movieSetTimeStatue = true;
            }
            else {
                movieSetTimeStatue = false;
                movieSetTime = setTimeout(movieTimeFun, 1000*60);
            }
        }
    }
}
$("#movie").on('click', function () {
    pauseMovie();
});
function pauseMovie () {
    if (myVideo && !myVideo.paused) {
        myVideo.pause();
        $("#movie").css({"display": "none"});
        movieTime = new Date().getTime();
        movieTimeFun();
    }
}

var time;
var t=10;
function closeOrder() {
    t -= 1;
    document.getElementById('showtimes').innerHTML = t;
    if (t == 0) {
        if($("#PhotoRotation .top-banner #mainMenu .logo") && iPadStatus) 
            $("#PhotoRotation .top-banner #mainMenu .logo").click();
        else
            window.location.reload();
        return false;
    }else //每秒执行一次,showTime()
        time = setTimeout("closeOrder()", 1000);
}



//非空验证
function verifyNotNull(code) {
    if (!code || code == "" || code == null || code == "null" || code == undefined || code == "undefined")
        return false;
    else
        return true;
}

//文件下载
function downloadFile(fileName, content){
    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
    aLink.download = fileName;
    aLink.href = content;
    aLink.dispatchEvent(evt);
}

