 $(function () { 
    // 头部信息
    var hdTimer = null;

    $('#head-info div[class*=onOff]').each(function(){

        var This=this;

        $(This).parent().on({

            mouseover:function () { 

                clearTimeout(hdTimer)
                layerShow(This);
               
            },

            mouseout:function () { 

                hdTimer = setTimeout(function(){
                     layerhide(This);
                },100)

            }

        })
        $(This).on({

            mouseover:function () { 

                clearTimeout(hdTimer)
                layerShow(This);
               
            },

            mouseout:function () { 
              
                layerhide(This);
             
            }
        })
    })

    function layerShow(obj){
        $(obj).show().parent().siblings().find('div[class*=onOff]').hide();
        $(obj).parent().addClass('msover').siblings().removeClass('msover');
        
    }

    function layerhide(obj){
        $(obj).hide();
        $(obj).parent().removeClass('msover');
        
    }
    // 头部信息结束


    // 搜索区域
    
    $('.search-tab li').each(function () { 

        $(this).click(function(){

            $(this).addClass('active').siblings().removeClass('active');

        })

     })

    //$().on('input propertychange',function(){})为H5事件 能够实时监控input变化 
   $(".search-bar input").on('input propertychange',function( ){

       if($(this).val()){

            $(".search-bar i").hide();
            $(".search-bar strong").hide();

       }else{

            $(".search-bar i").show();
            $(".search-bar strong").show(); 

       }
   });

//    左侧导航菜单弹层控制
   var menuTimer = null;
   $('.side-menu li').each(function(){
        $(this).on ({
        mouseover:function(){

            clearTimeout(menuTimer);

            var div1 = $('.side-menu-layer .service-links-con:nth-child(1) h5').find('a:nth-child(1)');

            var div2 = $('.side-menu-layer .service-links-con:nth-child(2) h5').find('a:nth-child(1)');

            var div3 = $('.side-menu-layer .service-links-con:nth-child(3)  h5').find('a:nth-child(1)');

            var a1 = $(this).find('a:nth-child(1)').html();

            var a2= $(this).find('a:nth-child(2)').html();

            var a3 = $(this).find('a:nth-child(3)').html();

                $('.side-menu-layer').show();
                $(div1).html(a1);
                $(div2).html(a2);
                $(div3).html(a3)
            },
        mouseout:function(){

                menuTimer = setTimeout(() => {
                     $('.side-menu-layer').hide();
                }, 100);

            }
        })

        $('.side-menu-layer').on({

            mouseover:function () { 

                clearTimeout(menuTimer);
                $(this).show();

             },
             mouseout:function () { 

                 $(this).hide();

              }
        })
   })
//上轮播
        function boxTop(){

             // 创建图片列表
            createTop( );
            //  克隆及创建显示列表
            cloneLi(topUrl,'.imgsLi1','.imgbox-top-circular')
            // 自动播放
            topTimer = setInterval(topNext,3000)
            //鼠标移入移出
            mshover('.imgbox-top',topTimer,topNext)
            //按钮控制
            clickNext('.imgbox-top',topNext)
            clickPrev('.imgbox-top',topPrev)
            //显示列表点击
            clickLi('.imgbox-top-circular li','.imgsLi1','topactive')

        }
       boxTop();

//下轮播
    function boxBtm() { 

         // 创建图片列表
        createBtm( );
        //  克隆及创建显示列表
        cloneLi(btmUrl,'.imgsLi2','.imgbox-btm-line')
        // 自动播放
        btmTimer = setInterval(btmNext,3000)
        //鼠标移入移出
        mshover('.imgbox-btm',btmTimer,btmNext)
        //按钮控制
        clickNext('.imgbox-btm',btmNext)
        clickPrev('.imgbox-btm',btmPrev)
        //显示列表点击
        clickLi('.imgbox-btm-line li','.imgsLi2','btmactive')
    }
        boxBtm();


//克隆及创建显示列表
   function cloneLi(dt,ul1,ul2) { 

        var cloneli = $(ul1).find('li:nth-child(1)').clone();

        $(ul1).append(cloneli);

        var creLi= dt.map(()=>{
            return ` <li></li>`;
        })

        $(ul2).append( creLi ); 
         
      }

//鼠标移入移出控制
    function mshover(ul,t,fn) { 

        $(ul).on({

            mouseover:function () {

                clearInterval(t);

                $(ul).find('button').show();

            },

            mouseout:function () {

                t = setInterval(fn,3000)

                $(ul).find('button').hide();

            }

            })
    }
// 按钮控制
    function clickNext(obj,fn){

        $(obj).find('button[class*=next]').click(function(){

            fn();

        })
    }

    function clickPrev(obj,fn){
        $(obj).find('button[class*=prev]').click(function(){

            fn();

        })
    }

//显示列表点击
function clickLi(li,ul,cla) { 

    $(li).click(function () {

        var index = $(this).index();

        $(ul).animate({left:-index*520+'px'},200)

        $(this).addClass(cla).siblings().removeClass(cla);

        if($(ul).hasClass('imgsLi2')){

            $('.imgbox-btm-hd i').html('<strong>'+(index+1)+'</strong>/'+$('.imgbox-btm-line li').length)

        }
       
    })
    
 }


//    上轮播区
   var topTimer = null;  
   var topNum = 0;
   
     //创建上列表
    function createTop( ){
        
        var imgLi1 = topUrl.map(item=>{

            return  ` <li><a href="#"><img src="${item}"></a></li>`;
        })

        $('.imgsLi1 ').append( imgLi1 );

     }
     

    function topNext() { 

           topNum++;
        
            if(topNum == $('.imgsLi1 li').length ){

                topNum = 1;

                $('.imgsLi1 ').animate({left:0},0)
            }

            $('.imgsLi1 ').animate({left:-topNum*520+'px'},500)
            
    
            if(topNum == $('.imgsLi1 li').length-1 ){ 

                $('.imgbox-top-circular li').eq(0).addClass('topactive').siblings().removeClass('topactive');

            }else{

                $('.imgbox-top-circular li').eq(topNum).addClass('topactive').siblings().removeClass('topactive');

            };

 
    }

    function topPrev() { 

            topNum--;

            if(topNum == -1 ){

                topNum = $('.imgsLi1 li').length-2;
                 $('.imgsLi1 ').animate({left:-($('.imgsLi1 li').length-1)*520+'px'},0)
            }
             $('.imgsLi1 ').animate({left:-topNum*520+'px'},500)

             $('.imgbox-top-circular li').eq(topNum).addClass('topactive').siblings().removeClass('topactive');

    }


//    下轮播区
   var btmTimer = null;  
   var btmNum = 0;
  
     //创建下列表
    function createBtm( ){
        
        var imgLi2 = btmUrl.map(item=>{

            return  ` <li><a href="#"><img src="${item.url1}"></a><a href="#"><img src="${item.url2}"></a></li>`;
            
        })

        $('.imgsLi2 ').append( imgLi2 );

    }
     
    function btmNext() { 

           btmNum++;
        
            if(btmNum == $('.imgsLi2 li').length ){

                btmNum = 1;

                $('.imgsLi2 ').animate({left:0},0)
            }

            $('.imgsLi2 ').animate({left:-btmNum*514+'px'},500)
           
            
    
            if(btmNum == $('.imgsLi2 li').length-1 ){ 

                $('.imgbox-btm-line li').eq(0).addClass('btmactive').siblings().removeClass('btmactive');

                $('.imgbox-btm-hd i').html('<strong>'+1+'</strong>/'+$('.imgbox-btm-line li').length)
            }else{

                $('.imgbox-btm-line li').eq(btmNum).addClass('btmactive').siblings().removeClass('btmactive');

                 $('.imgbox-btm-hd i').html('<strong>'+(btmNum+1)+'</strong>/'+$('.imgbox-btm-line li').length)

            };

 
    }

    function btmPrev() { 

            btmNum--;

            if(btmNum == -1 ){

                btmNum = $('.imgsLi2 li').length-2;

                 $('.imgsLi2 ').animate({left:-($('.imgsLi2 li').length-1)*514+'px'},0)

                  $('.imgbox-btm-hd i').html('<strong>'+$('.imgbox-btm-line li').length+'</strong>/'+$('.imgbox-btm-line li').length)


            }
             $('.imgsLi2 ').animate({left:-btmNum*520+'px'},500)

             $('.imgbox-btm-line li').eq(btmNum).addClass('btmactive').siblings().removeClass('btmactive');

             $('.imgbox-btm-hd i').html('<strong>'+(btmNum+1)+'</strong>/'+$('.imgbox-btm-line li').length)
    }

   //淘宝头条
   var newsTimer = null;
   var newsNum = 0;
   var newsLi = tbNews.map(item=>{

        return `<li><a href="#"><img class="fl" src="${item.url}"><h4>${item.title}</h4></a><p>${item.con}</p></li>`;
   });

   $('.tb-news-con ul').append( newsLi );

    var cloneli = $('.tb-news-con ul li:nth-child(1)').clone();

    $('.tb-news-con ul').append(cloneli);

function newsChange() { 

    newsTimer = setInterval(function(){

        $('.tb-news-con ul').animate({top:- newsNum *74 +'px'},500)

        newsNum++;

        if(newsNum == $('.tb-news-con ul li').length){

            newsNum = 1;

            $('.tb-news-con ul').animate({top:0},0)
        }

    },5000)
    
 }
newsChange();


$('.tb-news-con ').on({

    mouseover:function(){

        clearInterval(newsTimer)
    },

    mouseout:function(){

        newsChange();
    }
})


//关注栏
$('.notice-hd  li').mouseover(function () { 

        var index = $(this).index();
        $(this).addClass('notiactive').siblings().removeClass('notiactive');

        $($('.notice-ft ul')[index ]).show().siblings().hide();

})


$('.apps-list li').on({

    mouseover:function () { 
        
        var layerT = $(this).position().top-75;
        var layerL = $(this).position().left-( $($('.apps-Layer')).width()/2-10);

        var i = $(this).index();

        var con = $(this).find('img').attr('alt')


        $('.apps-Layer').show().css({'top':layerT+'px','left':layerL+'px'})

        $('.apps-Layer img').attr('src',appsImg[i] );

        $('.apps-Layer p').html('扫一扫'+con)
     },
     mouseout:function () { 

         $('.apps-Layer').hide();

      }
})

//快捷功能
$('.shortcut-hd-box:nth-child(-n+3)').mouseover(function () { 
    
    var i =$(this).index();

        $(this).addClass('shtactive').siblings().removeClass('shtactive');


        $('.shortcut-layer').hide().eq(i).show()
     })

$('.layer-tab a').mouseover(function () { 

        var i = $(this).index();
       
        $(this).addClass('choose').siblings().removeClass('choose');
        
       $('.container').animate({left:-i*274+'px'},300)
       
     })


$('.choose-close ').click(function () { 

      $('.shortcut-hd-box').removeClass('shtactive');
        
        $('.shortcut-layer').hide();
 })


//淘抢购
var tStr = '';
 
var iNew = new Date(2019, 11, 30, 23 ,59,59);

setInterval(reTime,1000);
   
    function reTime() { 
    
    var iNow = new Date();

    var time = (iNew-iNow)/1000;

    // tStr = '<span>'+ towNum( Math.floor(time%86400/3600))+'</span>:'+ '<span>'+  towNum( Math.floor(time%86400%3600/60))+'</span>:'+'<span>'+   towNum(Math.floor(time%60))+'</span>';
    tStr = `<span>${towNum( Math.floor(time%86400/3600))}</span> : <span>${towNum( Math.floor(time%86400%3600/60))}</span> :<span>${towNum(Math.floor(time%60))}</span> `;

    $('.t-limit .countdown').html(tStr)
    }
    reTime();

    function towNum(n) { 
      return  n >= 10 ? ''+n : '0'+n;
     }
    
    // 第二部分
     var goods = '';
    var shopping = '';
     for(var i = 0 ; i < 6; i++){

        goods+= ' <div><img src="images/yhh.jpg" ><h4>Max破产都要买的口红</h4><p class="c9">《破产姐妹》Max最爱</p><p class="iconfont p-col">&#xe61b;5958人说好</p></div>';

        shopping+= ' <div><img src="images/agj.jpg" ><h4 class=" introduce ">学院风女生一定要穿的鞋子就是它</h4><p class="c9 user-intd"> 巧****搭</p></div>';
     }
     $('.goods-con').append( goods);
     $('.shopping-con').append( shopping);

    // 第三部分
    var stores = '';
    var lives = '';
     for(var i = 0 ; i < 4; i++){

        stores+= '<div><h4>今日推荐<em>暂无店铺推荐</em></h4><img src="images/tqg-p.gif"></div>';

        lives+= '<div><h4>玉见奇迹<em>635观看</em></h4><img src="images/tbzb.gif"></div>';
     }
     $('.store-con').append( stores);
     $('.live-con').append( lives);


    // 第六部分
     var affs = '';
     for(var i = 0 ; i < 5; i++){

        affs+= '<div class="con-item "><h4><a href="#">天天特卖</a></h4><img class="fl" src="images/zy.jpg" alt=""><p class="title-p">优惠好货</p><p class="c9 ">特卖专区</p><a class="bor-a" href="#">全场包邮</a></div>';
     }
     $('.afford-con').append( affs);

     
    //  第七部分
     var salesT = '';
     
     for(var i = 0 ; i < 10; i++){

        salesT+= '<div class="con-item"><img src="images/six.jpg" ><h4>诺贝妮娜 红色小皮衣女短款修身春秋新款海</h4><span class="elt-sales c9">评价 112    收藏 13530</span><p><strong class="c4">￥</strong><em class="c4 ">1379</em><i>¥2159</i><span class="m-sales c9">月销1245笔</span> </p></div>';
     }
     $('.selling-con').append( salesT );

    //  第八部分
    var likes = '';
     for(var i = 0 ; i < 100; i++){

        likes+= '<div class="con-item"><img src="images/fs-r.jpg" ><h4>诺贝妮娜 红色小皮衣女短款修身春秋新款海</h4><p><strong class="c4">￥</strong><em class="c4 ">1379</em><span class="m-sales c9">销量12343</span> </p></div>';
     }
     $('.like-con').append( likes );



    //  右侧导航

// function getScrollTop(){  
// 获取滚动条距离（兼容） 
//     var scrollTop=0;    
//     if(document.documentElement&&document.documentElement.scrollTop){    
//         scrollTop=document.documentElement.scrollTop;    
//     }else if(document.body){    
//         scrollTop=document.body.scrollTop;    
//     }    
//     return scrollTop;    
// } 



// 滚动定位

$(document).scroll(function(e) {

  var scrollTop = $(document).scrollTop();

   var len =$('#side-tool a').length-4 ;
    // 固定头部控制
    scrollTop>180? $('.fixed-hd ').show(): $('.fixed-hd ').hide();
    
   if(scrollTop< $('.sect').eq(0).offset().top-500){

        $('#side-tool').css({'position':'absolute', 'top': '500px'});

   }else{

        $('#side-tool').css({'position':'fixed', 'top': '75px'});

        for (; len > -1; len--) {

        var that = $('.sect').eq(len);

        if (scrollTop >= that.offset().top-100) {

            $('#side-tool a').removeClass('active').eq(len).addClass('active');

        break;

        }

      }
   }

  

});




//  $(document).scroll(function(event){

//      var sTop = $(document).scrollTop();

//       if( sTop >$($('#side-tool a').attr('href')).offset().top){

//           $('#side-tool a').addClass('active').siblings().removeClass('active');
//       }
//     });

$('#side-tool a').on('click', function(e) {

        e.preventDefault();

        $(this).addClass('active').siblings().removeClass('active');

        if($(this).attr('href')!=='javascript:;'){ 
            
            $('html, body').animate({

                scrollTop: $($(this).attr('href')).offset().top

            }, 400);


        }

})

$('#back').click(function(e){
    $('html, body').animate({

    scrollTop: '0'

  }, 400);
})
   
















})
