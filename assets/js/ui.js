$(document).ready(function () {
    
    $('[data-type="addClass"] li .sortButton').on('click', function(){
        $(this).addClass('active').parent().siblings('li').find('.active').removeClass('active');
    });

    $('[data-type="menuOpen"]').on('click', function(){
        $(this).toggleClass('open');
        $(this).next('.hiddenMenu').toggleClass('actived').parent().siblings('li').find('.hiddenMenu').removeClass('actived');
		if($(this).hasClass('open')){
            $(this).attr('title','닫기');
        } else {
            $(this).attr('title','열기');
        }
    });

    $('.gnb').find('a:last').on('blur',function(){
        console.log('out');
        $(this).parent().removeClass('on');
        $('.gnb > ul > li .navListArea').slideUp(300);
    });
 
    $(window).resize(pcGnb);
    $(window).resize(mobileGnb);
    $(window).resize(snsTab);
    
    pcGnb();
    mobileGnb();
    tabArea();
    snsTab();
    tabs();

}) // ee


function pcGnb(){
    var winWidth = $(window).width();
	if(winWidth > 1080) {
        $('.navListBox > li > a').on('mouseover focus',function() {
            if (!$(this).parent().hasClass('on')) {
                // $(this).parent().removeClass('on');
                // $(this).next('.navListArea').slideUp(300);
                $('.gnb > ul > li > a').each(function () {
                    $(this).parent().removeClass('on');
                    $(this).next('.navListArea').slideUp(300);
                    // $(this).next('.navListArea').attr('tabindex','-1');
                });
                $(this).parents('.header__gnb').addClass('open');
                // $(this).parents('.header__gnb').attr('tabindex','0');
                // $(this).parents('ul.navListBox').attr('tabindex','0');
                $(this).parent().addClass('on');
                $(this).next('.navListArea').slideDown(400);
                // $(this).next('.navListArea').attr('tabindex','0');
            } 
        });	
        $('.navListArea').on('mouseleave', function(){
            $(this).parent('li.on').removeClass('on');
            $(this).slideUp(300);
        });
        /*
        $('.navListArea').on('mouseleave', function(){
            $(this).attr('tabindex','-1');
            $(this).parent('li.on').removeClass('on');
            $(this).slideUp(300);
            $(this).next('.navListArea').attr('tabindex','-1');
        });
        */
        $('.header__gnb').on('mouseleave',function(){
            $(this).removeClass('open');
            $(this).find('li.on').removeClass('on');
            $(this).find('.navListArea').slideUp(300);
        });
        return false;
    } else {
        $('.navListBox > li > a').off('mouseover focus click');
        $('.navListArea').off('mouseleave');
        $(this).closest('li').addClass('open');	
    } 
}


function mobileGnb(){
    var windowWidth = $(window).width();
	if(windowWidth < 1080) {
        var menuBtn = $('.btn__menu');
        var gnb = $('.header__gnb');
        var wrap = $('html, body');
        var menuClose = $('.mobileMene__close');
        var target = $('.navListBox > li > a');
        var subTarget = $('.gnbList > li > a');
        var search = $('.btn__searchMenu');
        var topMenu = $('.header__memu');

        menuBtn.on('click', function(){
            gnb.addClass('menuOpen');
            wrap.css('overflow-y','hidden');
            wrap.animate({scrollTop: '0'});

            $(window).resize( function() {
                wrap.removeAttr('style');
            });
        });

        menuClose.on('click', function(){
            gnb.removeClass('menuOpen');
            wrap.removeAttr('style');
            gnb.find('.navListBox > li.open .navListArea').hide();
            gnb.find('.navListBox > li').removeClass('open');
        });
        search.on('click', function(){
            $(this).toggleClass('open');
            if(search.hasClass('open')){
                topMenu.show();
                $('#T_search').focus();
                topMenu.addClass('menuOpen');
            } else{
                topMenu.hide();
            }
        });
        
        target.click(function() {
            $(this).parent('li').addClass('open').siblings().removeClass('open');
            $(this).parent('li').find('.navListArea').show();
            $(this).parent('li').removeClass('on');
            $(this).parent('li').siblings().find('.navListArea .container .gnbList li > ol').slideUp();

            if($(this).parent('li').hasClass('open')){
                $(this).parent('li').siblings('li').find('.navListArea').hide();
            } 
        });

        subTarget.click(function() {    
            $(this).parent('li').toggleClass('active').siblings().removeClass('active');
            $(this).next('ol').slideDown();
            
            if($(this).parent('li').hasClass('active')){
                $('.gnbList > li.active').siblings('li').find('ol').slideUp();
            } 
            return false;
        });
    } 
}
function tabArea(){
    $('[data-tab="tab"] ul li a').click(function(){
        var idx = $(this).parent().index();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        if ($(this).closest('[data-tab="tab__list"]').siblings('[data-tab="tab__contents"]').length > 0) {
            $(this).closest('[data-tab="tab__list"]').siblings('[data-tab="tab__contents"]').eq(idx).addClass('tapOpen').siblings().removeClass('tapOpen');
            if($(this).parent().hasClass('active')){
                $(this).attr('title','선택됨').parent().siblings().find('.tabAnchor').attr('title','선택안됨')
            }
        }
    });
}

function snsTab(){
	var windowWidth = $(window).width();
	if(windowWidth < 1080) {
        var target = $('.snsList > ul > li > a');
/*        $('.btn__sns--twitter').attr({'href':'#a','target':'','title':''});
        $('.btn__sns--facebook').attr({'href':'#a','target':'','title':''});
        $('.btn__sns--utube').attr({'href':'#a','target':'','title':''});*/

		// console.log(windowWidth);
        $(target).click(function(){
            $(this).addClass('active').parent('li').siblings('li').find('.btn__sns').removeClass('active');
            $("#"+$(this).data('id')).addClass('open').siblings().removeClass('open');
        });
	} else{
        /*$('.btn__sns--twitter').attr({'href':'https://twitter.com/pipc_pr','target':'_blank','title':'새창'});
        $('.btn__sns--facebook').attr({'href':'https://www.facebook.com/pipc.go.kr','target':'_blank','title':'새창'});
        $('.btn__sns--utube').attr({'href':'https://www.youtube.com/pipcpr','target':'_blank','title':'새창'});*/
    }
}

// tab
function tabs(){
    var tab_anchor = $('[data-tab="tab"] [data-tab="tab__list"] li [ data-tab="tab__anchor"]');
    tab_anchor.click(function(){
        var idx = $(this).parent().index();

        $(this).parent('li').addClass('active').siblings().removeClass('active');
        if ($(this).closest('[data-tab="tab__list"]').siblings('[data-tab="tab__contents"]').length > 0) {
            $(this).closest('[data-tab="tab__list"]').siblings('[data-tab="tab__contents"]').eq(idx).addClass('active').siblings().removeClass('active');
        }
    });
}

//sns 공유 토글
$(function () {
	$(".btn_sns_sh").on("click", function() {
		$(this).next(".sns_share").fadeToggle();
	});
	$(".mask_box").on("click", function() {
		$(".sns_share").hide();
	});
});

//url 복사
function clip(){
    var url = '';
    var textarea = document.createElement("textarea");  
    
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    alert("URL이 복사되었습니다.")
}

