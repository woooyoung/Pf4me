# Reference

## to2.kr/byG

### NHN Top slider
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="slider-p slider-p-1" data-slider-p-animate-duration="3000">
    <div class="nav-box flex">
        <div class="control-box">
            <button>좌</button>
            <button>정지</button>
            <button>우</button>
        </div>
        <div class="flex">
            <div class="progress-bar">
                <div class="stick"></div>
            </div>
            <div class="index-box flex">
                <div></div>
                /
                <div></div>
            </div>
        </div>
    </div>
    <div class="slides">
        <div style="background-color:red;">1</div>
        <div style="background-color:green;">2</div>
        <div style="background-color:blue;">3</div>
        <div style="background-color:gold;">4</div>
    </div>
</div>

<div class="slider-p slider-p-2" data-slider-p-animate-duration="1000">
    <div class="nav-box flex">
        <div class="control-box">
            <button>좌</button>
            <button>정지</button>
            <button>우</button>
        </div>
        <div class="flex">
            <div class="progress-bar">
                <div class="stick"></div>
            </div>
            <div class="index-box flex">
                <div></div>
                /
                <div></div>
            </div>
        </div>
    </div>
    <div class="slides">
        <div style="background-color:red;"></div>
        <div style="background-color:green;"></div>
        <div style="background-color:blue;"></div>
        <div style="background-color:gold;"></div>
    </div>
</div>
```
```css
.flex {
    display:flex;
}

.slider-p {
    height:500px;
    position:relative;
}

.slider-p .slides > div {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    opacity:0;
    transition:opacity 1s;
}

.slider-p .slides > div.active {
    opacity:1;
}

.slider-p .nav-box {
    z-index:1;
    position:absolute;
    border:10px solid black;
    bottom:0;
    right:0;
}

.slider-p .progress-bar {
    background-color:blue;
    border:10px solid blue;
    height:30px;
    width:100px;
    position:relative;
}

.slider-p .progress-bar > .stick {
    position:absolute;
    left:0;
    top:0;
    width:0;
    height:100%;
    background-color:green;
}
```
```javascript
function SliderP__init(selector) {
    var $slider = $(selector);
    
    var $slides = $slider.find('.slides > div');
    var slidesCount = $slides.length;
    
    var $totalCount = $slider.find('.index-box > :last-child');
    $totalCount.text(slidesCount);
    
    var currentIndex = 0;
    var $current = $slider.find(' > .slides > div.active');
    if ( $current.length > 0 ) {
        currentIndex = $current.index();
    }
    
    $slider.data('slider-p-slidesCount', slidesCount);
    $slider.data('slider-p-currentIndex', currentIndex);
    
    $slider.find('.control-box > button:first-child').click(function() {
        SliderP__movePrev($slider);
    });
    
    $slider.find('.control-box > button:nth-child(2)').click(function() {
        SliderP__stopAnimate($slider);
    });
    
    $slider.find('.control-box > button:last-child').click(function() {
        SliderP__moveNext($slider);
    });
    
    SliderP__show($slider, 0);
}

function SliderP__moveNext($slider) {
    var currentIndex = $slider.data('slider-p-currentIndex');
    var postIndex = currentIndex + 1;
    var slidesCount = $slider.data('slider-p-slidesCount');
    
    if ( postIndex + 1 > slidesCount ) {
        postIndex = 0;
    }
    
    SliderP__show($slider, postIndex);
}

function SliderP__movePrev($slider) {
    var currentIndex = $slider.data('slider-p-currentIndex');
    var postIndex = currentIndex - 1;
    var slidesCount = $slider.data('slider-p-slidesCount');
    
    if ( postIndex < 0 ) {
        postIndex = slidesCount - 1;
    }
    
    SliderP__show($slider, postIndex);
}

function SliderP__show($slider, postIndex) {
    var $stick = $slider.find('.progress-bar > .stick');
    $stick.css('width', 0);
    
    var currentIndex = $slider.data('slider-p-currentIndex');
    var slidesCount = $slider.data('slider-p-slidesCount');
    var $current = $slider.find(' > .slides > div').eq(currentIndex);
    var $post = $slider.find(' > .slides > div').eq(postIndex);
    
    $slider.data('slider-p-currentIndex', postIndex);
    
    $current.removeClass('active');
    $post.addClass('active');
    
    var $currentIndex = $slider.find('.index-box > :first-child');
    $currentIndex.text(postIndex + 1);
    
    SliderP__startAnimate($slider);
}

function SliderP__startAnimate($slider) {
    var $stick = $slider.find('.progress-bar > .stick');
    
    var animateDuration = parseInt($slider.attr('data-slider-p-animate-duration'));
    
    $stick.stop().animate({
        width:'100%'
    }, animateDuration, function() {
        SliderP__moveNext($slider);
    });
}

function SliderP__stopAnimate($slider) {
    var $stick = $slider.find('.progress-bar > .stick');
    
    $stick.stop();
}

SliderP__init('.slider-p-1');
SliderP__init('.slider-p-2');
```

### active-on-visible
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="con">
lorem*50
</div>

<div class="a active-on-visible" data-active-on-visible-delay="0"></div>
<div class="a active-on-visible" data-active-on-visible-delay="300"></div>
<div class="a active-on-visible" data-active-on-visible-delay="600"></div>
<div class="a active-on-visible" data-active-on-visible-delay="900"></div>
```
```css
.a {
  width:200px;
  height:200px;
  background-color:red;
  transform:translateX(100%);
  opacity:0;
  transition: transform 1s, opacity 1s;
}

.a.active {
  transform:translateX(0) rotate(360deg);
  opacity:1;
}
```
```javascript
/* 발견되면 활성화시키는 라이브러리 시작 */
function ActiveOnVisible__init() {
    $(window).resize(ActiveOnVisible__initOffset);
    ActiveOnVisible__initOffset();

    $(window).scroll(ActiveOnVisible__checkAndActive);
    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__initOffset() {
    $('.active-on-visible').each(function(index, node) {
        var $node = $(node);

        var offsetTop = $node.offset().top;
        $node.attr('data-active-on-visible-offsetTop', offsetTop);

        if ( !$node.attr('data-active-on-visible-diff-y') ) {
            $node.attr('data-active-on-visible-diff-y', '0');
        }

        if ( !$node.attr('data-active-on-visible-delay') ) {
            $node.attr('data-active-on-visible-delay', '0');
        }
    });

    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__checkAndActive() { 
    $('.active-on-visible:not(.actived)').each(function(index, node) {
        var $node = $(node);

        var offsetTop = $node.attr('data-active-on-visible-offsetTop') * 1;
        var diffY = parseInt($node.attr('data-active-on-visible-diff-y'));
        var delay = parseInt($node.attr('data-active-on-visible-delay'));

        var callbackFuncName = $node.attr('data-active-on-visible-callback-func-name');

        if ( $(window).scrollTop() + $(window).height() + diffY > offsetTop ) {
            $node.addClass('actived');

            setTimeout(function() {
                $node.addClass('active');
                if ( window[callbackFuncName] ) {
                    window[callbackFuncName]($node);
                }
            }, delay);
        }
    });
}

$(function() {
    ActiveOnVisible__init();
})
/* 발견되면 활성화시키는 라이브러리 끝 */
```

#### video-popup
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!--
<iframe width="1077" height="603" src="https://www.youtube.com/embed/YdGtxXYIFQc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
-->

<button class="btn-1">버튼1 - YdGtxXYIFQc</button>
<button class="btn-2">버튼2 - jiDjGO13ccU</button>

<div class="youtube-popup-bg">
  <div class="btn-close"></div>
</div>
<div class="youtube-popup">
  <iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```
```css
body, ul, li {
  margin:0;
  padding:0;
  list-style:none;
}

body {
  height:10000px;
}

.youtube-popup-bg {
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.8);
  visibility:hidden;
  opacity:0;
  transition: visibility 0.4s, opacity 0.4s;
}

.youtube-popup-actived .youtube-popup-bg {
  opacity:1;
  visibility:visible;
}

html.youtube-popup-actived, html.youtube-popup-actived > body {
  overflow:hidden;
}

.youtube-popup-bg .btn-close {
  position:absolute;
  width:70px;
  height:70px;
  border:10px solid red;
  top:50%;
  left:50%;
  margin-top:-400px;
  transform:translateX(-50%);
  cursor:pointer;
}

.youtube-popup {
  position:fixed;
  top:50%;
  left:50%;
  transform:translateX(-50%) translateY(-50%);
  width:100%;
  max-width:700px;
  transition: visibility 0.4s, opacity 0.4s;
  visibility:hidden;
  opacity:0;
}

.youtube-popup-actived .youtube-popup {
  transition: visibility 0.4s .4s, opacity 0.4s .4s;
  visibility:visible;
  opacity:1;
}

.youtube-popup::after {
  content:"";
  display:block;
  padding-top: 56.25%;
}

.youtube-popup > iframe {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
```
```javascript
function YoutubePopup__show(videoId) {
  $('html').addClass('youtube-popup-actived');
  $('.youtube-popup > iframe').attr('src', 'https://www.youtube.com/embed/' + videoId)
}

function YoutubePopup__hide() {
  $('html').removeClass('youtube-popup-actived');
}

$(function() {
  $('.btn-1').click(function() {
    YoutubePopup__show('YdGtxXYIFQc');
  });
  $('.btn-2').click(function() {
    YoutubePopup__show('jiDjGO13ccU');
  });
  
  $('.youtube-popup-bg').click(YoutubePopup__hide);
});
```