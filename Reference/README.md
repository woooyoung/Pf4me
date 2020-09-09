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