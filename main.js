window.onload = function(){
    var lis = $('bd').getElementsByTagName('li');
    var spans = $('hd').getElementsByTagName('span');
    var banner = $('bd').parentNode;
    var _pre = $('screen2').querySelector('.pre');
    var _next = $('screen2').querySelector('.next');
    var navul = $('screen2').getElementsByTagName('ul')[0];
    var backtop = document.querySelector('#backTop');
    var _carousel = document.querySelector('.carousel'),
        cul = _carousel.getElementsByTagName('ul')[0],
        uli = cul.getElementsByTagName('li'),
        col = document.querySelector('.dot'),
        oli = col.getElementsByTagName('span');


    var s1timer = null, s3timer = null, index = 1, iul = 0, iol = 0;

//screen1轮播图
    clearInterval(s1timer);
    s1timer = setInterval(function(){
        carouselFirst();
    }, 4000);
    banner.onmouseover = function(){
        clearInterval(s1timer);
        for(var i=0;i<spans.length;i++){
            spans[i].num = i;
            spans[i].onclick = function(){
                for(var j=0;j<spans.length;j++){
                    spans[j].className = '';
                }
                this.className = 'hd-on';
                for(var k=0;k<lis.length;k++){
                    lis[k].style.opacity = 0;
                }
                startmove(lis[this.num], {"opacity": 100}, 10);
                index = this.num + 1;
                if(index>3) index=0;
            }
        }
    }
    banner.onmouseout = function(){
        s1timer = setInterval(function(){
            carouselFirst();
        }, 4000);
    }
    function carouselFirst(){
        for(var i=0;i<lis.length;i++){
            lis[i].style.opacity = 0;
        }
        startmove(lis[index], {"opacity": 100}, 10);
        for(var j=0;j<spans.length;j++){
            spans[j].className = '';
        }
        spans[index].className = 'hd-on';
        index++;
        if(index>3) index=0;
    }

    //screen2效果
    _pre.onclick = function(){
        if(parseFloat(navul.style.left) == 0){
            this.style.display = 'none';
        }else{
            startmove(navul, {"left":0}, 4);
            _next.style.display = 'block';
            this.style.display = 'none';
        }
    }
    _next.onclick = function(){
        startmove(navul, {"left":"-135"}, 4);
        this.style.display = 'none';
        _pre.style.display = 'block';
    }

//screen3轮播图
    var uliW = uli[0].offsetWidth;
    s3timer = setInterval(function(){
        carouselThird();
    }, 3000);
    for(var i=0;i<oli.length;i++){
        oli[i].index = i;
        oli[i].onclick = function(){
            startmove(cul, {left:-uliW*this.index}, 5);
            for(var j=0;j<oli.length;j++){
                oli[j].className = '';
            }
            this.className = 'dot-on';
            iol = iul = this.index;
        }
    }
    for(var i=0;i<uli.length;i++){
        uli[i].onmouseover = function(){
            clearInterval(s3timer);
        }
        uli[i].onmouseout = function(){
            s3timer = setInterval(function(){
                carouselThird();
            }, 3000);
        }
    }
    function carouselThird(){
        if(iol == 0){
            iul = 0;
            uli[0].style.position = 'static';
            cul.style.left = 0;
        }
        if(iol == oli.length-1){
            iol = 0;
            uli[0].style.position = 'relative';
            uli[0].style.left = uli.length * uliW + 'px';
        }else{
            iol++
        }
        iul++;
        for(var i=0;i<oli.length;i++){
            oli[i].className = '';
        }
        oli[iol].className = 'dot-on';
        startmove(cul, {left:-iul*uliW}, 5);
    }

    //screen4,screen5
    var _s4 = document.querySelector('.s4');
    var _a = _s4.getElementsByTagName('a');
    for(var i=0;i<_a.length;i++){
        _a[i].onclick = function(){
            for(var j=0;j<_a.length;j++){
                _a[j].className = "showmsg";
            }
            this.className += " curshow";
        }
    }
    var _s5 = document.querySelector('.s5'),
        _s = _s5.getElementsByTagName('a');
    for(var i=0;i<_s.length;i++){
        _s[i].onclick = function(){
            for(var j=0;j<_s.length;j++){
                _s[j].className = "showmsg";
            }
            this.className += " curshow";
        }
    }

    //siderbar
    backtop.onclick = function(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    addEvent(window, 'scroll', function(){
        checkpos(backtop);
    });
}

function $(id){
    return document.getElementById(id);
}
function startmove(obj, json, intv, fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        for(var attr in json){
            var flag = true;
            var icur;
            if(attr == 'opacity'){
                icur = Math.round(parseFloat(getStyle(obj, attr))*100);
            }else{
                icur = parseInt(getStyle(obj, attr));
            }
            var ispeed = (json[attr]-icur)/intv;
            ispeed = ispeed>0 ? Math.ceil(ispeed) : Math.floor(ispeed);
            if(icur != json[attr]){
                flag = false;
            }
            if(attr == 'opacity'){
                obj.style.opacity = (icur + ispeed)/100 ;
                obj.style.filter = "Alpha(opacity:"+ icur + ispeed +")";
            }else{
                obj.style[attr] = icur + ispeed + 'px';
            }
            if(flag){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        }
    }, 50);
}//intv默认是5
function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
}
function addEvent(obj, event, fn){
    if(obj.addEventListener){
        obj.addEventListener(event, fn, false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+event, fn);
    }
}
function checkpos(obj){
    var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollHeight>100){
        obj.style.display = 'block';
    }else{
        obj.style.display = 'none';
    }
}