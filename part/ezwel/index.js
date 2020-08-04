var $html = $('html');

var myFullpage = new fullpage('#fullpage', {
    scrollingSpeed: 200,
    onLeave: function(origin, destination, direction) {
        $html.attr('data-fullpage-index', destination.index);
    }
});

/* 탑바 */
function TopBar__init() {
    $('.top-bar > .menu-box-1 > ul').mouseenter(function() {
        var $this = $(this);
        var $parent = $this.parent();
        var $bgActive = $parent.find('> div.bg-box');

        $bgActive.addClass('active');
        $this.addClass('active');
    });
    $('.top-bar > .menu-box-1 > ul').mouseleave(function() {
        var $this = $(this);
        var $parent = $this.parent();
        var $bgActive = $parent.find('> div.bg-box');

        $bgActive.removeClass('active');
        $this.removeClass('active');
    });
    
    $html.attr('data-fullpage-index', 0);
}
$(function() {
    TopBar__init();
});

/* 슬라이더 */
/* 기능 */
function SliderK__show($slider, index) {
    var $currentSlide = $slider.find('.slides > div.active');
    var $postSlide = $slider.find('.slides > div').eq(index);


    $currentSlide.removeClass('active');
    $postSlide.addClass('active');

    $slider.find('.page-nav > div.active').removeClass('active');
    $slider.find('.page-nav > div').eq(index).addClass('active');
}

function SliderK__showPrev($slider) {
    SliderK__showPost($slider, -1);
}

function SliderK__showNext($slider) {
    SliderK__showPost($slider, 1);
}

function SliderK__showPost($slider, change) {
    var $currentSlide = $slider.find('.slides > div.active');
    var $postSlide = null;
    var $firstSlide = $slider.find('.slides > div:first-child');
    var $lastSlide = $slider.find('.slides > div:last-child');

    if ( change == 1 ) {
        $postSlide = $currentSlide.next();

        if ( $postSlide.length == 0 ) {
            $postSlide = $firstSlide;
        }
    }
    else if ( change == -1 ) {
        $postSlide = $currentSlide.prev();

        if ( $postSlide.length == 0 ) {
            $postSlide = $lastSlide;
        }
    }

    SliderK__show($slider, $postSlide.index());
}

/* 초기화 */
function SliderK__init() {
    $('.slider-k').each(function(index, node) {
        var $slider = $(node);

        if ( $slider.find('.slides > div.active').length == 0 ) {
            $slider.find('.slides > div').eq(0).addClass('active');
        }

        SliderK__initPageNav($slider);
        SliderK__initSideBtns($slider);
        SliderK__initAutoplay($slider);
    });
}

// 페이지 내비를 자동으로 만들어줍니다.
function SliderK__initPageNav($slider) {
    var currentIndex = $slider.find('.slides > div.active').index();
    var slidesCount = $slider.find('.slides > div').length;

    var html = '';

    for ( var i = 0; i < slidesCount; i++ ) {
        if ( i == currentIndex ) {
            html += '<div class="active"></div>';
        }
        else {
            html += '<div></div>';
        }
    }

    html = '<div class="page-nav">' + html + '</div>';
    $slider.append(html);

    $slider.find('.page-nav > div').click(function() {
        SliderK__show($slider, $(this).index());
    });
}

// 사이드 버튼에 이벤트를 겁니다.
function SliderK__initSideBtns($slider) {
    $slider.find('.side-btns > div').click(function() {
        var index = $(this).index();

        if ( index == 0 ) {
            SliderK__showPrev($slider);
        }
        else {
            SliderK__showNext($slider);
        }
    });
}

function SliderK__initAutoplay($slider) {
    var autoplay = $slider.data('autoplay');

    $slider.data('autoplay-now-work', 'Y');

    $slider.mouseenter(function() {
        $slider.data('autoplay-now-work', 'N');
    });

    $slider.mouseleave(function() {
        $slider.data('autoplay-now-work', 'Y');
    });

    if ( autoplay != 'Y' ) {
        return false;
    }

    var autoplayInterval = $slider.data('autoplay-interval');

    if ( typeof autoplayInterval == 'undefined' ) {
        autoplayInterval = 3000;
    }
    else {
        // 문자열을 숫자화
        autoplayInterval = autoplayInterval * 1;
    }

    var autoplayDirIsLeft = $slider.data('autoplay-dir') == 'left';

    setInterval(function() {
        if ( $slider.data('autoplay-now-work') == 'Y' ) {
            if ( autoplayDirIsLeft ) {
                SliderK__showPrev($slider);
            }
            else {
                SliderK__showNext($slider);
            }
        }
    }, autoplayInterval);
}

$(function() {
    SliderK__init(); 
});

// news 슬라이더 시작 //

$('.slider-div').slick({
    slide: 'div',		//슬라이드 되어야 할 태그 ex) div, li 
    infinite : true, 	//무한 반복 옵션	 
    slidesToShow : 1,		// 한 화면에 보여질 컨텐츠 개수
    slidesToScroll : 1,		//스크롤 한번에 움직일 컨텐츠 개수
    speed : 300,	 // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
    arrows : true, 		// 옆으로 이동하는 화살표 표시 여부
    dots : false, 		// 스크롤바 아래 점으로 페이지네이션 여부
    autoplay : true,			// 자동 스크롤 사용 여부
    autoplaySpeed : 10000, 		// 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    pauseOnHover : true,		// 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
    vertical : false,		// 세로 방향 슬라이드 옵션
    prevArrow : '.left-btn',		// 이전 화살표 모양 설정
    nextArrow : '.right-btn',		// 다음 화살표 모양 설정
    dotsClass : "slick-dots", 	//아래 나오는 페이지네이션(점) css class 지정
    draggable : true, 	//드래그 가능 여부 
    responsive: [ // 반응형 웹 구현 옵션
        {  
            breakpoint: 960, //화면 사이즈 960px
            settings: {
                //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                slidesToShow:3 
            } 
        },
        { 
            breakpoint: 768, //화면 사이즈 768px
            settings: {	
                //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                slidesToShow:2 
            } 
        }
    ]

});