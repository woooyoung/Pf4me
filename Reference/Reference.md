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

#### video-popup(linefriends)
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

### owl-carousel
```html
<!-- 제이쿼리 불러오기 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- owl 캐러셀 불러오기 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>

<div class="box-1 con">
  <div class="my-slider-1">
    <div class="head flex flex-jc-e">
      <div class="control-box flex">
        <div class="index-box">
          <span class="current-index">1</span>/<span class="total-count"></span>
        </div>
        <div class="nav-box">
          <span class="btn-left">좌</span>/<span class="btn-right">우</span>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="owl-carousel owl-theme">
        <div class="item">
          <div>
            <div class="img-box" style="background-image:url(https://www.hancomm.co.kr/file/board/upload/200422_%ED%95%98%EB%82%98%EC%9D%80%ED%96%89_%ED%95%98%EB%82%98%EC%9B%90%ED%81%90.jpg);"></div>
          </div>
        </div>
        <div class="item">
          <div>
            <div class="img-box" style="background-image:url(https://www.hancomm.co.kr//file/board/upload/200406_오로나민C_큰소리뻥뻥_헬스장.jpg);"></div>
          </div>
        </div>
        <div class="item">
          <div>
            <div class="img-box" style="background-image:url(https://www.hancomm.co.kr//file/board/upload/200406_오로나민C_큰소리뻥뻥_부부.jpg);"></div>
          </div>
        </div>
        <div class="item">
          <div>
            <div class="img-box" style="background-image:url(https://www.hancomm.co.kr//file/board/upload/200327_하이트진로_참이슬%20이슬방울.jpg);">
            </div>
          </div>
        </div>
        <div class="item">
          <div>
            <div class="img-box" style="background-image:url(https://www.hancomm.co.kr//file/board/upload/re_200201_bhc골드킹윙.jpg);">
            </div>
          </div>
        </div>
        <div class="item">
          <div>
            <div class="img-box" style="background-image:url(https://www.hancomm.co.kr//file/board/upload/1588730145857_191228_야나두_자동차B국문.jpg);">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
```css
body, ul, li {
  margin:0;
  padding:0;
  list-style:none;
}

.con {
  max-width:1200px;
  margin:0 auto;
}

.flex {
  display:flex;
}

.flex-jc-e {
  justify-content:flex-end;
}

.flex-jc-sb {
  justify-content:space-between;
}

html, body {
  overflow-x:hidden;
}

.box-1 .my-slider-1 {
  border:10px solid red;
  position:relative;
}

.box-1 .my-slider-1::after {
  content:"";
  display:block;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index:10;
  background-color:rgba(255,255,255,0.2);
}

.box-1 .my-slider-1.active::after {
  display:none;
}

.box-1 .my-slider-1 > .head > .control-box {
  border:10px solid green;
  transform:translateX(100%);
  opacity:0;
  transition:transform 0.4s, opacity 0.4s;
  width:150px;
}

.box-1 .my-slider-1.active > .head > .control-box {
  transform:translateX(0);
  opacity:1;
}

@media ( min-width:1401px ) {
  .box-1 .my-slider-1 > .body {
    margin-right:-1950px;
  }
}

@media ( max-width:1400px ) and ( min-width:1101px ) {
  .box-1 .my-slider-1 > .body {
    margin-right:-1050px;
  }
}

@media ( max-width:1100px ) and ( min-width:801px ) {
  .box-1 .my-slider-1 > .body {
    margin-right:-750px;
  }
}

@media ( max-width:800px ) and ( min-width:501px ) {
  .box-1 .my-slider-1 > .body {
    margin-right:-450px;
  }
}

.box-1 .my-slider-1 .item {
  transform:translateX(50px);
  transition:transform 0.3s;
}

.box-1 .my-slider-1 .item[data-no="0"] {
  transition:transform 0.3s 0s;
}

.box-1 .my-slider-1 .item[data-no="1"] {
  transition:transform 0.3s .07s;
}

.box-1 .my-slider-1 .item[data-no="2"] {
  transition:transform 0.3s .14s;
}

.box-1 .my-slider-1 .item[data-no="3"] {
  transition:transform 0.3s .21s;
}

.box-1 .my-slider-1.active .item {
  transform:translateX(0);
}

.box-1 .my-slider-1 > .body {
  position:relative;
}

.box-1 .my-slider-1 > .body::before {
  content:"";
  position:absolute;
  left:0;
  width:50px;
  height:100%;
  background-color:white;
  transition:width 0.3s;
  z-index:10;
}

.box-1 .my-slider-1.active > .body::before {
  width:0;
}

.box-1 .my-slider-1 .item > div > .img-box {
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
}

.box-1 .my-slider-1 .item > div > .img-box::after {
  content:"";
  display:block;
  padding-top:100%;
}
```
```javascript
function MySlider1__updateCurrentPageNumber(event) {
  var $owl = $(event.target);
  var index = $owl.find('.owl-item.active').first().find(' > .item').attr('data-no');
  index = parseInt(index);

  var $currentIndex = $owl.parent().parent().find('.head > .control-box > .index-box > .current-index');

  $currentIndex.text(index + 1);
}

function MySlider1__init() {
  var owlNowSliding = false;
  var slidingDuration = 1000;

  $('.my-slider-1').each(function(index, el) {
    var $mySlider1 = $(el);
    var $item = $mySlider1.find('.item');
    totalCount = $item.length;

    $item.each(function(index, itemEl) {
      var $itemEl = $(itemEl);
      $itemEl.attr('data-no', $itemEl.index());
    });

    var $totalCount = $mySlider1.find('> .head >  .control-box > .index-box > .total-count');
    $totalCount.text(totalCount);
  });

  var owl = $('.my-slider-1 .owl-carousel').owlCarousel({
    loop:true,
    items:6,
    smartSpeed:slidingDuration,
    onInitialized: MySlider1__updateCurrentPageNumber,
    onTranslated: MySlider1__updateCurrentPageNumber,
  });

  owl.on('mousewheel', '.owl-stage', function (e) {
    e.preventDefault();

    if ( owlNowSliding ) {
      return;
    }

    owlNowSliding = true;

    var deltaY = e.deltaY;

    if ( deltaY == undefined ) {
      deltaY = e.originalEvent.wheelDelta;
    }

    if (deltaY<0) {
      owl.trigger('next.owl');
    } else {
      owl.trigger('prev.owl');
    }

    setTimeout(function() {
      owlNowSliding = false;
    }, slidingDuration);
  });

  $('.my-slider-1 > .head > .control-box > .nav-box > span').click(function() {
    if ( owlNowSliding ) {
      return;
    }

    owlNowSliding = true;

    var $clicked = $(this);

    if ( $clicked.is(':first-child') ) {
      owl.trigger('prev.owl');
    }
    else {
      owl.trigger('next.owl');
    }

    setTimeout(function() {
      owlNowSliding = false;
    }, slidingDuration);
  });
  
  setTimeout(function() {
    $('.my-slider-1').addClass('active');
  }, 1500);
}

$(function() {
  MySlider1__init();
})
```

### owl-carousel-form
```html


<!-- 제이쿼리 불러오기, 아울 캐러셀 보다 위에 있어야 합니다. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<!-- 아울 캐러셀 불러오기, 제이쿼리 보다 밑에 있어야 합니다. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.theme.default.min.css">

<div class="slider-1">
  <div class="owl-carousel owl-theme">
    <div class="item"><h4>1</h4></div>
    <div class="item"><h4>2</h4></div>
    <div class="item"><h4>3</h4></div>
    <div class="item"><h4>4</h4></div>
    <div class="item"><h4>5</h4></div>
    <div class="item"><h4>6</h4></div>
    <div class="item"><h4>7</h4></div>
    <div class="item"><h4>8</h4></div>
    <div class="item"><h4>9</h4></div>
    <div class="item"><h4>10</h4></div>
    <div class="item"><h4>11</h4></div>
    <div class="item"><h4>12</h4></div>
  </div>
</div>
```
```css
body, h1, h2, h3, h4 {
  margin:0;
}

.slider-1 .item {
  height:100px;
  background-color:pink;
}
```
```javascript
function Slider1__init() {
  $('.slider-1 .owl-carousel').owlCarousel({
    loop:true,
    margin:20,
    nav:true,
    stagePadding:200,
    navText:['좌', '우'],
    responsive:{
      0:{
        items:1
      }
    }
  });
}

Slider1__init();
```

### owl-carousel-video
```html
<!-- 제이쿼리 불러오기, 아울 캐러셀 보다 위에 있어야 합니다. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<!-- 아울 캐러셀 불러오기, 제이쿼리 보다 밑에 있어야 합니다. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.theme.default.min.css">

<div class="slider-1-outer-box">
  <div class="con relative">
    <div class="slider-1 absolute-top absolute-center">
      <div class="owl-carousel owl-theme">
        <div class="item">
          <iframe src='https://www.youtube.com/embed/hQW_1y0awxE' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'></iframe>
        </div>
        <div class="item">
          <iframe src='https://www.youtube.com/embed/Op9OKbhaMD0' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'></iframe>
        </div>
        <div class="item">
          <iframe src='https://www.youtube.com/embed/Poj1qxvOoGs' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'></iframe>
        </div>
        <div class="item">
          <iframe src='https://www.youtube.com/embed/jDSsOKcsNk8' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'></iframe>
        </div>
      </div>
    </div>
  </div>
</div>

<!--

-->
```
```css
body, h1, h2, h3, h4 {
  margin:0;
}

.overflow-hidden {
  overflow:hidden;
}

.relative {
  position:relative;
}

.absolute-top {
  position:absolute;
  top:0;
}

.absolute-center {
  position:absolute;
  left:50%;
  transform:translateX(-50%);
}

.con {
  max-width:1080px;
  margin-left:auto;
  margin-right:auto;
}

.slider-1 {
  width:3280px;
}

.slider-1-outer-box > .con {
  background-color:red;
}

.slider-1-outer-box > .con::after {
  content:"";
  display:block;
  padding-top:56.25%;
  background-color:blue;
}

.slider-1 .item::after {
  content:"";
  display:block;
  padding-top:56.25%;
  background-color:red;
}

.slider-1 .item > iframe {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}

.slider-1 > .owl-carousel.owl-theme.owl-loaded > .owl-nav > * {
  border-radius:0;
  font-weight:bold;
  font-size:2rem;
  position:absolute;
  top:50%;
  left:50%;
  transform:translateX(-50%) translateY(-50%);
}

.slider-1 > .owl-carousel.owl-theme.owl-loaded > .owl-nav > :first-child {
  left:calc(50% - 600px);
}

.slider-1 > .owl-carousel.owl-theme.owl-loaded > .owl-nav > :last-child {
  left:calc(50% + 600px);
}
```
```javascript
function Slider1__init() {
  $('.slider-1 .owl-carousel').owlCarousel({
    loop:true,
    margin:20,
    nav:true,
    dots:false,
    navText:['좌', '우'],
    responsive:{
      0:{
        items:3
      }
    }
  });
}

Slider1__init();
```


### showing text
```html
<!-- 제이쿼리 불러오기 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


<div class="box-1">
  <div class="txt-box-1">
    안녕하세요.
  </div>
</div>
```
```css
body, ul, li {
  margin:0;
  padding:0;
  list-style:none;
}

.con {
  max-width:1200px;
  margin:0 auto;
}

.flex {
  display:flex;
}

.flex-jc-e {
  justify-content:flex-end;
}

.flex-jc-sb {
  justify-content:space-between;
}

.video-box > video {
  width:100%;
  display:block;
}

.box-1 {
  display:flex;
  align-items:center;
  justify-content:center;
  height:600px;
}

.box-1 > .txt-box-1 {
  font-size:4rem;
  font-weight:bold;
  letter-spacing:-0.3rem;
  color:transparent;
  position:relative;
  transition:color 0s 1s;
  overflow:hidden;
}

.box-1 > .txt-box-1::before {
  content:"";
  position:absolute;
  left:-1000%;
  top:0;
  width:1000%;
  bottom:0;
  background-color:black;
  transition:left 2s;
}

.box-1.active > .txt-box-1::before {
  left:200%;
}

.box-1.active > .txt-box-1 {
  color:black;
}
```
```javascript
setTimeout(function() {
  $('.box-1').addClass('active');
}, 1000);
```

### video-popup
```html
<!-- 제이쿼리 불러오기 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="pop-1-bg"></div>
<div class="pop-1">
  <div class="head">
    <button class="btn-close">닫기</button>
  </div>
  <div class="body">
    <div class="client"></div>
    <div class="title"></div>
    <div class="video-box"></div>
  </div>
</div>


<button onclick="Pop1__open('KEB하나은행', 'KEB하나은행 하나원큐', 'https://www.hancomm.co.kr/file/board/upload/200422_하나은행_하나원큐.mp4');">열기1</button>


<button onclick="Pop1__open('동아오츠카', '오로나민C 큰소리 뻥뻥 헬스장', 'https://www.hancomm.co.kr/file/board/upload/200406_오로나민C_큰소리뻥뻥_헬스장.mp4');">열기2</button>
```
```css
body, ul, li {
  margin:0;
  padding:0;
  list-style:none;
}

.con {
  max-width:1200px;
  margin:0 auto;
}

.flex {
  display:flex;
}

.flex-jc-e {
  justify-content:flex-end;
}

.flex-jc-sb {
  justify-content:space-between;
}

.video-box > video {
  width:100%;
  display:block;
}

/* 팝업1 시작 */
.pop-1-bg {
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.3);
  display:none;
}

.pop-1-bg.active {
  display:block;
}

.pop-1-bg + .pop-1 {
  width:900px;
  background-color:white;
  position:fixed;
  left:50%;
  transform:translateX(-50%) translateY(-1000px);
  top:100px;
  transition:transform 0.4s;
  padding:30px;
}

.pop-1-bg.active + .pop-1 {
  transform:translateX(-50%) translateY(0);
}
/* 팝업1 끝 */
```
```javascript
function Pop1__open(client, title, url) {
  $('.pop-1-bg').addClass('active');
  var $pop1 = $('.pop-1');
  
  $pop1.find('.client').text(client);
  $pop1.find('.title').text(title);
  $pop1.find('.video-box').html('<video src="' + url + '" controls="" autoplay="" muted></video>');
}

function Pop1__close() {
  $('.pop-1-bg').removeClass('active');
  var $pop1 = $('.pop-1');
  
  $pop1.find('.client').text('');
  $pop1.find('.title').text('');
  $pop1.find('.video-box').html('');
}

function Pop1__init() {
  $('.pop-1 .btn-close, .pop-1-bg').click(Pop1__close);
}

Pop1__init();
```

### miral.org
```
http://www.miral.org/main/main.asp
```
```html
<!-- 유용한 링크 -->
<!-- cdnsj : https://cdnjs.com/ -->
<!-- 폰트어썸 아이콘 리스트 : https://fontawesome.com/icons?d=gallery&m=free -->

<!-- 구글 폰트 불러오기 -->
<!-- rotobo(400/700/900), notosanskr(400/600/900) -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">

<!-- 폰트어썸 불러오기 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">

<!-- 제이쿼리 불러오기 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="box-1 active-on-visible con flex" data-active-on-visible-callback-func-name="count">
  <div class="flex-1-0-0 flex border-red">
    <div class="border-green relative flex flex-jc-e">
      <div class="border-gold relative flex flex-ai-e flex-jc-c">
        <div>
          <span class="num" data-num-ani-slow-point="0.9" data-num-ani-slow-add-interval="10" data-num-ani-interval="40" data-num-ani-stride="41" data-num-ani-start="0" data-num-ani-end="8785"></span>명
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="icon-circle"></div>
  </div>
  <div class="flex-1-0-0 flex flex-jc-e border-red">
    <div class="border-green relative flex">
      <div class="border-gold relative flex flex-ai-e flex-jc-c">
        <div>
          <span class="num" data-num-ani-slow-point="0.9" data-num-ani-slow-add-interval="10" data-num-ani-interval="40" data-num-ani-stride="41" data-num-ani-start="0" data-num-ani-end="8785"></span>명
        </div>
      </div>
    </div>
  </div>
</div>
```
```css
html {
  /* 영문이면 roboto가 적용되고, 한글이면 Noto Sans KR가 적용되도록 아래와 같은 순서로 배치 */
  font-family: "Roboto", "Noto Sans KR", sans-serif;
}

/* 노말라이즈 */
body, ul, li, h1 {
  margin:0;
  padding:0;
  list-style:none;
}

a {
  color:inherit;
  text-decoration:none;
}

label[for] {
  cursor:pointer;
  user-select:none;
}

/* 라이브러리 */
.block {
  display:block;
}

.inline-block {
  display:inline-block;
}

.absolute-left {
  position:absolute;
  left:0;
}

.absolute-right {
  position:absolute;
  right:0;
}

.absolute-bottom {
  position:absolute;
  bottom:0;
}

.absolute-top {
  position:absolute;
  top:0;
}

.absolute-center {
  position:absolute;
  left:50%;
  transform:translateX(-50%);
}

.absolute-middle {
  position:absolute;
  top:50%;
  transform:translateY(-50%);
}

.absolute-middle.absolute-center {
  position:absolute;
  top:50%;
  left:50%;
  transform:translateX(-50%) translateY(-50%);
}

.relative {
  position:relative;
}

.cell {
  float:left;
  box-sizing:border-box;
}

.cell-right {
  float:right;
  box-sizing:border-box;
}

.row::after {
  content:"";
  display:block;
  clear:both;
}

.clear-both {
  clear:both;
}

.img-box > img {
  width:100%;
  display:block;
}

.con {
  margin-left:auto;
  margin-right:auto;
}

.margin-0-auto {
  margin-left:auto;
  margin-right:auto;
}

.text-align-center {
  text-align:center;
}

.text-align-right {
  text-align:right;
}

.line-height-0 {
  line-height:0;
}

.line-height-0 > * {
  line-height:normal;
}

.width-30px {
  width:30px;
}

.width-35px {
  width:35px;
}

.width-40px {
  width:35px;
}

.width-45px {
  width:35px;
}

.width-50px {
  width:50px;
}

.width-80px {
  width:80px;
}

.width-100px {
  width:100px;
}

.width-100p {
  width:100%;
}

.width-60p {
  width:60%;
}

.width-55p {
  width:55%;
}

.width-50p {
  width:50%;
}

.width-45p {
  width:45%;
}

.width-40p {
  width:40%;
}

.width-30p {
  width:30%;
}

.width-35p {
  width:35%;
}

.width-100p-except-30px {
  width:calc(100% - 30px);
}

.width-100p-except-35px {
  width:calc(100% - 35px);
}

.width-100p-except-40px {
  width:calc(100% - 40px);
}

.width-100p-except-50px {
  width:calc(100% - 50px);
}

.width-100p-except-80px {
  width:calc(100% - 80px);
}

.width-100p-except-100px {
  width:calc(100% - 100px);
}

.height-100p {
  height:100%;
}

.height-50p {
  height:50%;
}

.border-box {
  box-sizing:border-box;
}

.font-size-dot-8rem {
  font-size:.8rem;
}

.table-row {
  display:table;
}

.table-row.row::after {
  display:inline;
  clear:non;
}

.table-row > .cell {
  float:none;
  display:table-cell;
}

.border-red {
  border:10px solid red;
}

.border-green {
  border:10px solid green;
}

.border-blue {
  border:10px solid blue;
}

.border-gold {
  border:10px solid gold;
}

.border-pink {
  border:10px solid pink;
}

/* 라이브러리 - flex */
* > .flex {
  display:flex;
}

* > .flex-grow-1 {
  flex-grow:1;
}

* > .flex-jc-c {
  justify-content:center;
}

* > .flex-jc-s {
  justify-content:flex-start;
}

* > .flex-jc-e {
  justify-content:flex-end;
}

* > .flex-jc-sb {
  justify-content:space-between;
}

* > .flex-ai-c {
  align-items:center;
}

* > .flex-ai-s {
  align-items:flex-start;
}

* > .flex-ai-e {
  align-items:flex-end;
}

* > .flex-as-s {
  align-self:stretch;
}

* > .flex-as-c {
  align-self:center;
}

* > .flex-as-s {
  align-self:flex-start;
}

* > .flex-as-e {
  align-self:flex-end;
}

* > .flex-column-nowrap {
  flex-flow:column nowrap;
}

* > .flex-column-wrap {
  flex-flow:column wrap;
}

* > .flex-row-wrap {
  flex-flow:row wrap;
}

.flex-ch-basis-0 > * {
  flex-basis:0;
}

* > .flex-1-0-0 {
  flex:1 0 0;
}

/* 커스텀 */
.con-min-width {
  min-width:1356px;
}

.con {
  width:1356px;
}

.box-1 {
  margin-top:1000px;
}

.box-1 .icon-circle {
  width:160px;
  height:160px;
  border-radius:50%;
  background-color:green;
  background-image:url(http://www.miral.org/images/main/icon_infograph.png);
  background-position:center;
  transform:scale(0);
  transition:transform 0.3s cubic-bezier(0.390, 0.575, 0.175, 1.270);
}

.box-1.active .icon-circle {
  transform:scale(1);
}

.box-1 > :not(:nth-child(2)) > div {
  width:0;
  transition:width 1s;
}

.box-1 > :not(:nth-child(2)) > div::before {
  content:"";
  position:absolute;
  top:50%;
  left:0;
  width:100%;
  height:1px;
  background-color:black;
}

.box-1.active > :not(:nth-child(2)) > div {
  width:100%;
}

.box-1 > :not(:nth-child(2)) > div > div {
  width:100px;
}

.box-1 > :not(:nth-child(2)) > div > div::before, .box-1 > :not(:nth-child(2)) > div > div::after {
  content:"";
  position:absolute;
  top:50%;
  left:50%;
  transform:translateX(-50%) translateY(-50%);
  width:5px;
  height:5px;
  border-radius:50%;
  background-color:black;
}

.box-1 > :not(:nth-child(2)) > div > div::after {
  transform:translateY(-50%);
  left:auto;
  right:0;
}

.box-1 > :last-child > div > div::after {
  transform:translateY(-50%);
  left:0;
  right:auto;
}
```
```javascript
/* 숫자 카운트 라이브러리 시작 */
function NumAni__start(selector) {
    $(selector).each(function(index, node) {
        var $el = $(node);
        
        var start = parseInt($el.attr('data-num-ani-start'));
        var interval = parseInt($el.attr('data-num-ani-interval'));

        $el.attr('data-num-ani-interval-current', interval);

        $el.text(start);

        NumAni__increaseNum($el);
    });
}

function NumAni__increaseNum($el) {
    var current = parseInt($el.text());
    var end = parseInt($el.attr('data-num-ani-end'));
    var stride = parseInt($el.attr('data-num-ani-stride'));
    var interval = parseInt($el.attr('data-num-ani-interval-current'));
    var slowPoint = parseFloat($el.attr('data-num-ani-slow-point'))

    if (current < end) {
        if ( current > end * slowPoint ) {
            interval += parseInt($el.attr('data-num-ani-slow-add-interval'));
            if ( interval > 100 ) {
                interval = 100;
            }
            $el.attr('data-num-ani-interval-current', interval);
        }

        if ( current + stride > end ) {
            $el.text(end);
        }
        else {
            $el.text(current + stride);
        }

        setTimeout(function () {
            NumAni__increaseNum($el);
        }, interval);
    }
    else {
        $el.addClass('num-action-done');
    }
}
/* 숫자 카운트 라이브러리 끝 */

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

// 커스텀 시작
function count($node) {
    NumAni__start('.num');
}
// 커스텀 끝
```

### PUBG-FEATURED NEWS 
```html
<!-- 유용한 링크 -->
<!-- cdnsj : https://cdnjs.com/ -->
<!-- 폰트어썸 아이콘 리스트 : https://fontawesome.com/icons?d=gallery&m=free -->

<!-- 구글 폰트 불러오기 -->
<!-- rotobo(400/700/900), notosanskr(400/600/900) -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">

<!-- 폰트어썸 불러오기 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">

<!-- 제이쿼리 불러오기 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="box-1 con">
    <ul class="flex flex-jc-sb">
        <li>
            <a href="#" class="block relative">
                <div class="abs-full flex flex-column-nowrap">
                    <div class="img-box" style="background-image:url(https://tjswjd2990.github.io/img1/pf/PUBG/meet_the_champions_featured-750x422.jpg);"></div>
                    <div class="txt-box flex-grow-1">
                        텍스트
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" class="block relative">
                <div class="abs-full flex flex-column-nowrap">
                    <div class="img-box" style="background-image:url(https://tjswjd2990.github.io/img1/pf/PUBG/final-recap-1.png);"></div>
                    <div class="txt-box flex-grow-1">
                        텍스트
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" class="block relative">
                <div class="abs-full flex flex-column-nowrap">
                    <div class="img-box" style="background-image:url(https://tjswjd2990.github.io/img1/pf/PUBG/200706_08.png);"></div>
                    <div class="txt-box flex-grow-1">
                        텍스트
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>
```
```css
html {
    /* 영문이면 roboto가 적용되고, 한글이면 Noto Sans KR가 적용되도록 아래와 같은 순서로 배치 */
    font-family: "Roboto", "Noto Sans KR", sans-serif;
}

/* 노말라이즈 */
body, ul, li, h1 {
    margin:0;
    padding:0;
    list-style:none;
}

a {
    color:inherit;
    text-decoration:none;
}

label[for] {
    cursor:pointer;
    user-select:none;
}

/* 라이브러리 */
.block {
    display:block;
}

.inline-block {
    display:inline-block;
}

.absolute-left {
    position:absolute;
    left:0;
}

.absolute-right {
    position:absolute;
    right:0;
}

.absolute-bottom {
    position:absolute;
    bottom:0;
}

.absolute-top {
    position:absolute;
    top:0;
}

.absolute-center {
    position:absolute;
    left:50%;
    transform:translateX(-50%);
}

.absolute-middle {
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}

.absolute-middle.absolute-center {
    position:absolute;
    top:50%;
    left:50%;
    transform:translateX(-50%) translateY(-50%);
}

.abs-full {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
}

.relative {
    position:relative;
}

.cell {
    float:left;
    box-sizing:border-box;
}

.cell-right {
    float:right;
    box-sizing:border-box;
}

.row::after {
    content:"";
    display:block;
    clear:both;
}

.clear-both {
    clear:both;
}

.img-box > img {
    width:100%;
    display:block;
}

.con {
    margin-left:auto;
    margin-right:auto;
}

.margin-0-auto {
    margin-left:auto;
    margin-right:auto;
}

.text-align-center {
    text-align:center;
}

.text-align-right {
    text-align:right;
}

.line-height-0 {
    line-height:0;
}

.line-height-0 > * {
    line-height:normal;
}

.width-30px {
    width:30px;
}

.width-35px {
    width:35px;
}

.width-40px {
    width:35px;
}

.width-45px {
    width:35px;
}

.width-50px {
    width:50px;
}

.width-80px {
    width:80px;
}

.width-100px {
    width:100px;
}

.width-100p {
    width:100%;
}

.width-60p {
    width:60%;
}

.width-55p {
    width:55%;
}

.width-50p {
    width:50%;
}

.width-45p {
    width:45%;
}

.width-40p {
    width:40%;
}

.width-30p {
    width:30%;
}

.width-35p {
    width:35%;
}

.width-100p-except-30px {
    width:calc(100% - 30px);
}

.width-100p-except-35px {
    width:calc(100% - 35px);
}

.width-100p-except-40px {
    width:calc(100% - 40px);
}

.width-100p-except-50px {
    width:calc(100% - 50px);
}

.width-100p-except-80px {
    width:calc(100% - 80px);
}

.width-100p-except-100px {
    width:calc(100% - 100px);
}

.height-100p {
    height:100%;
}

.height-50p {
    height:50%;
}

.border-box {
    box-sizing:border-box;
}

.font-size-dot-8rem {
    font-size:.8rem;
}

.table-row {
    display:table;
}

.table-row.row::after {
    display:inline;
    clear:non;
}

.table-row > .cell {
    float:none;
    display:table-cell;
}

.border-red {
    border:10px solid red;
}

.border-green {
    border:10px solid green;
}

.border-blue {
    border:10px solid blue;
}

.border-gold {
    border:10px solid gold;
}

.border-pink {
    border:10px solid pink;
}

/* 라이브러리 - flex */
* > .flex {
    display:flex;
}

* > .flex-grow-1 {
    flex-grow:1;
}

* > .flex-jc-c {
    justify-content:center;
}

* > .flex-jc-s {
    justify-content:flex-start;
}

* > .flex-jc-e {
    justify-content:flex-end;
}

* > .flex-jc-sb {
    justify-content:space-between;
}

* > .flex-ai-c {
    align-items:center;
}

* > .flex-ai-s {
    align-items:flex-start;
}

* > .flex-ai-e {
    align-items:flex-end;
}

* > .flex-as-s {
    align-self:stretch;
}

* > .flex-as-c {
    align-self:center;
}

* > .flex-as-s {
    align-self:flex-start;
}

* > .flex-as-e {
    align-self:flex-end;
}

* > .flex-column-nowrap {
    flex-flow:column nowrap;
}

* > .flex-column-wrap {
    flex-flow:column wrap;
}

* > .flex-row-wrap {
    flex-flow:row wrap;
}

.flex-ch-basis-0 > * {
    flex-basis:0;
}

* > .flex-1-0-0 {
    flex:1 0 0;
}

/* 커스텀 */

.con {
    max-width:1521px;
}

.box-1 > ul > li > .block {
    width:492px;
}

.box-1 > ul > li > .block::before {
    content:"";
    background-image:url(https://www.pubgesports.com/static/img/bg_post_line.png);
    position:absolute;
    top:-3%;
    left:-3%;
    right:-3%;
    bottom:-3%;
    transform:translateX(-20px) translateY(-20px);
    background-size:contain;
    background-repeat:no-repeat;
    transition: transform 0.4s;
    z-index:10;
}

.box-1 > ul > li:hover > .block::before {
    transform:translateX(0) translateY(0);
}

.box-1 > ul > li > .block::after {
    content:"";
    display:block;
    padding-top:95.78059071729958%;
}

.box-1 > ul > li > .block > div > .img-box {
    background-size:cover;
    background-position:center;
}

.box-1 > ul > li > .block > div > .img-box::after {
    content:"";
    display:block;
    padding-top:56.1181%;
}

.box-1 > ul > li > .block > div > .txt-box {
    background-color:pink;
}

@media ( max-width:1476px ) {
    .box-1 {
        max-width:none;
        margin-left:30px;
        margin-right:30px;
    }

    .box-1 > ul {
        flex-wrap:wrap;
    }

    .box-1 > ul > li {
        margin-top:60px;
        width:calc(50% - 60px / 2);
        box-sizing:border-box;
    }

    .box-1 > ul > li:nth-child(2n + 1) {
        margin-right:60px;
    }

    .box-1 > ul > li > .block {
        width:auto;
    }
}
```

### Linefriends-slider
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="slider-x slider-x-1">
  <div class="slides">
    <div data-slider-x-img-type-1="뉴욕타임스퀘어" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/5e9e58d2a43c40a599b8918bd72c9df5.jpg"></div>
    <div data-slider-x-img-type-1="뉴욕타임스퀘어" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/358880900eb04b75a2f854666f0bc2a8.jpg"></div>
    <div data-slider-x-img-type-1="뉴욕타임스퀘어" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/5063a11e33b543ceaf0749cd0c644ac6.jpg"></div>
    <div data-slider-x-img-type-1="뉴욕타임스퀘어" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/67b21996a3344742a5662171cd7677b8.jpg"></div>
    <div data-slider-x-img-type-1="뉴욕타임스퀘어" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/90278d132a464ce2aa2326c23c379790.jpg"></div>
    <div data-slider-x-img-type-1="LA할리우드" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/5d5a2304f96f4e25a92b660e6e5c9aec.jpg"></div>
    <div data-slider-x-img-type-1="LA할리우드" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/5370159d45a54ad6bb9051449b7906e9.jpg"></div>
    <div data-slider-x-img-type-1="LA할리우드" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/8f91f100acfe4d6eacec67ce43022063.jpg"></div>
    <div data-slider-x-img-type-1="LA할리우드" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/7c81dce4b6714f0e8f5a2e42205a7f2a.jpg"></div>
    <div data-slider-x-img-type-1="LA할리우드" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/3d1ef121f4f44514ab65c7840480f497.jpg"></div>
    <div data-slider-x-img-type-1="상해신천지" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/1fa25ad4d21c43dbb600fb2005174f7d.jpg"></div>
    <div data-slider-x-img-type-1="상해신천지" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/b025451ab5b44afb9ef69424633f0d28.jpg"></div>
    <div data-slider-x-img-type-1="상해신천지" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/0f7091cb256146a78c93bc3511953e79.jpg"></div>
    <div data-slider-x-img-type-1="상해신천지" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/b29b64c51d63420c9cb428463bd478b2.jpg"></div>
    <div data-slider-x-img-type-1="상해신천지" data-slider-x-img-url="https://www.linefriends.com/content/photo/201901/2893a93c9b884928aadbfb2d9b15cd9c.jpg"></div>
  </div>
  <div class="side-btns">
    <div></div>
    <div></div>
  </div>
  <div class="page-box flex flex-jc-c">
    <button>좌</button>
    <div class="pages flex flex-jc-c">
      
    </div>
    <button>우</button>
  </div>
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

.flex {
  display:flex;
}

.flex-jc-c {
  justify-content:center;
}

.slider-x {
  height:100vh;
  position:relative;
}

.slider-x > .slides > div {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
  opacity:0;
  visibility:hidden;
  transition: opacity 1s, visibility 1s;
}

.slider-x > .slides > div.active {
  opacity:1;
  visibility:visible;
}

.slider-x > .side-btns > div {
  width:100px;
  height:100px;
  position:absolute;
  left:0;
  top:50%;
  transform:translateY(-50%);
  background-color:red;
}

.slider-x > .side-btns > div:last-child {
  left:auto;
  right:0;
}

.slider-x > .page-box {
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
}

.slider-x > .page-box > .pages > div {
  width:100px;
  background-position:center;
  background-repeat:no-repeat;
  background-size:cover;
  display:none;
}

.slider-x > .page-box > .pages > div.visible {
  display:block;
}

.slider-x > .page-box > .pages > div.active {
  border:2px solid red;
}

.slider-x > .page-box > .pages > div::after {
  content:"";
  display:block;
  padding-top:60%;
}
```
```javascript
console.clear();
function SliderX__init(selector) {
  var $slider = $(selector);
  
  var $pages = $slider.find('.page-box > .pages');
  
  var slidesCount = $slider.find('.slides > div').length;
  var currentIndex = 0;
  
  $slider.data('slider-x-slidesCount', slidesCount);
  $slider.data('slider-x-currentIndex', currentIndex);
  
  $slider.find('.slides > div').each(function(index, el) {
    var $el = $(el)
    var type1 = $el.attr('data-slider-x-img-type-1');
    var imgUrl = $el.attr('data-slider-x-img-url');
    
    $el.css('background-image', 'url(' + imgUrl + ')');
    
    var $btn = $('<div></div>');
    $btn.css('background-image', 'url(' + imgUrl + ')');
    $btn.attr('data-slider-x-img-type-1', type1);
    $pages.append($btn);
  });
  
  $pages.find(' > div').click(function() { 
    SliderX__show($slider, $(this).index());
  });
  
  $slider.find('.side-btns > div:first-child').click(function() {
    SliderX__movePrev($slider);
  });
  
  $slider.find('.side-btns > div:last-child').click(function() {
    SliderX__moveNext($slider);
  });
  
  $slider.find('.page-box > :first-child').click(function() {
    SliderX__movePrevGroup($slider);
  });
  
  $slider.find('.page-box > :last-child').click(function() {
    SliderX__moveNextGroup($slider);
  });

  SliderX__show($slider, 0);
}

function SliderX__movePrev($slider) {
  var postIndex = $slider.data('slider-x-currentIndex') - 1;
  var slidesCount = $slider.data('slider-x-slidesCount');
  
  if ( postIndex < 0 ) {
    postIndex = slidesCount - 1;
  }
  
  SliderX__show($slider, postIndex);
}

function SliderX__moveNext($slider) {
  var postIndex = $slider.data('slider-x-currentIndex') + 1;
  var slidesCount = $slider.data('slider-x-slidesCount');
  
  if ( postIndex + 1 > slidesCount ) {
    postIndex = 0;
  }
  
  SliderX__show($slider, postIndex);
}

function SliderX__movePrevGroup($slider) {
  var currentIndex = $slider.data('slider-x-currentIndex');
  
  // 현재 활성화된 녀석
  var $current = $slider.find('.slides > div').eq(currentIndex);
  
  var type1 = $current.attr('data-slider-x-img-type-1');
  
  // 이전그룹의 마지막 녀석 찾기
  var $post = $current.parent().children('[data-slider-x-img-type-1="' + type1 + '"]').first().prev();
  
  if ( $post.length > 0 ) {
    var type1OfPost = $post.attr('data-slider-x-img-type-1');

    $post = $current.parent().children('[data-slider-x-img-type-1="' + type1OfPost + '"]').first();
  }
  else {
    $post = $current.parent().children().last();
    
    var type1OfPost = $post.attr('data-slider-x-img-type-1');

    $post = $current.parent().children('[data-slider-x-img-type-1="' + type1OfPost + '"]').first();
  }
  
  var postIndex = $post.index();
  
  SliderX__show($slider, postIndex);
}

function SliderX__moveNextGroup($slider) {
  var currentIndex = $slider.data('slider-x-currentIndex');
  
  // 현재 활성화된 녀석
  var $current = $slider.find('.slides > div').eq(currentIndex);
  
  var type1 = $current.attr('data-slider-x-img-type-1');
  
  // 다음그룹의 첫번째 찾기
  var $post = $current.parent().children('[data-slider-x-img-type-1="' + type1 + '"]').last().next();
  
  if ( $post.length == 0 ) {
    $post = $current.parent().children().first();
  }
  
  var postIndex = $post.index();
  
  SliderX__show($slider, postIndex);
}

function SliderX__show($slider, postIndex) {
  var currentIndex = $slider.data('slider-x-currentIndex');
  var $current = $slider.find('.slides > div').eq(currentIndex);
  var $post = $slider.find('.slides > div').eq(postIndex);
  
  var type1 = $post.attr('data-slider-x-img-type-1');
  
  $current.removeClass('active');
  $post.addClass('active');
  
  $slider.data('slider-x-currentIndex', postIndex);
  
  $slider.find('.page-box > .pages > div').removeClass('active');
  $slider.find('.page-box > .pages > div').eq(postIndex).addClass('active');
  
  $slider.find('.page-box > .pages > div').removeClass('visible');
  $slider.find('.page-box > .pages > div[data-slider-x-img-type-1="' + type1 + '"]').addClass('visible');
}

$(function() {
  SliderX__init('.slider-x-1');
});
```

### CHANEL-slider
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="slider-u slider-u-1">
  <div class="control-box">
    <div class="progress-bar">
      <div class="stick"></div>
    </div>
  </div>
  <div class="slides">
    <div style="background-image:url(https://www.chanel.com/i18n/ko_KR/slides/landscape_ipad_Haute_couture.jpg);"></div>
    <div style="background-image:url('https://www.chanel.com/i18n/ko_KR/slides/landscape_ipad_Collection_M%C3%A9tiers_d\'art_201920_FSH_0720.jpg');"></div>
    <div style="background-image:url(https://www.chanel.com/i18n/ko_KR/slides/landscape_ipad_BRIDAL_JEWELLERY_JP_KR_0420.jpg);"></div>
    <div style="background-image:url(https://www.chanel.com/i18n/ko_KR/slides/landscape_ipad_J12_WATCHES_KR_0520.jpg);"></div>
    <div style="background-image:url(https://www.chanel.com/i18n/ko_KR/slides/landscape_ipad_Inside_chanel_KR_0420_.jpg);"></div>
    <div style="background-image:url(https://www.chanel.com/i18n/ko_KR/slides/landscape_ipad_Chance_fragrance_0119.jpg);"></div>
    <div style="background-image:url(https://www.chanel.com/i18n/ko_KR/slides/landscape_ipad_LES_BEIGES_SUMMER_GLOW_0520_MU.jpg);"></div>
    <div style="background-image:url(https://www.chanel.com/i18n/ko_KR/slides/landscape_ipad_HYDRA_BEAUTY_KR_0720.jpg);"></div>
  </div>
  
  <div class="pages">
    <div>오뜨 꾸뛰르</div>
    <div>패션</div>
    <div>화인 주얼리</div>
    <div>시계</div>
    <div>인사이드 샤넬</div>
    <div>향수</div>
    <div>메이크업</div>
    <div>스킨케어</div>
  </div>
</div>
```
```css
.slider-u > .slides {
  border:10px solid red; /* 임시 */
  position:relative;
  height:500px;
}

.slider-u > .slides > div {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-position:center;
  background-repeat:no-repeat;
  background-size:cover;
  opacity:0;
  visibility:hidden;
  transition: opacity 1s, visibility 1s;
}

.slider-u > .slides > div.active {
  opacity:1;
  visibility:visible;
}

.slider-u > .pages {
  border:10px solid gold;
  width:450px;
  text-align:center;
  margin:0 auto;
}

.slider-u > .pages > div {
  border:5px solid blue;
  display:inline-block;
}

.slider-u > .pages > div.active {
  font-weight:bold;
  color:red;
}

.slider-u > .control-box > .progress-bar {
  width:200px;
  height:50px;
  border:2px solid black;
  visibility:hidden; /* 이거는 옵션 */
}

.slider-u > .control-box > .progress-bar > .stick {
  height:100%;
  background-color:green;
  width:0;
}
```
```javascript
console.clear();
function SliderU__init(selector) {
  var $slider = $(selector);
  
  // 페이지 버튼에 마우스 enter 이벤트 걸기
  $slider.find('.pages > div').mouseenter(function() {
    var $this = $(this);
    var index = $this.index();
    SliderU__show($slider, index);
  });
  
  // 페이지 버튼에 마우스 leave 이벤트 걸기
  $slider.find('.pages > div').mouseleave(function() {
    SliderU__startTimeoutNext($slider);
  });
  
  // 최초에 한번은 직접 실행해 준다.
  SliderU__show($slider, 0);
  SliderU__startTimeoutNext($slider);
}

function SliderU__show($slider, index) {
  // 매번 보여줄 때 마다 스틱을 초기화 한다.
  var $stick = $slider.find(' > .control-box > .progress-bar > .stick');
  
  $stick.css('width', '0');
  $stick.stop();
  
  // 슬라이더 활성화
  $slider.find('.slides > div.active').removeClass('active');
  $slider.find('.slides > div').eq(index).addClass('active');
  
  // 패이지 버튼 활성화
  $slider.find('.pages > div.active').removeClass('active');
  $slider.find('.pages > div').eq(index).addClass('active');
}

function SliderU__moveNext($slider) {
  var $post = $slider.find('.slides > div.active').next();
  if ( $post.length == 0 ) {
    SliderU__show($slider, 0);
  }
  else {
    SliderU__show($slider, $post.index());
  }
}

function SliderU__startTimeoutNext($slider) {
  var $stick = $slider.find(' > .control-box > .progress-bar > .stick');
  
  $stick.css('width', '0');
  $stick.stop().animate({
    'width':'100%'
  }, 4000, function() {
    SliderU__moveNext($slider);
    SliderU__startTimeoutNext($slider);
  });
}

SliderU__init('.slider-u-1');
```

### height-sync 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<div class="page page-5">
    <div class="title-box">
        <h1 class="text-align-center">
            Franchise
        </h1>
        <div class="des text-align-center">
            브랜드 창업을 검토하실 때 꼭 필요합니다.
        </div>
    </div>
    
    <div class="list-box con">
        <ul class="row">
            <li class="cell">
                <div class="height-sync" data-height-sync-group-no="1_401up_750down,3_751up">
                    <div class="img-box"><img src="http://rolling-pasta.com/_imgs/franchise_ico1.png" alt=""></div>
                    <div class="no-box"><span>1</span></div>
                    <h1>창업설명회</h1>
                    <div class="des text-align-center">
                        더본코리아 모든 브랜드의 창업은
                        <br>
                        창업설명회 참석으로부터 시작됩니다.
                    </div>
                </div>
            </li>
            <li class="cell">
                <div class="height-sync" data-height-sync-group-no="1_401up_750down,3_751up">
                    <div class="img-box"><img src="http://rolling-pasta.com/_imgs/franchise_ico2.png" alt=""></div>
                    <div class="no-box"><span>2</span></div>
                    <h1>타겟 입지</h1>
                    <div class="des text-align-center">
                        브랜드는 주로 메인상권
                        <br>
                        지역에 개설됩니다.
                    </div>
                </div>
            </li>
            <li class="cell">
                <div class="height-sync" data-height-sync-group-no="2_401up_750down,3_751up">
                    <div class="img-box"><img src="http://rolling-pasta.com/_imgs/franchise_ico3.png" alt=""></div>
                    <div class="no-box"><span>3</span></div>
                    <h1>필요 면적</h1>
                    <div class="des text-align-center">
                        브랜드는 지상 1층,<br>
                        전용면적 최소 99m<sup>2</sup>(30PY)/<br>
                        지상2층, 전용면적 최소 132m<sup>2</sup>(40PY)의<br>
                        공간이 필요합니다.
                    </div>
                </div>
            </li>
            <li class="cell">
                <div class="height-sync" data-height-sync-group-no="2_401up_750down,3_751up">
                    <div class="img-box"><img src="http://rolling-pasta.com/_imgs/franchise_ico4.png" alt=""></div>
                    <div class="no-box"><span>4</span></div>
                    <h1>창업 가능 지역</h1>
                    <div class="des text-align-center">
                        현재 서울 및 수도권 지역에서 브랜드를<br>
                        개설할 수 있습니다.
                    </div>
                </div>
            </li>
        </ul>
    </div>

    <div class="des-box text-align-center">
        본사와 가맹점주가 상생할 수 있는 지속성 있는 브랜드의 개발과 경영방침을 추구합니다.
    </div>

    <div class="btn-box text-align-center line-height-0-ch-only">
        <div class="btn inline-block">
            창업설명회 신청 / 문의
        </div>
    </div>
</div>
```
```css
/*  폰트 적용 */
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

html {
    font-family: "Noto Sans KR", sans-serif;
}

/* 노말라이즈 */
body, ul, li, h1 {
    margin:0;
    padding:0;
    list-style:none;
}

a {
    color:inherit;
    text-decoration:none;
}

/* 라이브러리 */
.con {
    margin:0 auto;
}

.img-box > img {
    width:100%;
    display:block;
}

.row::after {
    content:"";
    display:block;
    clear:both;
}

.cell {
    float:left;
    box-sizing:border-box;
}

.cell-right {
    float:right;
    box-sizing:border-box;
}

.margin-0-auto {
    margin:0 auto;
}

.block {
    display:block;
}

.inline-block {
    display:inline-block;
}

.text-align-center {
    text-align:center;
}

.line-height-0-ch-only {
    line-height:0;
}

.line-height-0-ch-only > * {
    line-height:normal;
}

.relative {
    position:relative;
}

.absolute-left {
    position:absolute;
    left:0;
}

.absolute-right {
    position:absolute;
    right:0;
}

.absolute-middle {
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}

.width-100p {
    width:100%;
}

.table {
    display:table;
}

.table-cell {
    display:table-cell;
}

.vertical-align-top {
    vertical-align:top;
}

.vertical-align-middle {
    vertical-align:middle;
}

.vertical-align-bottom {
    vertical-align:bottom;
}

/* 커스텀 */

html, body {
    overflow-x:hidden;
}

.con {
    max-width:1440px;
}

.page-5 .list-box > ul {
    margin:0 -12.5px;
}

.page-5 .list-box > ul > li {
    width:25%;
    padding: 0 12.5px;
    margin-top:20px;
}

@media ( max-width:750px ) {
    .page-5 .list-box > ul > li {
        width:50%;
    }
}

@media ( max-width:400px ) {
    .page-5 .list-box > ul > li {
        width:100%;
    }
}

.page-5 .list-box > ul > li > div {
    border:1px solid #000;
    padding-top:20px;
    padding-bottom:20px;
}

.page-5 .list-box > ul > li > div > .img-box {
    width:97px;
    margin:0 auto;
}

.page-5 .list-box > ul > li > div > .no-box {
    background-color:#003E73;
    width:40px;
    height:40px;
    margin:0 auto;
    margin-top:30px;
    position:relative;
    border-radius:50%;
}

.page-5 .list-box > ul > li > div > .no-box > span {
    position:absolute;
    top:50%;
    left:50%;
    transform:translateX(-50%) translateY(-50%);
    color:white;
}

.page-5 .list-box > ul > li > div > h1 {
    color:#003E73;
    font-size:1.250rem;
    text-align:center;
    margin-top:30px;
}

.page-5 .list-box > ul > li > div > .des {
    margin-top:30px;
    color:#1E1E1E;
    line-height:1.9;
    padding-left:10px;
    padding-right:10px;
}

@media ( max-width:1440px ) {
    .page-5 .list-box > ul > li > div > .des > br {
        display:none;
    }
}

.page-5 .con {
    max-width:1440px;
}
```
```javascript
console.clear();
HeightSync__nodes = {};

var HeightSync__windowWidth = $(window).width();

function HeightSync__init() {
    // 데이터를 모으는 작업, HeightSync__nodes 변수에 데이터를 채운다.
    $('.height-sync').each(function(index, node) {
        var $node = $(node);
        var groupNos = $node.attr('data-height-sync-group-no');
        
        groupNos = groupNos.split(',');
        
        for ( var i = 0; i < groupNos.length; i++ ) {
            var groupNo = groupNos[i];
            if ( groupNo.indexOf("up") == -1 ) {
                groupNo += "_0up";
            }

            if ( groupNo.indexOf("down") == -1 ) {
                groupNo += "_100000down";
            }

            if ( typeof HeightSync__nodes[groupNo] == 'undefined' ) {
                var bits = groupNo.replace('down', '');
                bits = groupNo.replace('up', '');
                bits = groupNo.split('_');
                var minWidth = parseInt(bits[1]);
                var maxWidth = parseInt(bits[2]);
                
                console.log(groupNo);
                
                HeightSync__nodes[groupNo] = {
                    minWidth:minWidth,
                    maxWidth:maxWidth,
                    nodes:[]
                };
            }

            HeightSync__nodes[groupNo].nodes.push($node);
        }
    });

    $(window).resize(Height_Sync__sync);
    Height_Sync__sync();
}

function Height_Sync__sync() {
    HeightSync__windowWidth = $(window).width();
    
    $('.height-sync').data('height-sync-group-no', 'N');
    
    for ( var key in HeightSync__nodes ) {
        var height = 0;
        var $tallNode = null;
        var tallNodeIndex = -1;
        
        for ( var i = 0; i < HeightSync__nodes[key].nodes.length; i++ ) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ( $node.data('height-sync-group-no') != 'Y' ) {
                $node.css('height', '');
            }
        }
        
        if ( HeightSync__windowWidth < HeightSync__nodes[key].minWidth || HeightSync__windowWidth > HeightSync__nodes[key].maxWidth ) {
            continue;
        }
        
        for ( var i = 0; i < HeightSync__nodes[key].nodes.length; i++ ) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ( $tallNode == null || $tallNode.height() < $node.height() ) {
                $tallNode = $node;
                tallNodeIndex = i;
            }
        }

        for ( var i = 0; i < HeightSync__nodes[key].nodes.length; i++ ) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ( i != tallNodeIndex ) {
                $node.height($tallNode.height());
                $node.data('height-sync-group-no', 'Y');
            }
        }
    }
}

HeightSync__init();
```

### height-sync-2
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="prod-list-box-1 con">
  <ul class="flex flex-row-wrap">
    <li>
      <div>
        <div class="height-sync" data-height-sync-group-no="1_401up_800down,3_801up">
          <div class="img-box">
            <img src="http://eightthethalasso.jp/_nuxt/img/1cf4d39.png" alt="">
          </div>
        </div>
      </div>
    </li>

    <li>
      <div>
        <div class="height-sync" data-height-sync-group-no="1_401up_800down,3_801up">
          <div class="img-box">
            <img src="http://eightthethalasso.jp/_nuxt/img/73bcbcc.jpg" alt="">
          </div>
        </div>
      </div>
    </li>

    <li>
      <div>
        <div class="height-sync" data-height-sync-group-no="2_401up_800down,3_801up">
          <div class="img-box">
            <img src="http://eightthethalasso.jp/_nuxt/img/5015d22.jpg" alt="">
          </div>
        </div>
      </div>
    </li>

    <li>
      <div>
        <div class="height-sync" data-height-sync-group-no="2_401up_800down,3_801up">
          <div class="img-box">
            <img src="http://eightthethalasso.jp/_nuxt/img/25ccf90.jpg" alt="">
            
          </div>
        </div>
      </div>
    </li>
    <li>
      <div>
        <div class="height-sync" data-height-sync-group-no="5_401up_800down,4_801up">
          <div class="img-box">
            <img src="http://eightthethalasso.jp/_nuxt/img/891b7ed.jpg" alt="">
          </div>
        </div>
      </div>
    </li>

    <li>
      <div>
        <div class="height-sync" data-height-sync-group-no="5_401up_800down,4_801up">
          <div class="img-box">
            <img src="http://eightthethalasso.jp/_nuxt/img/fdbf5e2.jpg" alt="">
          </div>
        </div>
      </div>
    </li>

    <li>
      <div>
        <div class="height-sync" data-height-sync-group-no="6_401up_800down,4_801up">
          <div class="img-box">
            <img src="http://eightthethalasso.jp/_nuxt/img/37a914e.jpg" alt="">
          </div>
        </div>
      </div>
    </li>

    <li>
      <div>
        <div class="height-sync" data-height-sync-group-no="6_401up_800down,4_801up">
          <div class="img-box">
            <img src="http://eightthethalasso.jp/_nuxt/img/fe4bbfc.jpg" alt="">
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
```
```css
body, ul, li {
  margin:0;
  padding:0;
  list-style:none;
}

.con {
  margin:0 auto;
}

.flex {
  display:flex;
}

.flex-row-wrap {
  flex-flow:row wrap;
}

.img-box > img {
  width:100%;
}


/* cos */
.con {
  max-width:1316px;
}

@media ( min-width:801px ) {
  .prod-list-box-1 > ul > li {
    width:calc(25% - 2.2% * 4 / 3);
  }

  .prod-list-box-1 > ul > li:not(:nth-child(4n)) {
    margin-right:2.2%;
  }
}

@media ( max-width:800px ) and ( min-width:401px ) {
  .prod-list-box-1 > ul > li {
    width:calc(50% - 2.2% * 2 / 1);
  }

  .prod-list-box-1 > ul > li:not(:nth-child(2n)) {
    margin-right:2.2%;
  }
}

@media ( max-width:400px ) {
  .prod-list-box-1 > ul > li {
    width:100%;
  }
}

.height-sync {
  border:2px solid red;
}
```
```javascript
console.clear();
HeightSync__nodes = {};

var HeightSync__windowWidth = $(window).width();

function HeightSync__init() {
    // 데이터를 모으는 작업, HeightSync__nodes 변수에 데이터를 채운다.
    $('.height-sync').each(function(index, node) {
        var $node = $(node);
        var groupNos = $node.attr('data-height-sync-group-no');
        
        groupNos = groupNos.split(',');
        
        for ( var i = 0; i < groupNos.length; i++ ) {
            var groupNo = groupNos[i];
            if ( groupNo.indexOf("up") == -1 ) {
                groupNo += "_0up";
            }

            if ( groupNo.indexOf("down") == -1 ) {
                groupNo += "_100000down";
            }

            if ( typeof HeightSync__nodes[groupNo] == 'undefined' ) {
                var bits = groupNo.replace('down', '');
                bits = groupNo.replace('up', '');
                bits = groupNo.split('_');
                var minWidth = parseInt(bits[1]);
                var maxWidth = parseInt(bits[2]);
                
                console.log(groupNo);
                
                HeightSync__nodes[groupNo] = {
                    minWidth:minWidth,
                    maxWidth:maxWidth,
                    nodes:[]
                };
            }

            HeightSync__nodes[groupNo].nodes.push($node);
        }
    });

    $(window).resize(Height_Sync__sync);
    Height_Sync__sync();
}

function Height_Sync__sync() {
    HeightSync__windowWidth = $(window).width();
    
    $('.height-sync').data('height-sync-group-no', 'N');
    
    for ( var key in HeightSync__nodes ) {
        var height = 0;
        var $tallNode = null;
        var tallNodeIndex = -1;
        
        for ( var i = 0; i < HeightSync__nodes[key].nodes.length; i++ ) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ( $node.data('height-sync-group-no') != 'Y' ) {
                $node.css('height', '');
            }
        }
        
        if ( HeightSync__windowWidth < HeightSync__nodes[key].minWidth || HeightSync__windowWidth > HeightSync__nodes[key].maxWidth ) {
            continue;
        }
        
        for ( var i = 0; i < HeightSync__nodes[key].nodes.length; i++ ) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ( $tallNode == null || $tallNode.height() < $node.height() ) {
                $tallNode = $node;
                tallNodeIndex = i;
            }
        }

        for ( var i = 0; i < HeightSync__nodes[key].nodes.length; i++ ) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ( i != tallNodeIndex ) {
                $node.height($tallNode.height());
                $node.data('height-sync-group-no', 'Y');
            }
        }
    }
}

HeightSync__init();
```

### light-box
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.1/css/lightbox.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.1/js/lightbox.min.js"></script>

<h1>그룹 1</h1>
<a data-title="잘가1" data-lightbox="example-set" href="https://placekitten.com/408/287">이미지1</a>
<a data-title="잘가2" data-lightbox="example-set" href="https://placekitten.com/208/287" style="display:none;">이미지2</a>
<a data-title="잘가3" data-lightbox="example-set" href="https://placekitten.com/108/287" style="display:none;">이미지3</a>

<h1>그룹 2</h1>
<a data-title="안녕1" data-lightbox="example-set2" href="https://placekitten.com/408/237">이미지1</a>
<a data-title="안녕2" data-lightbox="example-set2" href="https://placekitten.com/308/257" style="display:none;">이미지2</a>
<a data-title="안녕3" data-lightbox="example-set2" href="https://placekitten.com/408/257" style="display:none;">이미지3</a>
```
```javascript
lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
  disableScrolling: false,
  fitImagesInViewport:false
})
```

### check-box-design
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">

<i class="fas fa-check"></i>

<h1>꾸밈</h1>
<div class="form-control">
  <div class="checkbox-wrap">
    <input type="checkbox">
    <span></span>
  </div>
</div>
<h1>일반</h1>
<input type="checkbox">
```
```css
.checkbox-wrap {
  display:inline-block;
  padding:0px;
  position:relative;
  border:1px solid #afafaf;
  border-radius:10px;
  overflow:hidden;
}

.checkbox-wrap > input {
  margin:0;
  padding:0;
  display:block;
  width:30px;
  height:30px;
  opacity:0;
  position:relative;
  z-index:1;
}
.checkbox-wrap > input + span {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  justify-content:center;
  align-items:center;
}

.checkbox-wrap > input + span::after {
  font-family: "Font Awesome 5 Free";
  font-weight:900;
  content:"\f00c";
  color:white;
  font-weight:bold;
  font-size:1.2rem;
  display:none;
}

.checkbox-wrap > input:checked + span {
  background-color:#00c7ae;
}

.checkbox-wrap > input:checked + span::after {
  display:block;
}
```

### step-form-design
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<div class="form-step-box" data-form-step-phase="1">
  <div class="head">
    <div class="progress-bar"></div>
  </div>
  <form class="body">
    <div>
      <ul>
        <li>
          <div class="checkbox-wrap">
            <input type="checkbox" name="type1">
            <span></span>
          </div>
          <span>공간전체1</span>
        </li>
        <li>
          <div class="checkbox-wrap">
            <input type="checkbox" name="type1">
            <span></span>
          </div>
          <span>벽/천장1</span>
        </li>
      </ul>
      <div>
        <button type="button" class="btn-next">다음</button>
      </div>
    </div>
    <div>
      <ul>
        <li>
          <div class="checkbox-wrap">
            <input type="checkbox" name="type1">
            <span></span>
          </div>
          <span>공간전체2</span>
        </li>
        <li>
          <div class="checkbox-wrap">
            <input type="checkbox" name="type1">
            <span></span>
          </div>
          <span>벽/천장2</span>
        </li>
      </ul>
      <div>
        <button type="button" class="btn-prev">이전</button>
        <button type="button" class="btn-next">다음</button>
      </div>
    </div>
    <div>
      <ul>
        <li>
          <div class="checkbox-wrap">
            <input type="checkbox" name="type1">
            <span></span>
          </div>
          <span>공간전체3</span>
        </li>
        <li>
          <div class="checkbox-wrap">
            <input type="checkbox" name="type1">
            <span></span>
          </div>
          <span>벽/천장3</span>
        </li>
      </ul>
      <div>
        <button type="button" class="btn-prev">이전</button>
        <button type="button" class="btn-next">완료</button>
      </div>
    </div>
    <div>
      완료되었습니다.
    </div>
  </form>
</div>
```
```css
.checkbox-wrap {
  display:inline-block;
  padding:0px;
  position:relative;
  border:1px solid #afafaf;
  border-radius:10px;
  overflow:hidden;
}

.checkbox-wrap > input {
  margin:0;
  padding:0;
  display:block;
  width:30px;
  height:30px;
  opacity:0;
  position:relative;
  z-index:1;
}
.checkbox-wrap > input + span {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  justify-content:center;
  align-items:center;
}

.checkbox-wrap > input + span::after {
  font-family: "Font Awesome 5 Free";
  font-weight:900;
  content:"\f00c";
  color:white;
  font-weight:bold;
  font-size:1.2rem;
  display:none;
}

.checkbox-wrap > input:checked + span {
  background-color:#00c7ae;
}

.checkbox-wrap > input:checked + span::after {
  display:block;
}

.radio-wrap {
  display:inline-block;
  position:relative;
  border:1px solid #afafaf;
  border-radius:10px;
  overflow:hidden;
}

.radio-wrap > input {
  margin:0;
  padding:0;
  display:block;
  width:30px;
  height:30px;
  opacity:0;
  position:relative;
  z-index:1;
}

.radio-wrap > input + span {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  justify-content:center;
  align-items:center;
}

.radio-wrap > input + span::after {
  font-family: "Font Awesome 5 Free";
  font-weight:900;
  content:"\f00c";
  color:white;
  font-weight:bold;
  font-size:1.2rem;
  display:none;
}

.radio-wrap > input:checked + span {
  background-color:#00c7ae;
}

.radio-wrap > input:checked + span::after {
  display:block;
}

.form-step-box > .head > .progress-bar::after {
  content:"";
  display:block;
  height:10px;
  width:0;
  background-color:red;
  transition:width 1s;
}

.form-step-box > .body > div {
  display:none;
}

.form-step-box[data-form-step-phase="1"] > .body > div:nth-child(1) {
  display:block;
}

.form-step-box[data-form-step-phase="1"] > .head > .progress-bar::after {
  width:calc(100% / 3 * (1 - 1));
}

.form-step-box[data-form-step-phase="2"] > .body > div:nth-child(2) {
  display:block;
}

.form-step-box[data-form-step-phase="2"] > .head > .progress-bar::after {
  width:calc(100% / 3 * (2 - 1));
}

.form-step-box[data-form-step-phase="3"] > .body > div:nth-child(3) {
  display:block;
}

.form-step-box[data-form-step-phase="3"] > .head > .progress-bar::after {
  width:calc(100% / 3 * (3 - 1));
}

.form-step-box[data-form-step-phase="4"] > .body > div:nth-child(4) {
  display:block;
}

.form-step-box[data-form-step-phase="4"] > .head > .progress-bar::after {
  width:calc(100% / 3 * (4 - 1));
}
```
```javascript
function FormStepBox__init() {
  $('.form-step-box > .body .btn-next').click(function() {
    var $box = $(this).closest('.form-step-box');
    var phase = $box.attr('data-form-step-phase');
    var newPhase = parseInt(phase) + 1;
    $box.attr('data-form-step-phase', newPhase);
  });
  
  $('.form-step-box > .body .btn-prev').click(function() {
    var $box = $(this).closest('.form-step-box');
    var phase = $box.attr('data-form-step-phase');
    var newPhase = parseInt(phase) - 1;
    $box.attr('data-form-step-phase', newPhase);
  });
}

FormStepBox__init();
```

### Hover-list
```html
<div class="box-1 con relative flex">
    <div class="item" style="background-color:red;"></div>
    <div class="item" style="background-color:green;"></div>
    <div class="item" style="background-color:blue;"></div>
    <div class="item" style="background-color:pink;"></div>
    <div class="item" style="background-color:green;"></div>
    <div class="item" style="background-color:purple;"></div>
    <div class="item" style="background-color:gold;"></div>
    <div class="item" style="background-color:black;"></div>
</div>
```
```css
body, ul, li {
    margin:0;
    padding:0;
    list-style:nonoe;
}

.con {
    width:1000px;
    margin:0 auto;
}

.flex {
    display:flex;
}

.relative {
    position:relative;
}

.box-1 {
    height:500px;
    overflow:hidden;
}

.box-1 > .item {
    flex-grow:1;
    transition:transform 0.3s;
}

.box-1 > .item:not(:first-child) {
    margin-left:-100px;
}

.box-1 > .item:hover ~ .item {
    transform:translateX(100px);
}
```

### Six N Five
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js"></script>

<div class="top-bar section-wrap">
  <div class="con flex flex-jc-sb height-100p">
    <div class="section flex" data-section-name="studio">
      <h1>studio</h1>

      <div class="des">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos porro sunt esse alias enim nihil dignissimos aperiam maiores minus expedita, reprehenderit cupiditate aut fuga dolor fugiat repellendus ullam! Odit, error.
      </div>
    </div>
    <div class="section flex flex-jc-sb" data-section-name="films">
      <h1>films</h1>

      <div class="des">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quaerat veritatis, quisquam qui corrupti dolorum repellat maxime iure assumenda rerum? Deserunt quas aperiam voluptates neque voluptas facere adipisci illum fugiat?
      </div>
    </div>
  </div>
</div>

<div class="lists-box section-wrap">
  <div class="con flex flex-jc-sb">
    <div class="section" data-section-name="studio">
      <div class="list masonry-grid">
        <div class="grid-item">
          <div>
            <div class="img-box">
              <img src="https://sixnfive.com/wp-content/uploads/2020/08/visual7_web-1-1280x1280.jpg" alt="">
            </div>
            <div class="title-box">
              제목
            </div>
            <div class="writer-box">
              작성자
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div>
            <div class="img-box">
              <img src="https://sixnfive.com/wp-content/uploads/2020/08/visual7_web-1-1280x1280.jpg" alt="">
            </div>
            <div class="title-box">
              제목1
            </div>
            <div class="writer-box">
              작성자1
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div>
            <div class="img-box">
              <img src="https://sixnfive.com/wp-content/uploads/2020/03/visual4_06-1280x1584.jpg" alt="">
            </div>
            <div class="title-box">
              제목2
            </div>
            <div class="writer-box">
              작성자2
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div>
            <div class="img-box">
              <img src="https://sixnfive.com/wp-content/uploads/2019/12/pa_black_4k-scaled-1-1280x853.jpg" alt="">
            </div>
            <div class="title-box">
              제목3
            </div>
            <div class="writer-box">
              작성자3
            </div>
          </div>
        </div>
        <div class="grid-item">
          <div>
            <div class="img-box">
              <img src="https://sixnfive.com/wp-content/uploads/2019/12/thumbnail1-1280x1280.jpg" alt="">
            </div>
            <div class="title-box">
              제목4
            </div>
            <div class="writer-box">
              작성자4
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section flex flex-jc-sb" data-section-name="films">
      리스트2
    </div>
  </div>
</div>
```
```css
/* no */
body, ul, li {
  margin:0;
  padding:0;
  list-style:none;
}

/* lib */
.flex {
  display:flex;
}

.flex-1-0-0 {
  flex:1 0 0;
}

.flex-jc-sb {
  justify-content:space-between;
}

.height-100p {
  height:100%;
}

.img-box > img {
  width:100%;
}

/* 커스텀 */
.con {
  margin-left:30px;
  margin-right:30px;
}

html {
  transition:background-color 1s, color 1s;
}

[data-section-mode="films"] {
  background-color:black;
  color:white;
}

.section-wrap > .con > .section {
  width:30%;
  transition:width 1s;
}

.section-wrap > .con > .section.active {
  width:70%;
}

@media ( max-width:700px ) {
  .section-wrap > .con > .section {
    visibility:hidden;
    width:0;
  }
  
  .section-wrap > .con > .section.active {
    width:100%;
    visibility:visible;
  }
}

.top-bar {
  height:250px;
}

.top-bar > .con > .section > h1 {
  transition:font-size 1s;
}

.top-bar > .con > .section.active > h1 {
  font-size:3rem;
}

.lists-box > .con > .section > .masonry-grid > .grid-item {
  width:33.3333%;
}

.lists-box > .con > .section > .masonry-grid > .grid-item .img-box {
  padding:10px;
}

.lists-box > .con > .section > .masonry-grid > .grid-item .img-box > img {
  width:calc(100% - 20px);
}

@media ( max-width:1000px ) {
  .lists-box > .con > .section > .masonry-grid > .grid-item {
    width:50%;
  }
}

@media ( max-width:700px ) {
  .lists-box > .con > .section > .masonry-grid > .grid-item {
    width:100%;
  }
}
```
```javascript
var $window = $(window);
var $html = $('html');

function PageLayout__init() {
  $('.section-wrap > .con > .section').mouseenter(function() {
    var $el = $(this);

    var sectionName = $el.attr('data-section-name');
    PageLayout__changeSectionMode(sectionName);
  });

  PageLayout__changeSectionMode('studio');

  $('.masonry-grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 0
  });

  $window.resize(_.debounce(function() {
    $('.masonry-grid').masonry('layout');
  }, 500));
}

function PageLayout__changeSectionMode(modeName) {
  $html.attr('data-section-mode', modeName);

  $('.section-wrap > .con > .section.active').removeClass('active');
  $('.section-wrap > .con > .section[data-section-name="' + modeName + '"]').addClass('active');

  setTimeout(function() {
    $('.masonry-grid').masonry('layout');
  }, 1000);
}

$(function() {  
  PageLayout__init();
});
```